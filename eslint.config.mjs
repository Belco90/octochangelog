import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import tanstackQuery from '@tanstack/eslint-plugin-query'
import vitest from '@vitest/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettierConfig from 'eslint-config-prettier/flat'
import cypress from 'eslint-plugin-cypress'
import unicorn from 'eslint-plugin-unicorn'
import tseslint from 'typescript-eslint'

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
})

export default defineConfig(
	{
		name: 'Next.js with Core Web Vitals',
		extends: compat.extends('next/core-web-vitals'),
	},
	eslint.configs.recommended,
	tseslint.configs.recommendedTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	tanstackQuery.configs['flat/recommended'],
	{
		name: 'typescript-eslint config',
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
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
					name: '@chakra-ui/react',
					importNames: ['Link'],
					message: 'Please import from `@/components/Link` instead.',
				},
			],

			// React
			'react/self-closing-comp': 'error',
			'react/react-in-jsx-scope': 'off',
			'react/jsx-boolean-value': 'error',
			'react/no-unknown-property': 'off',

			// Import
			'import/newline-after-import': 'error',
			'import/order': [
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
		extends: [tseslint.configs.disableTypeChecked],
	},
	globalIgnores([
		'**/node_modules',
		'coverage',
		'**/.next',
		'**/public',
		'**/.env*',
		'**/next-env.d.ts',
		'src/components/snippets',
	]),
	prettierConfig, // should always be the last one
)
