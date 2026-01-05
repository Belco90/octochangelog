import eslint from '@eslint/js'
import eslintReact from '@eslint-react/eslint-plugin'
import tanstackQuery from '@tanstack/eslint-plugin-query'
import vitest from '@vitest/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettierConfig from 'eslint-config-prettier/flat'
import cypress from 'eslint-plugin-cypress'
import * as importX from 'eslint-plugin-import-x'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'
import unicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import * as tsEslint from 'typescript-eslint'

export default defineConfig(
	eslint.configs.recommended,
	tsEslint.configs.recommendedTypeChecked,
	tsEslint.configs.stylisticTypeChecked,
	importX.flatConfigs.recommended,
	importX.flatConfigs.typescript,
	importX.flatConfigs.react,
	tanstackQuery.configs['flat/recommended'],
	eslintReact.configs['recommended-type-checked'],
	reactHooks.configs.flat.recommended,
	jsxA11y.flatConfigs.recommended,
	{
		name: 'Linter options',
		linterOptions: {
			reportUnusedDisableDirectives: 'warn',
		},
	},
	{
		name: 'Globals',
		files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,mts,tsx,mtsx}'],
		languageOptions: {
			globals: {
				...globals.nodeBuiltin,
				...globals.browser,
			},
			parser: tsEslint.parser,
			ecmaVersion: 'latest',
			sourceType: 'module',
			parserOptions: {
				projectService: true,
			},
		},
	},
	{
		name: 'Override for all files',
		plugins: {
			unicorn,
		},

		rules: {
			// Base
			'no-shadow': 'error',
			'no-warning-comments': 'off',
			'no-console': 'warn', // doesn't seem to be enabled in any preset
			'no-restricted-imports': [
				'error',
				{
					name: '@testing-library/react',
					message: 'Please import from `test-utils` instead.',
				},
				{
					name: 'next/router',
					message: 'Please import from `next/navigation` instead.',
				},
				{
					name: '@chakra-ui/next-js',
					importNames: ['Link'],
					message: 'Please import from `ChakraNextLink` instead.',
				},
			],

			// Import
			// Rules enabled by `import-x/recommended` but are better handled by
			// TypeScript and typescript-eslint.
			'import-x/default': 'off',
			'import-x/export': 'off',
			'import-x/namespace': 'off',
			'import-x/no-unresolved': 'off',

			'import-x/newline-after-import': 'error',
			'import-x/order': [
				'error',
				{
					'newlines-between': 'always',

					alphabetize: {
						order: 'asc',
						caseInsensitive: false,
					},

					groups: [
						'builtin',
						'external',
						'internal',
						['parent', 'sibling', 'index'],
						'object',
						'type',
					],

					pathGroups: [
						{
							pattern: '@/**',
							group: 'internal',
							position: 'after',
						},
					],
				},
			],

			// Unicorn
			'unicorn/no-for-loop': 'error',
			'unicorn/no-array-for-each': 'error',
			'unicorn/no-array-reduce': 'error',

			// JSX A11Y
			'jsx-a11y/alt-text': [
				'warn',
				{
					elements: ['img'],
					img: ['Image'],
				},
			],

			// TypeScript
			'@typescript-eslint/array-type': [
				'warn',
				{
					default: 'generic',
				},
			],

			'@typescript-eslint/consistent-type-exports': ['error'],
			'@typescript-eslint/consistent-type-imports': ['error'],

			// Disabling because of index errors on interfaces,
			// which works fine in type aliases:
			// https://bobbyhadz.com/blog/typescript-index-signature-for-type-is-missing-in-type
			'@typescript-eslint/consistent-type-definitions': 'off',

			// Disabling because it's too strict:
			// we are interested in using || operator multiple times to avoid empty strings.
			'@typescript-eslint/prefer-nullish-coalescing': 'off',
			'@typescript-eslint/unbound-method': 'off',
		},
	},
	{
		name: 'Vitest',
		files: [
			'src/**/__tests__/**/*.[jt]s?(x)',
			'src/**/?(*.)+(spec|test).[jt]s?(x)',
			'src/setup-tests.ts',
			'vitest.*',
		],

		plugins: {
			vitest,
		},
		...vitest.configs.recommended,
	},
	{
		name: 'Cypress',
		files: ['cypress/**/*.[jt]s'],
		...cypress.configs.recommended,
	},
	{
		name: 'Happo',
		files: ['.happo.js'],
		rules: {
			'@typescript-eslint/no-require-imports': 'off',
		},
	},
	{
		name: 'Config files',
		files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
		extends: [tsEslint.configs.disableTypeChecked],
	},
	// TODO: disable most of the plugins for fixtures files
	globalIgnores([
		'**/node_modules',
		'coverage',
		'**/.next',
		'**/public',
		'**/.env*',
		'**/next-env.d.ts',
	]),
	prettierConfig, // should always be the last one
)
