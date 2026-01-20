import { queryOptions } from '@tanstack/react-query'

import { octokit } from '@/github-client'
import type {
	FullRepository,
	MinimalRepository,
	RepositoryQueryParams,
} from '@/models'

import type { RestEndpointMethodTypes } from '@octokit/rest'

type SearchReposResponse =
	RestEndpointMethodTypes['search']['repos']['response']
type SearchReposParams =
	RestEndpointMethodTypes['search']['repos']['parameters']
type SearchReposReturnData = Omit<SearchReposResponse['data'], 'items'> & {
	items: Array<MinimalRepository>
}

type FullRepositoryLike = MinimalRepository &
	Partial<Omit<FullRepository, keyof MinimalRepository>>

/**
 * Extracts minimal repository information from a full repository object (DTO).
 */
function selectMinimalRepository(
	fullRepository: FullRepositoryLike,
): MinimalRepository {
	return {
		id: fullRepository.id,
		owner: fullRepository.owner,
		html_url: fullRepository.html_url,
		full_name: fullRepository.full_name,
		name: fullRepository.name,
	}
}

/**
 * Extracts minimal repository information from a list of full repository objects (DTOs).
 */
function selectSearchRepositories(
	searchResponse: SearchReposResponse['data'],
): SearchReposReturnData {
	const minimalRepositories = searchResponse.items.map((repo) => {
		return selectMinimalRepository(repo as FullRepositoryLike)
	})

	return { ...searchResponse, items: minimalRepositories }
}

function searchRepositoriesQueryOptions(params: SearchReposParams) {
	params.per_page ??= 100
	return queryOptions<
		SearchReposResponse['data'],
		Error,
		SearchReposReturnData
	>({
		queryKey: ['repos', params],
		queryFn: async () => {
			const response = await octokit.search.repos(params)
			if (response.status < 200 || response.status >= 300) {
				throw new Error(
					`Could not fetch repositories search (${response.status})`,
				)
			}
			return response.data
		},
		select: selectSearchRepositories,
	})
}

type GetRepoResponse = RestEndpointMethodTypes['repos']['get']['response']

function getRepositoryQueryOptions(params?: RepositoryQueryParams) {
	return queryOptions<GetRepoResponse['data'], Error, MinimalRepository>({
		queryKey: ['repo', params],
		queryFn: async () => {
			const response = await octokit.repos.get(params)
			if (response.status < 200 || response.status >= 300) {
				throw new Error(
					`Could not fetch repository details (${response.status})`,
				)
			}
			return response.data
		},
		select: selectMinimalRepository,
		enabled: Boolean(params),
	})
}

export { searchRepositoriesQueryOptions, getRepositoryQueryOptions }
