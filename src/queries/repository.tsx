import { queryOptions } from '@tanstack/react-query'

import { octokit } from '@/github-client'

import type { RestEndpointMethodTypes } from '@octokit/rest'

type ReposQueryResponse = RestEndpointMethodTypes['search']['repos']['response']
type ReposQueryResults = ReposQueryResponse['data']
type ReposQueryParams = RestEndpointMethodTypes['search']['repos']['parameters']

function searchRepositoriesQueryOptions(
	params: ReposQueryParams & { enabled?: boolean },
) {
	const { enabled, ...searchParams } = params
	const finalParams = { per_page: 100, ...searchParams }
	return queryOptions<ReposQueryResponse, Error, ReposQueryResults>({
		queryKey: ['repos', finalParams],
		queryFn: async () => octokit.search.repos(finalParams),
		select: (response) => response.data,
		enabled,
	})
}

export { searchRepositoriesQueryOptions }
