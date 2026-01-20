import { beforeAll, afterEach, afterAll } from 'vitest'

// Only load MSW server in Node environment (not in browser tests)
// Browser tests run in an actual browser and don't need Node-specific MSW setup
if (typeof window === 'undefined') {
	// We're in Node environment - dynamically import and setup MSW
	const { server } = await import('@/mocks/server')

	beforeAll(() => {
		server.listen({ onUnhandledRequest: 'error' })
	})

	afterEach(() => {
		server.resetHandlers()
	})

	afterAll(() => {
		server.close()
	})
}
