import { createServerFn } from '@tanstack/react-start'

import { octokit } from '@/github-client'
import type { FullRepository, MinimalRepository } from '@/models'

import type { RestEndpointMethodTypes } from '@octokit/rest'

type SearchReposResponse =
	RestEndpointMethodTypes['search']['repos']['response']

type FullRepositoryLike = MinimalRepository &
	Partial<Omit<FullRepository, keyof MinimalRepository>>

type SearchReposReturnData = Omit<SearchReposResponse['data'], 'items'> & {
	items: Array<MinimalRepository>
}

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

/**
 * Searches GitHub repositories by query string.
 *
 * Used by the repo autocomplete combobox. Results are transformed server-side
 * to return only minimal repository data.
 */
const searchRepositories = createServerFn()
	.inputValidator((data: { q: string; per_page?: number }) => data)
	.handler(async ({ data }) => {
		data.per_page ??= 100
		const response = await octokit.search.repos(data)

		if (response.status < 200 || response.status >= 300) {
			throw new Error(
				`Could not fetch repositories search (${response.status})`,
			)
		}

		return selectSearchRepositories(response.data)
	})

/**
 * Fetches a single repository by owner and name.
 *
 * Used to hydrate repository details from URL search params on page load.
 * Returns only minimal repository data.
 */
const getRepository = createServerFn()
	.inputValidator((data: { owner: string; repo: string }) => data)
	.handler(async ({ data }) => {
		const response = await octokit.repos.get(data)

		if (response.status < 200 || response.status >= 300) {
			throw new Error(`Could not fetch repository details (${response.status})`)
		}

		return selectMinimalRepository(
			response.data as unknown as FullRepositoryLike,
		)
	})

export { searchRepositories, getRepository }
