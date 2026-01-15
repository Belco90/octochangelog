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

	// enable mocking if conditions are met
	if (
		import.meta.env.MODE !== 'production' &&
		import.meta.env.VITE_API_MOCKING === 'enabled'
	) {
		const { enableMocking } = await import('@/mocks/init')
		await enableMocking(router.isServer)
	}

	return router
}

declare module '@tanstack/react-router' {
	interface Register {
		router: ReturnType<typeof getRouter>
	}
}
