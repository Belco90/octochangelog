import { githubOAuthHandlers } from './github-oauth'
import { githubReposDetailsHandlers } from './github-repos-details'
import { githubReposReleasesHandlers } from './github-repos-releases'
import { githubReposSearchHandlers } from './github-repos-search'

import type { RequestHandler } from 'msw'

const handlers: Array<RequestHandler> = [
	...githubOAuthHandlers,
	...githubReposDetailsHandlers,
	...githubReposSearchHandlers,
	...githubReposReleasesHandlers,
]

export { handlers }
