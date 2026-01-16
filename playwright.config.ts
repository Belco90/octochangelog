import { currentsReporter } from '@currents/playwright'
import { defineConfig, devices } from '@playwright/test'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './e2e',
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Limit the number of workers on CI, use default locally */
	workers: process.env.CI ? '50%' : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: process.env.CI
		? [['github'], currentsReporter()] // GitHub for PRs annotations, and Currents for Playwright dashboard
		: 'html',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		baseURL: 'http://localhost:3000',
		trace: process.env.CI
			? 'on' // necessary for Currents integration
			: 'on-first-retry',
		video: process.env.CI
			? 'on' // necessary for Currents integration
			: undefined,
		screenshot: process.env.CI
			? 'on' // necessary for Currents integration
			: undefined,
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: process.env.CI
			? 'pnpm run start' // `pnpm run build` must be run beforehand
			: 'pnpm run dev',
		url: 'http://localhost:3000',
		reuseExistingServer: !process.env.CI,
	},
})
