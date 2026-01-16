/// <reference types="vite/client" />

type NETLIFY_CONTEXT = 'production' | 'deploy-preview' | 'branch-deploy' | 'dev'

// Client-side environment variables
interface ImportMetaEnv {
	readonly VITE_PIRSCH_ID_CODE: string
	readonly VITE_API_MOCKING: string
	readonly VITE_GITHUB_APP_CLIENT_ID: string
	readonly VITE_SENTRY_DSN: string

	// Re-export some Netlify env vars to the client-side
	readonly VITE_NETLIFY: string | undefined
	readonly VITE_CONTEXT: NETLIFY_CONTEXT | undefined
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
		}
	}
}
