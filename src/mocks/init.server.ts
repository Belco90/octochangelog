import { server } from './server'

/**
 * Initialize MSW server for Node.js environment.
 * This is called from the application entry point when __MSW_SERVER_INIT_PENDING__ is set.
 * Note: The caller already checks the flag, so we don't need to check it again here.
 */
export function initMswServer() {
	server.listen()
	// eslint-disable-next-line no-console
	console.log('[MSW] Server-side mocking initialized')
	// Clear the flag so we don't initialize twice
	delete process.env.__MSW_SERVER_INIT_PENDING__
}
