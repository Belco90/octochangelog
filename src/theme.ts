import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const customConfig = defineConfig({
	strictTokens: true,
	globalCss: {
		'html, body, #__next': { height: 'full' },
	},
	theme: {
		tokens: {
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
				secondary: {
					50: { value: '#F0F9FF' },
					100: { value: '#E0F2FE' },
					200: { value: '#BAE6FD' },
					300: { value: '#7DD3FC' },
					400: { value: '#38BDF8' },
					500: { value: '#0EA5E9' },
					600: { value: '#0284C7' },
					700: { value: '#0369A1' },
					800: { value: '#075985' },
					900: { value: '#0C4A6E' },
					950: { value: '#082F49' },
				},
				gray: {
					50: { value: '#F9FAFB' },
					100: { value: '#F3F4F6' },
					200: { value: '#E5E7EB' },
					300: { value: '#D1D5DB' },
					400: { value: '#9CA3AF' },
					500: { value: '#6B7280' },
					600: { value: '#4B5563' },
					700: { value: '#374151' },
					800: { value: '#1F2937' },
					900: { value: '#111827' },
					950: { value: '#030712' },
				},
			},
			fonts: {
				heading: { value: 'var(--font-inter)' },
				body: { value: 'var(--font-inter)' },
				mono: { value: 'var(--font-roboto-mono)' },
			},
		},
	},
})

const system = createSystem(defaultConfig, customConfig)

export { system }
