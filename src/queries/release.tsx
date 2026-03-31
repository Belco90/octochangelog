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
	const pages: Array<ReleasesPage> = []
	const pageParams: Array<number> = []
	let pageParam = 1

	while (true) {
		const page = await fetchReleasesPage(repository, pageParam)
		pages.push(page)
		pageParams.push(pageParam)

		if (!page.nextPage) break

		const allReleases = pages.flatMap((p) => p.releases)
		const hasFrom = !from || allReleases.some((r) => r.tag_name === from)
		const hasTo =
			!to || to === 'latest' || allReleases.some((r) => r.tag_name === to)
		if (hasFrom && hasTo) break

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
