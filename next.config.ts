import { withSentryConfig } from '@sentry/nextjs'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactStrictMode: true,
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	typedRoutes: true,
	// eslint-disable-next-line @typescript-eslint/require-await
	async redirects() {
		return [
			{
				source: '/comparator',
				destination: '/compare',
				permanent: true,
			},
			{
				// Old redirect from root to /compare. Should be removed when params are moved to dynamic route.
				source: '/',
				destination: '/compare',
				has: [{ type: 'query', key: 'repo' }],
				permanent: true,
			},
		]
	},
}

export default withSentryConfig(nextConfig, {
	// For all available options, see:
	// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

	release: {
		deploy: {
			// If deployed to Netlify, it will be tagged as production, deploy-preview, or branch-deploy.
			// Otherwise, we don't know what environment is being run on (e.g. local, CI).
			env: process.env.CONTEXT || 'unknown',
		},
	},

	// Only print logs for uploading source maps in CI
	silent: !process.env.CI,

	// Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
	// This can increase your server load as well as your hosting bill.
	// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
	// side errors will fail.
	// tunnelRoute: "/monitoring",

	// Upload a larger set of source maps for prettier stack traces (increases build time)
	widenClientFileUpload: true,

	// Automatically annotate React components to show their full name in breadcrumbs and session replay
	reactComponentAnnotation: {
		enabled: true,
	},

	// Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
	// This can increase your server load as well as your hosting bill.
	// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
	// side errors will fail.
	tunnelRoute: '/monitoring',

	// Automatically tree-shake Sentry logger statements to reduce bundle size
	disableLogger: true,
})
