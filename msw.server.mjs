/**
 * MSW Server Initialization Module
 *
 * This file is imported via NODE_OPTIONS in the dev script to initialize
 * MSW server-side mocking before the application starts.
 *
 * It runs before Vite starts, so it needs to work with raw Node.js module resolution.
 * To handle TypeScript and path aliases, we defer the actual initialization
 * until after Vite's module system is available.
 */

// Only initialize MSW if API mocking is enabled
if (process.env.VITE_API_MOCKING === 'enabled') {
	// eslint-disable-next-line no-console
	console.log('[MSW] Server-side mocking will be initialized')
	// Set a flag that the application can check to initialize MSW
	process.env.__MSW_SERVER_INIT_PENDING__ = 'true'
}
