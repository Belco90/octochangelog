import { http, HttpResponse } from 'msw'

import {
	renovateResults,
	testingLibraryResults,
	yarnpkgResults,
} from '@/fixtures/github/search'
import type { RepoSearchResultItem } from '@/models'

import type { RequestHandler } from 'msw'

const githubReposSearchHandlers: Array<RequestHandler> = [
	http.get('https://api.github.com/search/repositories', ({ request }) => {
		const url = new URL(request.url)
		const searchQuery = url.searchParams.get('q') ?? ''
		const cleanSearchQuery = searchQuery.replace(/[-_]/g, ' ')
		const items: Array<RepoSearchResultItem> = []

		if (cleanSearchQuery.includes('test')) {
			items.push(...testingLibraryResults)
		}

		if (cleanSearchQuery.includes('reno')) {
			items.push(...renovateResults)
		}

		if (cleanSearchQuery.includes('yarn')) {
			items.push(...yarnpkgResults)
		}

		return HttpResponse.json({
			total_count: items.length,
			incomplete_results: false,
			items,
		})
	}),
]

export { githubReposSearchHandlers }
