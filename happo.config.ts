import { defineConfig } from 'happo'

const DESKTOP_VIEWPORT = '1024x768'
const MOBILE_VIEWPORT = '320x640'

export default defineConfig({
	apiKey: process.env.HAPPO_API_KEY ?? 'NOT-SET',
	apiSecret: process.env.HAPPO_API_SECRET ?? 'NOT-SET',

	integration: {
		type: 'playwright',
	},

	targets: {
		'chrome-desktop': {
			type: 'chrome',
			viewport: DESKTOP_VIEWPORT,
		},
		'firefox-desktop': {
			type: 'firefox',
			viewport: DESKTOP_VIEWPORT,
		},
		'chrome-mobile': {
			type: 'chrome',
			viewport: MOBILE_VIEWPORT,
		},
		'ios-safari': {
			type: 'ios-safari',
		},
	},
})
