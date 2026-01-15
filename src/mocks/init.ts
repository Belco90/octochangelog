import type { SetupWorker } from 'msw/browser'

type StartReturnType = ReturnType<SetupWorker['start']>

/**
 * Enable mocking in the browser or server.
 *
 * This util must be called in the router.tsx to enable mocking, but must be
 * in a separate file to avoid Vite analyzing the dynamic imports
 * for client/server side during build.
 */
export async function enableMocking(isServer: boolean): StartReturnType {
	if (isServer) {
		const { server } = await import('@/mocks/server')
		server.listen()
		console.info('[MSW] Server mocking enabled.')
		return
	} else {
		const { worker } = await import('@/mocks/browser')
		return worker.start()
	}
}
