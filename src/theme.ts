import {
	createSystem,
	defaultConfig,
	defineConfig,
	defineRecipe,
} from '@chakra-ui/react'

/** Override base style for Container */
const containerRecipe = defineRecipe({
	base: {
		maxWidth: 'xl',
	},
})

/** Add variant for Button */
const buttonRecipe = defineRecipe({
	variants: {
		variant: {
			cta: {
				fontWeight: 'black',
				fontSize: '2xl',
				letterSpacing: 'tight',
				p: '6',
				boxShadow: 'cta',
				borderRadius: '2xl',
				bg: { base: 'primary.900', _dark: 'primary.200' },
				color: { base: 'primary.50', _dark: 'primary.900' },
				_hover: {
					bg: { base: 'primary.700', _dark: 'primary.100' },
					cursor: 'button',
				},
				_active: {
					bg: { base: 'primary.900', _dark: 'primary.200' },
				},
			},
		},
	},
})

const customConfig = defineConfig({
	// TODO: enable strict tokens once the theme is stable
	// strictTokens: true,
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
		recipes: {
			container: containerRecipe,
			button: buttonRecipe,
		},
		semanticTokens: {
			shadows: {
				cta: {
					value: {
						base: '0px 4px 4px rgba(0, 0, 0, 0.25)',
						_active: '0px 2px 2px rgba(0, 0, 0, 0.25) !important',
					},
					description: 'Shadow for CTA buttons',
				},
			},

			// TODO: review these semantic tokens to move them somewhere else, or delete them if not used
			colors: {
				primaryText: {
					value: { base: 'gray.900', _dark: 'gray.50' },
					description: 'Primary text color',
				},
				secondaryText: {
					value: { base: 'gray.700', _dark: 'gray.300' },
					description: 'Secondary text color',
				},
				tertiaryText: {
					value: { base: 'gray.600', _dark: 'gray.400' },
					description: 'Tertiary text color',
				},
				monochrome1: {
					value: { base: 'black', _dark: 'white' },
					description: 'Monochrome color 1',
				},
				monochrome2: {
					value: { base: 'gray.900', _dark: 'gray.50' },
					description: 'Monochrome color 2',
				},
				monochrome3: {
					value: { base: 'gray.800', _dark: 'gray.100' },
					description: 'Monochrome color 3',
				},
				monochrome4: {
					value: { base: 'gray.700', _dark: 'gray.200' },
					description: 'Monochrome color 4',
				},
				monochrome5: {
					value: { base: 'gray.600', _dark: 'gray.300' },
					description: 'Monochrome color 5',
				},
				monochromeInverted1: {
					value: { base: 'white', _dark: 'black' },
					description: 'Inverted monochrome color 1',
				},
				monochromeInverted2: {
					value: { base: 'gray.50', _dark: 'gray.900' },
					description: 'Inverted monochrome color 2',
				},
				monochromeInverted3: {
					value: { base: 'gray.100', _dark: 'gray.800' },
					description: 'Inverted monochrome color 3',
				},
				monochromeInverted4: {
					value: { base: 'gray.200', _dark: 'gray.700' },
					description: 'Inverted monochrome color 4',
				},
				monochromeInverted5: {
					value: { base: 'gray.300', _dark: 'gray.600' },
					description: 'Inverted monochrome color 5',
				},
				background1: {
					value: '{semantic.colors.monochrome1}',
					description: 'Background color 1',
				},
				background2: {
					value: '{semantic.colors.monochrome2}',
					description: 'Background color 2',
				},
				background3: {
					value: '{semantic.colors.monochrome3}',
					description: 'Background color 3',
				},
			},
		},
	},
})

const system = createSystem(defaultConfig, customConfig)

export { system }
