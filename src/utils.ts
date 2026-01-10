import { lowerCase } from 'es-toolkit'
import * as semver from 'semver'

import { HIGH_PRIORITY_GROUP_TITLES, LOW_PRIORITY_GROUP_TITLES } from '@/common'
import type {
	MinimalRelease,
	ReleaseGroup,
	ReleaseVersion,
	Repository,
	RepositoryQueryParams,
} from '@/models'

import type { RootContent } from 'mdast'

/**
 * Consider API should be mocked if the mechanism is enabled, and it's not deployed to Vercel env.
 */

/**
 * Extracts a semantic version from a tag name that may include scope prefixes.
 * Handles various tag formats:
 * - Scoped tags: @yarnpkg/cli/4.9.4 -> 4.9.4
 * - Standard tags: v1.2.3 -> 1.2.3
 * - Plain versions: 1.2.3 -> 1.2.3
 */
function extractVersionFromTag(tag: string): string {
	// Handle scoped package tags like @yarnpkg/cli/4.9.4
	// Find the last occurrence of '/' which separates the scope from the version
	const lastSlashIndex = tag.lastIndexOf('/')
	if (lastSlashIndex !== -1) {
		const potentialVersion = tag.slice(lastSlashIndex + 1)
		// Verify it's actually a valid version
		if (semver.coerce(potentialVersion)) {
			return potentialVersion
		}
	}

	// For non-scoped tags or if the slash parsing didn't work, return as-is
	// semver.coerce will handle 'v' prefixes and other variations
	return tag
}

function mapRepositoryToQueryParams(
	repository?: Repository,
): RepositoryQueryParams {
	return {
		owner: repository?.owner.login ?? '',
		repo: repository?.name ?? '',
	}
}

function mapStringToRepositoryQueryParams(str: string): RepositoryQueryParams {
	const [owner = '', repo = ''] = str.split('/')
	return { owner, repo }
}

function getReleaseVersion(release: MinimalRelease): string {
	if (release.tag_name === 'latest') {
		return release.name || release.tag_name
	}

	return extractVersionFromTag(release.tag_name)
}

/**
 * releases - Must be in desc order
 */
type FilterReleasesNodes = {
	releases: Array<MinimalRelease>
	from: ReleaseVersion
	to: ReleaseVersion
}

function filterReleasesByVersionRange(
	args: FilterReleasesNodes,
): Array<MinimalRelease> {
	const { releases, from, to: originalTo } = args

	const to =
		originalTo.toLowerCase() === 'latest'
			? getReleaseVersion(releases[0])
			: originalTo

	const fromVersion = extractVersionFromTag(from)
	const toVersion = extractVersionFromTag(to)

	// Filter version range as (from, to]
	return releases.filter(({ tag_name }) => {
		const version = extractVersionFromTag(tag_name)
		return semver.gt(version, fromVersion) && semver.lte(version, toVersion)
	})
}

function isStableRelease(release: MinimalRelease): boolean {
	const { tag_name } = release
	const version = extractVersionFromTag(tag_name)

	return Boolean(semver.valid(version)) && !semver.prerelease(version)
}

function getMdastContentNodeTitle(mdastNode: RootContent): string {
	const nodeChildren = 'children' in mdastNode ? mdastNode.children : null

	if (nodeChildren && 'value' in nodeChildren[0]) {
		return nodeChildren[0].value
	}

	return 'unknown'
}

const emojisRegExp = /\p{Extended_Pictographic}/gu

function stripEmojis(text: string): string {
	return text.replaceAll(emojisRegExp, '')
}

function sanitizeReleaseGroupTitle(groupTitle: string): string {
	const cleanGroupTitle = stripEmojis(groupTitle)
	return lowerCase(cleanGroupTitle)
}

function getMdastContentReleaseGroup(mdastNode: RootContent): ReleaseGroup {
	const nodeTitle = getMdastContentNodeTitle(mdastNode)
	const mdastTitle = sanitizeReleaseGroupTitle(nodeTitle)

	// Check features before than breaking changes to group here "Major Features"
	// and avoid grouping them under breaking changes group
	if (/^.*(feature|minor).*$/i.exec(mdastTitle)) {
		return 'features'
	}

	if (/^.*(breaking.*change|major).*$/i.exec(mdastTitle)) {
		return 'breaking changes'
	}

	if (/^.*(bug|fix|patch).*$/i.exec(mdastTitle)) {
		return 'bug fixes'
	}

	if (/^.*thank.*$/.exec(mdastTitle)) {
		return 'thanks'
	}

	if (/^.*artifact.*$/.exec(mdastTitle)) {
		return 'artifacts'
	}

	if (/^.*credit.*$/.exec(mdastTitle)) {
		return 'credits'
	}

	return mdastTitle
}

const getReleaseGroupPriority = (titleParam: ReleaseGroup): -1 | 0 | 1 => {
	if (HIGH_PRIORITY_GROUP_TITLES.includes(titleParam)) {
		return -1
	}

	if (LOW_PRIORITY_GROUP_TITLES.includes(titleParam)) {
		return 1
	}

	return 0
}

function compareReleaseGroupsByPriority(a: string, b: string): number {
	const aPriority = getReleaseGroupPriority(a)
	const bPriority = getReleaseGroupPriority(b)

	// They belong to different priorities group, sort by highest one
	if (aPriority !== bPriority) {
		return aPriority - bPriority
	}

	// They belong to neutral priority group, maintain sort unchanged
	if (aPriority === 0) {
		return 0
	}

	// They belong to high or low priority group,
	// sort by most important one within their group
	const priorityGroupReference =
		aPriority === -1 ? HIGH_PRIORITY_GROUP_TITLES : LOW_PRIORITY_GROUP_TITLES

	const indexOfA = priorityGroupReference.indexOf(a)
	const indexOfB = priorityGroupReference.indexOf(b)

	if (indexOfA < indexOfB) {
		return -1
	}

	if (indexOfA > indexOfB) {
		return 1
	}

	// Maintain sort unchanged just in case
	return 0
}

const compareReleasesByVersion = (
	a: MinimalRelease,
	b: MinimalRelease,
	order: 'asc' | 'desc' = 'desc',
): number => {
	const { tag_name: tagA } = a
	const { tag_name: tagB } = b
	const verA = extractVersionFromTag(tagA)
	const verB = extractVersionFromTag(tagB)

	if (semver.gt(verA, verB)) {
		return order === 'desc' ? -1 : 1
	}

	if (semver.lt(verA, verB)) {
		return order === 'desc' ? 1 : -1
	}

	return 0
}

/**
 *
 * @param list - List to be paginated
 * @param perPage - Items per page
 * @param pageIndex - Page number (1-based index)
 */
function paginateList<TListItem>(
	list: Array<TListItem>,
	perPage: number,
	pageIndex: number,
): { data: Array<TListItem>; hasNext: boolean } {
	if (pageIndex === 0) {
		throw new Error('`pageIndex` is 1-based index so 0 is not a valid value.')
	}
	const pageEnd = pageIndex * perPage
	const pageStart = pageEnd - perPage

	return {
		data: list.slice(pageStart, pageEnd),
		hasNext: pageEnd < list.length,
	}
}

export {
	mapRepositoryToQueryParams,
	mapStringToRepositoryQueryParams,
	extractVersionFromTag,
	filterReleasesByVersionRange,
	isStableRelease,
	getMdastContentNodeTitle,
	getMdastContentReleaseGroup,
	getReleaseVersion,
	compareReleasesByVersion,
	compareReleaseGroupsByPriority,
	paginateList,
	sanitizeReleaseGroupTitle,
}
