/// <reference types="vite/client" />

type NETLIFY_CONTEXT = 'production' | 'deploy-preview' | 'branch-deploy' | 'dev'

// Client-side environment variables
interface ImportMetaEnv {
	readonly VITE_PIRSCH_ID_CODE: string
	readonly VITE_API_MOCKING: 'enabled' | undefined
	readonly VITE_GITHUB_APP_CLIENT_ID: string
	readonly VITE_SENTRY_DSN: string
	readonly VITE_FEATURE_FLAG_DARK_MODE: 'enabled' | undefined

	// Re-export some Netlify env vars to the client-side (done the `.env` file)
	readonly VITE_NETLIFY: string | undefined
	readonly VITE_CONTEXT: NETLIFY_CONTEXT | undefined

	// Feature flag for new design
	readonly VITE_NEW_DESIGN: 'enabled' | undefined
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

// Server-side environment variables
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly NODE_ENV: 'development' | 'production' | 'test'
			readonly CONTEXT: NETLIFY_CONTEXT | undefined
			readonly GITHUB_APP_CLIENT_SECRET: string
			readonly SENTRY_AUTH_TOKEN: string
		}
	}
}
