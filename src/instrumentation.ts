import * as Sentry from '@sentry/nextjs'

export async function register() {
	if (process.env.NEXT_RUNTIME === 'nodejs') {
		// Init Sentry
		await import('../sentry.server.config')

		// Init MSW server side if enabled
		if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
			const { server } = await import('./mocks/server')
			server.listen()
		}
	}

	if (process.env.NEXT_RUNTIME === 'edge') {
		await import('../sentry.edge.config')
	}
}

export const onRequestError = Sentry.captureRequestError
