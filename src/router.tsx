import * as Sentry from '@sentry/tanstackstart-react'
import { QueryClient } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'

import { GenericError } from '@/components/GenericError'
import { NotFound } from '@/components/NotFound'
import { defaultQueryClientConfig } from '@/queries/client-config'

import { routeTree } from './routeTree.gen'

export async function getRouter() {
	const queryClient = new QueryClient(defaultQueryClientConfig)

	const router = createRouter({
		routeTree,
		context: {
			queryClient,
		},
		scrollRestoration: true,
		defaultPreload: 'intent',
		defaultErrorComponent: GenericError,
		defaultNotFoundComponent: NotFound,
	})

	setupRouterSsrQueryIntegration({ router, queryClient })

	// Initialize Sentry on the client
	if (!router.isServer) {
		initSentry(router)
	}

	// Initialize server-side MSW if flagged by msw.server.mjs (loaded via NODE_OPTIONS)
	// IMPORTANT: import.meta.env.SSR check is required to prevent Vite from analyzing
	// this import during client build, even though the env var is only set on server
	if (import.meta.env.SSR && process.env.__MSW_SERVER_INIT_PENDING__) {
		const { initMswServer } = await import('@/mocks/init.server')
		initMswServer()
	}

	// enable browser-side mocking if not on Netlify and explicitly enabled via VITE_API_MOCKING
	if (
		!router.isServer &&
		!import.meta.env.VITE_NETLIFY &&
		import.meta.env.VITE_API_MOCKING === 'enabled'
	) {
		const { enableMocking } = await import('@/mocks/init')
		await enableMocking()
	}

	return router
}

type GetRouterReturn = ReturnType<typeof getRouter>

function initSentry(router: Awaited<GetRouterReturn>) {
	Sentry.init({
		dsn: import.meta.env.VITE_SENTRY_DSN,
		// Setting this option to true will send default PII data to Sentry.
		// https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/configuration/options/#sendDefaultPii
		sendDefaultPii: true,

		integrations: [
			Sentry.tanstackRouterBrowserTracingIntegration(router),
			Sentry.replayIntegration({ maskAllText: false, blockAllMedia: false }),
			Sentry.feedbackIntegration(),
		],

		environment: import.meta.env.VITE_CONTEXT ?? 'unknown',

		// Enable logs to be sent to Sentry
		enableLogs: true,

		// Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
		// We recommend adjusting this value in production.
		// Learn more at https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
		tracesSampleRate: 1.0,

		// Capture Replay for 10% of all sessions, plus for 100% of sessions with an error.
		replaysSessionSampleRate: 0.1,
		replaysOnErrorSampleRate: 1.0,
	})
}

declare module '@tanstack/react-router' {
	interface Register {
		router: GetRouterReturn
	}
}
