import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

/** Only debug if not deployed on Vercel */
const shouldDebug = !process.env.NEXT_PUBLIC_VERCEL_ENV

Sentry.init({
	dsn: SENTRY_DSN,

	// Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
	tracesSampleRate: 1,

	// Setting this option to true will print useful information to the console while you're setting up Sentry.
	debug: shouldDebug,
})
