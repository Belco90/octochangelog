import { infiniteQueryOptions } from '@tanstack/react-query'

import { octokit } from '@/github-client'
import type {
	MinimalRelease,
	MinimalRepository,
	RepositoryQueryParams,
} from '@/models'
import { isStableRelease, mapRepositoryToQueryParams } from '@/utils'

import type { InfiniteData, QueryClient } from '@tanstack/react-query'

type ReleasesPage = {
	releases: Array<MinimalRelease>
	nextPage: number | undefined
}

type ReleasesQueryParams = {
	repository?: RepositoryQueryParams | null
}

const QUERY_KEY = 'releases'

function getHasNextPage(link: string): boolean {
	return link.includes('rel="next"')
}

async function fetchReleasesPage(
	repository: RepositoryQueryParams,
	page: number,
): Promise<ReleasesPage> {
	const response = await octokit.rest.repos.listReleases({
		owner: repository.owner,
		repo: repository.repo,
		per_page: 100,
		page,
	})
	const { data: releasesBatch, headers } = response
	const releases = releasesBatch.filter(isStableRelease)
	const hasNextPage = !!headers.link && getHasNextPage(headers.link)
	return {
		releases,
		nextPage: hasNextPage ? page + 1 : undefined,
	}
}

function releasesInfiniteQueryOptions(params: ReleasesQueryParams) {
	const finalParams: RepositoryQueryParams = params.repository ?? {
		owner: '',
		repo: '',
	}

	return infiniteQueryOptions({
		queryKey: [QUERY_KEY, finalParams] as const,
		queryFn: ({ pageParam }) => fetchReleasesPage(finalParams, pageParam),
		initialPageParam: 1 as number,
		getNextPageParam: (lastPage: ReleasesPage) => lastPage.nextPage,
		enabled: Boolean(params.repository),
	})
}

function flattenReleasePages(
	data: InfiniteData<ReleasesPage> | undefined,
): Array<MinimalRelease> {
	return data?.pages.flatMap((p) => p.releases) ?? []
}

const MAX_PREFETCH_PAGES = 50

function hasVersions(
	tagNames: Set<string>,
	from?: string,
	to?: string,
): boolean {
	const hasFrom = !from || tagNames.has(from)
	const hasTo = !to || to === 'latest' || tagNames.has(to)
	return hasFrom && hasTo
}

async function prefetchReleasesForVersions({
	queryClient,
	repository,
	from,
	to,
}: {
	queryClient: QueryClient
	repository: RepositoryQueryParams
	from?: string
	to?: string
}) {
	const options = releasesInfiniteQueryOptions({ repository })

	// Check if the existing cache already contains both versions
	const existingData = queryClient.getQueryData<
		InfiniteData<ReleasesPage, number>
	>(options.queryKey)

	if (existingData) {
		const cachedTagNames = new Set<string>()
		for (const page of existingData.pages) {
			for (const release of page.releases) {
				cachedTagNames.add(release.tag_name)
			}
		}
		if (hasVersions(cachedTagNames, from, to)) return
	}

	// Fetch pages until both versions are found (or limits reached)
	const seenTagNames = new Set<string>()
	const pages: Array<ReleasesPage> = []
	const pageParams: Array<number> = []
	let pageParam = 1

	while (pageParam <= MAX_PREFETCH_PAGES) {
		const page = await fetchReleasesPage(repository, pageParam)
		pages.push(page)
		pageParams.push(pageParam)

		for (const release of page.releases) {
			seenTagNames.add(release.tag_name)
		}

		if (!page.nextPage || hasVersions(seenTagNames, from, to)) break

		pageParam++
	}

	queryClient.setQueryData(options.queryKey, {
		pages,
		pageParams,
	})
}

/**
 * Builds query params from a MinimalRepository for use with releasesInfiniteQueryOptions.
 */
function mapReleasesQueryParams(
	repository?: MinimalRepository | null,
): ReleasesQueryParams {
	if (!repository) return {}
	return { repository: mapRepositoryToQueryParams(repository) }
}

export {
	releasesInfiniteQueryOptions,
	flattenReleasePages,
	prefetchReleasesForVersions,
	mapReleasesQueryParams,
}
export type { ReleasesPage }
