import { http, HttpResponse } from 'msw'

import type { RequestHandler } from 'msw'

const githubOAuthHandlers: Array<RequestHandler> = [
	http.post(
		'https://github.com/login/oauth/access_token',
		async ({ request }) => {
			const body = (await request.json()) as {
				code?: string
				client_id?: string
				client_secret?: string
			}

			// Mirror GitHub API behavior: return error if code is missing or invalid
			if (!body.code || body.code === 'INVALID_CODE') {
				return HttpResponse.json(
					{
						error: 'bad_verification_code',
						error_description: 'The code passed is incorrect or expired.',
						error_uri:
							'https://docs.github.com/apps/managing-oauth-apps/troubleshooting-oauth-app-access-token-request-errors/#bad-verification-code',
					},
					{ status: 400 },
				)
			}

			return HttpResponse.json({
				access_token: 'MOCK_ACCESS_TOKEN',
				scope: '',
				token_type: 'bearer',
			})
		},
	),
]

export { githubOAuthHandlers }
