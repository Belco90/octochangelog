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
	getCachedReleases,
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
 * It retrieves releases in batches of 100 per page, and keeps paginating until the target
 * `fromVersion` and `toVersion` are found, or until a maximum of {@link MAX_AUTO_PAGINATION} pages
 * have been fetched. If version targets haven't been reached, pagination continues past the cap.
 */
async function fetchReleasesFromGitHub(
	owner: string,
	repo: string,
	fromVersion?: ReleaseVersion | null,
	toVersion?: ReleaseVersion | null,
): Promise<Array<MinimalRelease>> {
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

		shouldKeepPaginating =
			hasNextPage &&
			(!isMaxAutoPaginationReached ||
				!isFromReleaseFetched ||
				!isToReleaseFetched)
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
 * Used by the form dropdowns to populate version options. Results are cached in-memory by repo slug.
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

		// Return cached releases if available
		const cached = getCachedReleases(owner, repo)
		if (cached) return cached

		const releases = await fetchReleasesFromGitHub(
			owner,
			repo,
			fromVersion,
			toVersion,
		)

		// Cache the full fetch so subsequent calls (including getProcessedReleases) can reuse it
		setCachedReleases(owner, repo, releases)

		return releases
	})

/**
 * Fetches, filters, and processes releases for a repository.
 *
 * Used by the changelog display to show grouped release changes. If the in-memory cache
 * (populated by {@link getReleases}) covers the requested version range, cached data is used
 * instead of making a new GitHub API call. Partial fetches are never cached.
 */
const getProcessedReleases = createServerFn()
	.inputValidator(
		(data: { owner: string; repo: string; from: string; to: string }) => data,
	)
	.handler(async ({ data }) => {
		const { owner, repo, from, to } = data

		// Try to serve from cache if the cached data covers the requested range
		const cached = getCachedReleasesForRange(owner, repo, from, to)
		const releases =
			cached ?? (await fetchReleasesFromGitHub(owner, repo, from, to))

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
