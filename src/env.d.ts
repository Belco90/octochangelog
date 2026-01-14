/// <reference types="vite/client" />

interface ImportMetaEnv {
	// Client-side environment variables
	readonly VITE_PIRSCH_ID_CODE: string
	readonly VITE_API_MOCKING: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

// Server-side environment variables
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly NODE_ENV: 'development' | 'production' | 'test'
			readonly CONTEXT:
				| 'production'
				| 'deploy-preview'
				| 'branch-deploy'
				| 'dev'
				| undefined
		}
	}
}
