import netlify from '@netlify/vite-plugin-tanstack-start'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import {
	configDefaults,
	coverageConfigDefaults,
	defaultExclude,
} from 'vitest/config'

const isHosted = Boolean(process.env.NETLIFY)

export default defineConfig({
	server: {
		port: 3000,
	},

	build: {
		// Generate sourcemaps for Sentry
		sourcemap: 'hidden',
	},

	optimizeDeps: {
		// Exclude msw to avoid bundling it in the client bundle,
		// and prevent deps optimization errors because of "ClientRequest" in @mswjs/interceptors
		exclude: ['msw', '@mswjs/interceptors'],
	},

	plugins: [
		tsconfigPaths(),
		tanstackStart({
			prerender: {
				enabled: isHosted,
				filter: ({ path }) => {
					// Prevent prerendering routes for auth
					return !path.includes('/auth')
				},
			},
			sitemap: {
				host: 'https://octochangelog.com/',
			},
		}),

		// React's vite plugin must come after Start's vite plugin
		viteReact(),

		// Enable only when hosted:
		//  - Netlify adapter for TanStack Start (anywhere in the array is fine)
		//  - Sentry Vite plugin after all other plugins. Necessary for uploading sourcemaps.
		...(isHosted
			? [
					netlify(),
					sentryVitePlugin({
						org: 'octochangelog-eu',
						project: 'octochangelog-webapp',
						authToken: process.env.SENTRY_AUTH_TOKEN,
						sourcemaps: {
							// Delete sourcemaps after they are uploaded to Sentry, preventing sensitive data to be leaked.
							filesToDeleteAfterUpload: [
								'./**/*.map',
								'.*/**/public/**/*.map',
								'./dist/**/client/**/*.map',
							],
						},
					}),
				]
			: []),
	],

	test: {
		clearMocks: true,
		setupFiles: ['src/vitest.setup.ts'],
		exclude: [...defaultExclude, 'e2e/**'],
		coverage: {
			include: ['src/**'],
			exclude: [
				'src/fixtures/**',
				'src/mocks/**',
				...coverageConfigDefaults.exclude,
			],
		},
		// Enable JUnit reporter in CI environment
		reporters: process.env.CI ? ['default', 'junit'] : configDefaults.reporters,
		outputFile: {
			junit: 'test-report.junit.xml',
		},
		// Separate projects for unit and browser testing
		projects: [
			{
				plugins: [tsconfigPaths()],
				test: {
					name: 'unit',
					clearMocks: true,
					include: [
						'src/__tests__/unit/**/*.test.{ts,tsx}', // Unit tests directory
						'src/**/*.unit.test.{ts,tsx}', // Explicit .unit.test files anywhere
					],
					environment: 'node',
				},
			},
			{
				plugins: [tsconfigPaths(), viteReact()],
				define: {
					'process.env': 'import.meta.env',
				},
				test: {
					name: 'browser',
					clearMocks: true,
					testTimeout: 2_000,
					include: [
						'src/__tests__/browser/**/*.test.{ts,tsx}', // Browser tests directory
						'src/**/*.browser.test.{ts,tsx}', // Explicit .browser.test files anywhere
					],
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium' }],
						headless: !!process.env.CI,
						screenshotFailures: false,
					},
				},
			},
		],
	},
})
