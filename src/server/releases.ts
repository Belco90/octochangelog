import { createServerFn } from '@tanstack/react-start'
import gfm from 'remark-gfm'
import parse from 'remark-parse'
import * as semver from 'semver'
import { unified } from 'unified'

import { octokit } from '@/github-client'
import type {
	MinimalRelease,
	ProcessedRelease,
	ProcessedReleasesCollection,
	ReleaseVersion,
} from '@/models'
import {
	getCachedReleasesForRange,
	setCachedReleases,
} from '@/server/releases-cache'
import {
	compareReleasesByVersion,
	extractVersionFromTag,
	filterReleasesByVersionRange,
	getMdastContentNodeTitle,
	getSemVerReleaseGroup,
	isStableRelease,
	sanitizeReleaseGroupTitle,
} from '@/utils'

import type { Root } from 'mdast'
import type { Processor } from 'unified'

const MAX_AUTO_PAGINATION = 10

function getHasNextPage(link: string): boolean {
	return link.includes('rel="next"')
}

/**
 * Fetches a list of release objects from a GitHub repository, optionally filtering by version range.
 *
 * Returns cached releases when the cache covers the requested version range, unless either
 * `fromVersion` or `toVersion` is `"latest"` — in which case caching is bypassed entirely
 * (both for reads and writes) to ensure the response always reflects the current newest release.
 *
 * On cache miss, releases are fetched in batches of 100 per page. Pagination stops as soon as
 * both `fromVersion` and `toVersion` targets are found in the fetched data, or after
 * {@link MAX_AUTO_PAGINATION} pages when no version targets are specified. Freshly fetched
 * results (without "latest") are cached for subsequent calls.
 */
async function fetchReleasesFromGitHub(
	owner: string,
	repo: string,
	fromVersion?: ReleaseVersion | null,
	toVersion?: ReleaseVersion | null,
): Promise<Array<MinimalRelease>> {
	// Return cached releases if the cache covers the requested range
	const cached = getCachedReleasesForRange(owner, repo, fromVersion, toVersion)
	if (cached) return cached

	const hasFromVersion = !!fromVersion
	const hasToVersion = !!toVersion
	const releases: Array<MinimalRelease> = []
	let shouldKeepPaginating = true
	let pagination = 1

	while (shouldKeepPaginating) {
		const response = await octokit.rest.repos.listReleases({
			owner,
			repo,
			per_page: 100,
			page: pagination,
		})
		const { data: releasesBatch, headers } = response
		releases.push(...releasesBatch.filter(isStableRelease))

		if (releasesBatch.length === 0) break

		pagination++
		const hasNextPage = !!headers.link && getHasNextPage(headers.link)
		const isMaxAutoPaginationReached = pagination > MAX_AUTO_PAGINATION
		const lastReleaseFetched = releasesBatch[releasesBatch.length - 1]
		const lastReleaseVersion = extractVersionFromTag(
			lastReleaseFetched.tag_name,
		)
		const isFromReleaseFetched =
			!hasFromVersion ||
			fromVersion === 'latest' ||
			semver.gte(extractVersionFromTag(fromVersion), lastReleaseVersion)
		const isToReleaseFetched =
			!hasToVersion ||
			toVersion === 'latest' ||
			semver.gte(extractVersionFromTag(toVersion), lastReleaseVersion)

		// Stop as soon as both version targets are found; if no targets are
		// specified, fall back to the MAX_AUTO_PAGINATION cap.
		const hasVersionTargets = hasFromVersion || hasToVersion
		const bothTargetsFound = isFromReleaseFetched && isToReleaseFetched
		shouldKeepPaginating =
			hasNextPage &&
			(hasVersionTargets ? !bothTargetsFound : !isMaxAutoPaginationReached)
	}

	// Cache the full fetch so subsequent calls can reuse it.
	// Per #691: skip caching when "latest" is in the range — the result
	// must not be stored since "latest" resolves to whatever is newest now.
	const hasLatest =
		fromVersion?.toLowerCase() === 'latest' ||
		toVersion?.toLowerCase() === 'latest'
	if (!hasLatest) {
		setCachedReleases(owner, repo, releases)
	}

	return releases
}

function insertReleaseInGroup(
	newProcessedRelease: ProcessedRelease,
	groupedReleases: ProcessedReleasesCollection,
): void {
	const { title } = newProcessedRelease
	if (Array.isArray(groupedReleases[title])) {
		// Group already exists, then append new changes of same type
		groupedReleases[title].push(newProcessedRelease)
	} else {
		// Group doesn't exist yet, then create it and init with new changes
		groupedReleases[title] = [newProcessedRelease]
	}
}

/**
 * Checks if the given processed release is empty
 *
 * A processed release will be considered empty by verifying whether its description's MDAST children are empty.
 */
function processedReleaseIsEmpty(processedRelease: ProcessedRelease): boolean {
	return processedRelease.descriptionMdast.children.length === 0
}

const processor = unified().use(parse).use(gfm) as Processor<Root>

/**
 * Processes a list of releases, grouping and organizing them based on their content and headers (semver).
 */
function processReleases(
	releases: Array<MinimalRelease>,
): ProcessedReleasesCollection {
	const processedReleasesCollection: ProcessedReleasesCollection = {}

	for (const rel of releases) {
		const { body, ...remainingRel } = rel

		if (!body) {
			continue
		}

		const mdastDescription = processor.parse(body)

		let newProcessedRelease: ProcessedRelease | undefined
		for (const mdastNode of mdastDescription.children) {
			const originalTitle = getMdastContentNodeTitle(mdastNode)

			if (mdastNode.type === 'heading' && [1, 2, 3].includes(mdastNode.depth)) {
				// Check if prev release available, and save it if so...
				if (
					newProcessedRelease &&
					!processedReleaseIsEmpty(newProcessedRelease)
				) {
					insertReleaseInGroup(newProcessedRelease, processedReleasesCollection)
				}

				// ... and create new release if proper header found
				const sanitizedTitle = sanitizeReleaseGroupTitle(originalTitle)
				const title = getSemVerReleaseGroup(sanitizedTitle)
				if (title) {
					newProcessedRelease = {
						title,
						originalTitle,
						descriptionMdast: {
							type: 'root',
							children: [],
						},
						...remainingRel,
					}
				}
			} else if (newProcessedRelease) {
				// Append content to current release
				newProcessedRelease.descriptionMdast.children.push(mdastNode)
			} else {
				// Standalone or non-groupable release found
				newProcessedRelease = {
					title: 'others',
					originalTitle,
					descriptionMdast: {
						type: 'root',
						children: [mdastNode],
					},
					...remainingRel,
				}
			}
		}
		// Insert final release in group
		if (newProcessedRelease && !processedReleaseIsEmpty(newProcessedRelease)) {
			insertReleaseInGroup(newProcessedRelease, processedReleasesCollection)
		}
	}
	return processedReleasesCollection
}

/**
 * Fetches releases for a repository from GitHub API.
 *
 * Used by the form dropdowns to populate version options. Results are cached
 * in-memory by repo slug via {@link fetchReleasesFromGitHub}.
 */
const getReleases = createServerFn()
	.inputValidator(
		(data: {
			owner: string
			repo: string
			fromVersion?: string | null
			toVersion?: string | null
		}) => data,
	)
	.handler(async ({ data }) => {
		const { owner, repo, fromVersion, toVersion } = data
		return fetchReleasesFromGitHub(owner, repo, fromVersion, toVersion)
	})

/**
 * Fetches, filters, and processes releases for a repository.
 *
 * Used by the changelog display to show grouped release changes. Cache lookups
 * are handled internally by {@link fetchReleasesFromGitHub}.
 */
const getProcessedReleases = createServerFn()
	.inputValidator(
		(data: { owner: string; repo: string; from: string; to: string }) => data,
	)
	.handler(async ({ data }) => {
		const { owner, repo, from, to } = data

		const releases = await fetchReleasesFromGitHub(owner, repo, from, to)

		// Filter by version range and sort ascending
		const filteredReleases = filterReleasesByVersionRange({
			releases,
			from,
			to,
		}).sort((a, b) => compareReleasesByVersion(a, b, 'asc'))

		if (filteredReleases.length === 0) {
			return null
		}

		// Process and group by semver type
		return processReleases(filteredReleases)
	})

export { getReleases, getProcessedReleases }
