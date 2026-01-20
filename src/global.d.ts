// Type definitions for E2E tests
import type { SetupWorker } from 'msw/browser'

// MSW worker exposed on window for E2E test coordination
declare global {
	interface Window {
		msw?: {
			isWorkerReady: boolean
			worker: SetupWorker
		}
	}
}

export {}
