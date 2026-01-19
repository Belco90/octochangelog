import { setupServer } from 'msw/node'

import { handlers } from './handlers'

const server = setupServer(...handlers)

server.events.on('request:start', ({ request }) => {
	// eslint-disable-next-line no-console
	console.log('[MSW] Request intercepted:', request.method, request.url)
})

export { server }
