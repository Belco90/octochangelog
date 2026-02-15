import {
	createSystem,
	defaultConfig,
	defineConfig,
	defineTokens,
	defineSemanticTokens,
	defineRecipe,
	defineSlotRecipe,
} from '@chakra-ui/react'
import { fieldAnatomy } from '@chakra-ui/react/anatomy'

function getSemanticColor(colorPalette: 'brand' | 'accent') {
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

const tokens = defineTokens({
	fonts: {
		heading: { value: "'Inter Variable', sans-serif" },
		body: { value: "'Inter Variable', sans-serif" },
		mono: { value: "'Roboto Mono Variable', monospace" },
	},
	colors: {
		brand: {
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
		accent: {
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
	spacing: {
		'0': { value: '0' },
		auto: { value: 'auto' },
	},
	borders: {
		sm: { value: '1px solid' },
		md: { value: '2px solid' },
		lg: { value: '4px solid' },
	},
	borderWidths: {
		'0': { value: '0' },
		sm: { value: '1px' },
		md: { value: '2px' },
		lg: { value: '4px' },
	},
})

const semanticTokens = defineSemanticTokens({
	colors: {
		brand: getSemanticColor('brand'),
		accent: getSemanticColor('accent'),
	},
	shadows: {
		main: {
			description: 'Main custom shadow',
			value: {
				base: '0px 4px 4px rgba(0, 0, 0, 0.25)',
				_dark: '0px 4px 4px {colors.brand.950/25}',
			},
		},
		cta: {
			description: 'CTA button shadow',
			value: {
				base: '0px 4px 4px rgba(0, 0, 0, 0.25)',
				_active: '0px 2px 2px rgba(0, 0, 0, 0.25) !important',
			},
		},
	},
})

const buttonRecipe = defineRecipe({
	base: {
		// Default properties for all buttons
		fontWeight: 'bold',
	},
	variants: {
		variant: {
			cta: {
				fontWeight: 'black',
				fontSize: 'xl',
				letterSpacing: 'tight',
				py: '5',
				px: '4',
				boxShadow: 'cta',
				borderRadius: '2xl',
				bgColor: { base: 'brand.900', _dark: 'brand.200' },
				color: { base: 'brand.50', _dark: 'brand.900' },
				_hover: {
					bg: { base: 'brand.700', _dark: 'brand.100' },
				},
				_active: {
					bg: { base: 'brand.900', _dark: 'brand.200' },
				},
			},
		},
	},
})

/** Extend default field slot recipe */
const fieldSlotRecipe = defineSlotRecipe({
	slots: fieldAnatomy.keys(),
	base: {
		label: { fontSize: 'md', fontWeight: 'bold', color: 'fg.muted' },
	},
})

/** Extend default link recipe to add active and focus-visible state styling */
const linkRecipe = defineRecipe({
	base: {
		_active: {
			textDecoration: 'underline',
			textUnderlineOffset: '3px',
		},
		_focusVisible: {
			textDecoration: 'underline',
			textUnderlineOffset: '3px',
		},
	},
})

const customConfig = defineConfig({
	strictTokens: true,
	globalCss: {
		'html, body': { height: 'full' },
		'*': {
			focusRing: 'none !important',
			focusVisibleRing: 'outside !important',
			focusRingColor: 'accent.focusRing !important',
		},
	},
	theme: {
		tokens,
		semanticTokens,
		recipes: { button: buttonRecipe, link: linkRecipe },
		slotRecipes: { field: fieldSlotRecipe },
	},
})

export const system = createSystem(defaultConfig, customConfig)
