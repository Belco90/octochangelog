import { queryOptions } from '@tanstack/react-query'

import { octokit } from '@/github-client'
import type { Repository, RepositoryQueryParams } from '@/models'

import type { RestEndpointMethodTypes } from '@octokit/rest'

type ReposQueryResponse = RestEndpointMethodTypes['search']['repos']['response']
type ReposQueryResults = ReposQueryResponse['data']
type ReposQueryParams = RestEndpointMethodTypes['search']['repos']['parameters']

function searchRepositoriesQueryOptions(params: ReposQueryParams) {
	const finalParams = { per_page: 100, ...params }
	return queryOptions<ReposQueryResponse, Error, ReposQueryResults>({
		queryKey: ['repos', finalParams],
		queryFn: async () => octokit.search.repos(finalParams),
		select: (response) => response.data,
	})
}

type GetRepoResponse = RestEndpointMethodTypes['repos']['get']['response']
type GetRepoResponseData = GetRepoResponse['data']

function getRepositoryQueryOptions(params?: RepositoryQueryParams) {
	return queryOptions<GetRepoResponseData, Error, Repository>({
		queryKey: ['repo', params],
		queryFn: async () => {
			const response = await octokit.repos.get(params)
			console.log('repo/get response', response.status, response)
			if (response.status < 200 || response.status >= 300) {
				throw new Error(
					`Could not fetch repository details (${response.status})`,
				)
			}
			return response.data
		},
		enabled: Boolean(params),
	})
}

export { searchRepositoriesQueryOptions, getRepositoryQueryOptions }
