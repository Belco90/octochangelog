import {
	createSystem,
	defaultConfig,
	defineConfig,
	defineTokens,
} from '@chakra-ui/react'

const fonts = defineTokens({
	fonts: {
		heading: { value: "'Inter Variable', sans-serif" },
		body: { value: "'Inter Variable', sans-serif" },
		mono: { value: "'Roboto Mono Variable', monospace" },
	},
})

const customConfig = defineConfig({
	globalCss: {
		'html, body': { height: '100%' },
	},
	theme: {
		tokens: {
			fonts,
			colors: {
				primary: {
					50: { value: '#FDF4FF' },
					100: { value: '#FAE8FF' },
					200: { value: '#F5D0FE' },
					300: { value: '#F0ABFC' },
					400: { value: '#E879F9' },
					500: { value: '#D946EF' },
					600: { value: '#C026D3' },
					700: { value: '#A21CAF' },
					800: { value: '#86198F' },
					900: { value: '#701A75' },
					950: { value: '#4A044E' },
				},
			},
		},
	},
})

export const system = createSystem(defaultConfig, customConfig)
