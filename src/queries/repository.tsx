import { queryOptions } from '@tanstack/react-query'

import type { MinimalRepository, RepositoryQueryParams } from '@/models'
import { searchRepositories, getRepository } from '@/server/repositories'

type SearchRepositoriesResult = {
	total_count: number
	incomplete_results: boolean
	items: Array<MinimalRepository>
}

function searchRepositoriesQueryOptions(params: {
	q: string
	per_page?: number
}) {
	return queryOptions<SearchRepositoriesResult>({
		queryKey: ['repos', params],
		queryFn: () => searchRepositories({ data: params }),
	})
}

function getRepositoryQueryOptions(params?: RepositoryQueryParams) {
	return queryOptions<MinimalRepository>({
		queryKey: ['repo', params],
		queryFn: () =>
			getRepository({ data: { owner: params!.owner, repo: params!.repo } }),
		enabled: Boolean(params),
	})
}

export { searchRepositoriesQueryOptions, getRepositoryQueryOptions }
