import { queryOptions } from '@tanstack/react-query'

import { octokit } from '@/github-client'

import type { RestEndpointMethodTypes } from '@octokit/rest'

type ReposQueryResponse = RestEndpointMethodTypes['search']['repos']['response']
type ReposQueryResults = ReposQueryResponse['data']
type ReposQueryParams = RestEndpointMethodTypes['search']['repos']['parameters']

function searchRepositoriesQueryOptions(
	params: ReposQueryParams,
	options?: { enabled?: boolean },
) {
	const finalParams = { per_page: 100, ...params }
	return queryOptions<ReposQueryResponse, Error, ReposQueryResults>({
		queryKey: ['repos', finalParams],
		queryFn: async () => octokit.search.repos(finalParams),
		select: (response) => response.data,
		enabled: options?.enabled,
	})
}

export { searchRepositoriesQueryOptions }
