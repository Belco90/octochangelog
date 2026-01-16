import * as Sentry from '@sentry/tanstackstart-react'

Sentry.init({
	dsn: process.env.VITE_SENTRY_DSN,

	// Setting this option to true will send default PII data to Sentry.
	// https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/configuration/options/#sendDefaultPii
	sendDefaultPii: true,

	// Enable logs to be sent to Sentry
	enableLogs: true,

	environment: process.env.VITE_CONTEXT ?? 'unknown',

	// Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
	// We recommend adjusting this value in production.
	// Learn more at https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
	tracesSampleRate: 1.0,
})
