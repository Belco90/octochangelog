/* eslint-disable no-console */
import { createClientOnlyFn, createServerOnlyFn } from '@tanstack/react-start'

const enableServerMocking = createServerOnlyFn(async () => {
	const { server } = await import('@/mocks/server')
	server.listen()
	console.info('[MSW] Server mocking enabled.')
})

const enableBrowserMocking = createClientOnlyFn(async () => {
	const { worker } = await import('@/mocks/browser')
	await worker.start()
	if (window.msw) window.msw.isWorkerReady = true
})

/**
 * Enable mocking in the browser or server.
 *
 * This util must be called in the router.tsx to enable mocking, but must be
 * in a separate file to avoid Vite analyzing the dynamic imports
 * for client/server side during build.
 */
export async function enableMocking(isServer: boolean): Promise<void> {
	if (isServer) {
		await enableServerMocking()
	} else {
		await enableBrowserMocking()
	}
}
