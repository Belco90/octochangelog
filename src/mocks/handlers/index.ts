import { githubReposDetailsHandlers } from './github-repos-details'
import { githubReposReleasesHandlers } from './github-repos-releases'
import { githubReposSearchHandlers } from './github-repos-search'

import type { RequestHandler } from 'msw'

const handlers: Array<RequestHandler> = [
	...githubReposDetailsHandlers,
	...githubReposSearchHandlers,
	...githubReposReleasesHandlers,
]

export { handlers }
