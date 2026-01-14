import { createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

async function enableMocking(isServer: boolean) {
	if (import.meta.env.VITE_API_MOCKING !== 'enabled') {
		return
	}

	if (isServer) {
		const { server } = await import('@/mocks/server')
		server.listen()
		console.info('[MSW] Mocking enabled.')
		return
	} else {
		const { worker } = await import('@/mocks/browser')
		return worker.start()
	}
}

export async function getRouter() {
	const router = createRouter({
		routeTree,
		scrollRestoration: true,
	})

	// init integrations
	await enableMocking(router.isServer)

	return router
}

declare module '@tanstack/react-router' {
	interface Register {
		router: ReturnType<typeof getRouter>
	}
}
