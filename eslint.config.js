// @ts-check
import { fileURLToPath } from 'node:url'

import { includeIgnoreFile } from '@eslint/compat'
import eslint from '@eslint/js'
import eslintReact from '@eslint-react/eslint-plugin'
import stylistic from '@stylistic/eslint-plugin'
import tanStackQuery from '@tanstack/eslint-plugin-query'
import tanStackRouter from '@tanstack/eslint-plugin-router'
import vitest from '@vitest/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettierConfig from 'eslint-config-prettier/flat'
import * as importX from 'eslint-plugin-import-x'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import playwright from 'eslint-plugin-playwright'
import reactHooks from 'eslint-plugin-react-hooks'
import unicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import * as tsEslint from 'typescript-eslint'

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

export default defineConfig(
	eslint.configs.recommended,
	tsEslint.configs.recommendedTypeChecked,
	tsEslint.configs.stylisticTypeChecked,
	importX.flatConfigs.recommended,
	importX.flatConfigs.typescript,
	importX.flatConfigs.react,
	tanStackQuery.configs['flat/recommended'],
	tanStackRouter.configs['flat/recommended'],
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
			'@stylistic': stylistic,
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
					message: 'Please import from `test-utils` instead',
				},
				{
					name: '@playwright/test',
					message: 'Please import from `e2e/playwright-utils` instead',
					importNames: ['test'],
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
			'jsx-a11y/accessible-emoji': 'error',
			'jsx-a11y/alt-text': [
				'warn',
				{
					elements: ['img'],
					img: ['Image'],
				},
			],

			// Stylistic (JSX)
			'@stylistic/jsx-self-closing-comp': 'warn',
			'@stylistic/jsx-quotes': 'warn',
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
		rules: {
			'vitest/padding-around-all': 'warn',
		},
	},
	{
		name: 'Playwright',
		files: ['e2e/**'],
		extends: [playwright.configs['flat/recommended']],
	},
	{
		name: 'Config files',
		files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
		extends: [tsEslint.configs.disableTypeChecked],
	},
	includeIgnoreFile(gitignorePath, 'Imported .gitignore patterns'),
	globalIgnores(['**/public', '**/next-env.d.ts', '**/src/fixtures/**']),
	prettierConfig, // should always be the last one
)
