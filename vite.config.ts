import netlify from '@netlify/vite-plugin-tanstack-start'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import {
	configDefaults,
	coverageConfigDefaults,
	defaultExclude,
} from 'vitest/config'

const isNodeEnvProd = process.env.NODE_ENV === 'production'

export default defineConfig({
	server: {
		port: 3000,
	},
	optimizeDeps: {
		// Exclude msw to avoid bundling it in the client bundle,
		// and prevent dep optimization errors because of "ClientRequest" in @mswjs/interceptors
		exclude: ['msw', '@mswjs/interceptors'],
	},
	plugins: [
		tsconfigPaths(),
		tanstackStart({
			prerender: {
				enabled: isNodeEnvProd,
				filter: ({ path }) => {
					// Prevent prerendering routes for auth
					if (path.includes('/auth')) return false
					// Prevent prerendering routes for testing errors
					if (path.includes('/test-errors')) return false
					return true
				},
			},
			sitemap: {
				host: 'https://octochangelog.com/',
			},
		}),

		// React's vite plugin must come after Start's vite plugin
		viteReact(),

		// Netlify adapter for TanStack Start (anywhere in the array is fine)
		// Only enable Netlify plugin in prod bundle or when NETLIFY env is set
		...(process.env.NETLIFY || isNodeEnvProd ? [netlify()] : []),
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
	},
})
