import type { SetupWorker } from 'msw/browser'

type StartReturnType = ReturnType<SetupWorker['start']>

/**
 * Enable mocking in the browser.
 *
 * Server-side mocking is now initialized via msw.server.mjs imported through NODE_OPTIONS.
 * This util must be called in the router.tsx to enable browser mocking, but must be
 * in a separate file to avoid Vite analyzing the dynamic imports during build.
 */
export async function enableMocking(): StartReturnType {
	const { worker } = await import('@/mocks/browser')
	return worker.start()
}
