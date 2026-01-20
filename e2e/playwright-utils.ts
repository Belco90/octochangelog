// eslint-disable-next-line no-restricted-imports
import { test as baseTest, mergeTests } from '@playwright/test'
import { test as happoTest } from 'happo/playwright'

import type { Page } from '@playwright/test'

export const test = mergeTests(baseTest, happoTest)

/**
 * Wait for MSW worker to be ready before making client-side requests.
 * This is necessary to avoid race conditions where React Query fires requests
 * before the service worker is fully initialized and ready to intercept them.
 *
 * Only needed for tests that trigger client-side API calls (e.g., filling forms).
 * Not needed for tests that preload data via URL (server-side rendering).
 */
export async function waitForApiMock(page: Page): Promise<void> {
	await page.waitForFunction(
		() => {
			return Boolean(window.msw?.isWorkerReady)
		},
		{ timeout: 5_000 },
	)
}
