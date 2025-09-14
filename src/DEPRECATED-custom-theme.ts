interface SemanticToken {
	default: string
	_dark: string
}

// These are our normal text colors for light and dark modes.
// Do NOT use for text that goes on a colored background.
// Text on colored backgrounds should use a suitable hue from the background color scheme.

const primaryTextLightMode = coolGray['900']
const secondaryTextLightMode = coolGray['700']
const tertiaryTextLightMode = coolGray['600']

const primaryTextDarkMode = coolGray['50']
const secondaryTextDarkMode = coolGray['300']
const tertiaryTextDarkMode = coolGray['400']

const monochrome1: SemanticToken = {
	default: 'black',
	_dark: 'white',
}
const monochrome2: SemanticToken = {
	default: 'gray.900',
	_dark: 'gray.50',
}

const monochrome3: SemanticToken = {
	default: 'gray.800',
	_dark: 'gray.100',
}
const monochrome4: SemanticToken = {
	default: 'gray.700',
	_dark: 'gray.200',
}
const monochrome5: SemanticToken = {
	default: 'gray.600',
	_dark: 'gray.300',
}

function invertSemanticToken(token: SemanticToken): SemanticToken {
	const { default: defaultValue, _dark } = token
	return {
		default: _dark,
		_dark: defaultValue,
	}
}

const customTheme = extendTheme(
	{
		semanticTokens: {
			colors: {
				primaryText: {
					default: primaryTextLightMode,
					_dark: primaryTextDarkMode,
				},
				secondaryText: {
					default: secondaryTextLightMode,
					_dark: secondaryTextDarkMode,
				},
				tertiaryText: {
					default: tertiaryTextLightMode,
					_dark: tertiaryTextDarkMode,
				},
				monochrome1,
				monochrome2,
				monochrome3,
				monochrome4,
				monochrome5,
				monochromeInverted1: invertSemanticToken(monochrome1),
				monochromeInverted2: invertSemanticToken(monochrome2),
				monochromeInverted3: invertSemanticToken(monochrome3),
				monochromeInverted4: invertSemanticToken(monochrome4),
				monochromeInverted5: invertSemanticToken(monochrome5),
				background1: invertSemanticToken(monochrome1),
				background2: invertSemanticToken(monochrome2),
				background3: invertSemanticToken(monochrome3),
			},
		},
		components: {
			Link: {
				baseStyle: (props: Dict) => {
					return { color: mode('primary.700', 'primary.400')(props) }
				},
			},
			Button: {
				variants: {
					cta: (props: Dict) => {
						return {
							fontWeight: 'black',
							fontSize: '2xl',
							letterSpacing: 'tight',
							p: 6,
							size: 'lg',
							boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
							borderRadius: '2xl',
							bg: mode('primary.900', 'primary.200')(props),
							color: mode('primary.50', 'primary.900')(props),
							_hover: {
								bg: mode('primary.700', 'primary.100')(props),
								cursor: 'pointer',
							},
							_active: {
								bg: mode('primary.900', 'primary.200')(props),
								boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25) !important',
							},
						}
					},
				},
			},
			Container: {
				variants: {
					fluid: {
						maxWidth: 'container.xl',
					},
				},
			},
		},
	},
	withDefaultColorScheme({
		colorScheme: 'gray',
		components: ['Code', 'BlockQuote'],
	}),
)

export default customTheme
