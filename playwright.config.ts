import { currentsReporter } from '@currents/playwright'
import { defineConfig, devices } from '@playwright/test'

const isRunningOnCI = Boolean(process.env.CI)

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './e2e',
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: isRunningOnCI,
	/* Retry on CI only */
	retries: isRunningOnCI ? 2 : 0,
	/* Limit the number of workers on CI, use default locally */
	workers: isRunningOnCI ? '50%' : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: isRunningOnCI
		? [['github'], currentsReporter()] // GitHub for PRs annotations, and Currents for Playwright dashboard
		: 'html',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		baseURL: 'http://localhost:3000',
		trace: isRunningOnCI
			? 'on' // necessary for Currents integration
			: 'on-first-retry',
		video: isRunningOnCI
			? 'on' // necessary for Currents integration
			: undefined,
		screenshot: isRunningOnCI
			? 'on' // necessary for Currents integration
			: undefined,
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},

		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: 'pnpm run dev', // Use dev server for both CI and local - it supports SSR and server functions
		url: 'http://localhost:3000',
		reuseExistingServer: !isRunningOnCI,
		env: {
			VITE_API_MOCKING: 'enabled',
			VITE_GITHUB_APP_CLIENT_ID: 'mock-client-id',
		},
	},
})
