import { server } from './server'

/**
 * Initialize MSW server for Node.js environment.
 * This is called from the application entry point when __MSW_SERVER_INIT_PENDING__ is set.
 */
export function initMswServer() {
	// Check if we should initialize (flag set by msw.server.mjs)
	if (process.env.__MSW_SERVER_INIT_PENDING__ === 'true') {
		server.listen()
		// eslint-disable-next-line no-console
		console.log('[MSW] Server-side mocking initialized')
		// Clear the flag so we don't initialize twice
		delete process.env.__MSW_SERVER_INIT_PENDING__
		return true
	}
	return false
}
