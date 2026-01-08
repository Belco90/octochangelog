import { createNetworkFixture, type NetworkFixture } from '@msw/playwright'
// eslint-disable-next-line no-restricted-imports
import { test as baseTest, mergeTests } from '@playwright/test'
import { test as happoTest } from 'happo/playwright'

import { handlers } from '@/mocks/handlers'

interface Fixtures {
	network: NetworkFixture
}

const extendedTest = baseTest.extend<Fixtures>({
	// Create a fixture that will control the network in your tests (msw).
	network: createNetworkFixture({
		initialHandlers: handlers,
	}),
})

export const test = mergeTests(extendedTest, happoTest)
