import { http, HttpResponse } from 'msw'

import { domTestingLibraryRepoDetails } from '@/fixtures/github/repos/dom-testing-library'
import { renovateRepoDetails } from '@/fixtures/github/repos/renovate'
import { yarnpkgBerryRepoDetails } from '@/fixtures/github/repos/yarnpkg-berry'
import type { Repository } from '@/models'

import type { RequestHandler } from 'msw'

interface RepoReleasesParams {
	repoOwner: string
	repoName: string
}

interface NotFoundResponse {
	message: string
}

const NOT_FOUND_DATA: NotFoundResponse = {
	message: 'Not Found',
}

function getRepoDetailsFixture(repoFullName: string): Repository | undefined {
	if (repoFullName.includes('dom-testing-library')) {
		return domTestingLibraryRepoDetails
	}

	if (repoFullName.includes('renovate')) {
		return renovateRepoDetails
	}

	if (repoFullName.includes('berry')) {
		return yarnpkgBerryRepoDetails
	}

	return undefined
}

const githubReposDetailsHandlers: Array<RequestHandler> = [
	http.get<RepoReleasesParams>(
		'https://api.github.com/repos/:repoOwner/:repoName',
		({ params }) => {
			const { repoName } = params

			const data = getRepoDetailsFixture(`${params.repoOwner}/${repoName}`)

			if (!data) {
				return HttpResponse.json(NOT_FOUND_DATA, { status: 404 })
			}

			return HttpResponse.json(data)
		},
	),
]

export { githubReposDetailsHandlers }
