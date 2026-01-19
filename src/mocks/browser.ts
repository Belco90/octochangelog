import { setupWorker } from 'msw/browser'

import { handlers } from './handlers'

const worker = setupWorker(...handlers)

// Expose worker globally for E2E tests to check readiness
if (typeof window !== 'undefined') {
	window.msw = { worker, isWorkerReady: false }
}

export { worker }
