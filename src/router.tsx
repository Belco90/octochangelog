import { createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

export async function getRouter() {
	const router = createRouter({
		routeTree,
		scrollRestoration: true,
	})

	// init integrations
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
