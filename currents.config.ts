import type { CurrentsConfig } from '@currents/playwright'

const config: CurrentsConfig = {
	recordKey: process.env.CURRENTS_RECORD_KEY ?? 'NOT-SET',
	projectId: process.env.CURRENTS_PROJECT_ID ?? 'NOT-SET',
}

export default config
