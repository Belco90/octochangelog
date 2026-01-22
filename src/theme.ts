import {
	createSystem,
	defaultConfig,
	defineConfig,
	defineTokens,
	defineSemanticTokens,
} from '@chakra-ui/react'

function getSemanticColor(colorPalette: 'primary' | 'secondary') {
	return {
		contrast: {
			value: { base: 'white', _dark: 'white' },
		},
		fg: {
			value: {
				base: `{colors.${colorPalette}.700}`,
				_dark: `{colors.${colorPalette}.300}`,
			},
		},
		subtle: {
			value: {
				base: `{colors.${colorPalette}.100}`,
				_dark: `{colors.${colorPalette}.900}`,
			},
		},
		muted: {
			value: {
				base: `{colors.${colorPalette}.200}`,
				_dark: `{colors.${colorPalette}.800}`,
			},
		},
		emphasized: {
			value: {
				base: `{colors.${colorPalette}.300}`,
				_dark: `{colors.${colorPalette}.700}`,
			},
		},
		solid: {
			value: {
				base: `{colors.${colorPalette}.600}`,
				_dark: `{colors.${colorPalette}.600}`,
			},
		},
		focusRing: {
			value: {
				base: `{colors.${colorPalette}.500}`,
				_dark: `{colors.${colorPalette}.500}`,
			},
		},
		border: {
			value: {
				base: `{colors.${colorPalette}.500}`,
				_dark: `{colors.${colorPalette}.400}`,
			},
		},
	} as const
}

const { fonts } = defineTokens({
	fonts: {
		heading: { value: "'Inter Variable', sans-serif" },
		body: { value: "'Inter Variable', sans-serif" },
		mono: { value: "'Roboto Mono Variable', monospace" },
	},
})

const { colors } = defineTokens({
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
	},
})

const { colors: semanticColors } = defineSemanticTokens({
	colors: {
		brand: getSemanticColor('primary'),
		accent: getSemanticColor('secondary'),
	},
})

const customConfig = defineConfig({
	globalCss: {
		'html, body': { height: 'full' },
		'*': {
			focusRingColor: 'accent.focusRing !important',
		},
	},
	theme: {
		tokens: {
			fonts,
			colors,
		},
		semanticTokens: {
			colors: semanticColors,
		},
	},
})

export const system = createSystem(defaultConfig, customConfig)
