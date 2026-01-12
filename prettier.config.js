// @ts-check

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const prettierConfig = {
	singleQuote: true,
	semi: false,
	useTabs: true,
	overrides: [
		{
			files: ['*.json', '*.json5'],
			options: {
				singleQuote: false,
			},
		},
	],
}

export default prettierConfig
