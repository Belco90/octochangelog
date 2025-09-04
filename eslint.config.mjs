import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import unicorn from 'eslint-plugin-unicorn'
import tseslint from 'typescript-eslint'

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
	recommendedConfig: js.configs.recommended,
})

export default defineConfig([
	{
		extends: compat.extends(
			'eslint:recommended',
			'plugin:@typescript-eslint/eslint-recommended',
			'next/core-web-vitals',
			'plugin:@typescript-eslint/recommended',
			'plugin:@tanstack/eslint-plugin-query/recommended',
			'prettier',
		),

		plugins: {
			unicorn,
		},

		settings: {
			'import/internal-regex': '^(@app-|~)',
		},

		rules: {
			'no-shadow': 'error',
			'no-warning-comments': 'off',
			'no-console': 'warn',

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

			'react/self-closing-comp': 'error',
			'react/react-in-jsx-scope': 'off',
			'react/jsx-boolean-value': 'error',
			'react/no-unknown-property': 'off',
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
						'parent',
						'sibling',
						'index',
						'object',
						'type',
					],

					pathGroups: [
						{
							pattern: '@/**',
							group: 'external',
							position: 'after',
						},
					],
				},
			],

			'unicorn/no-for-loop': 'error',
			'unicorn/no-array-for-each': 'error',
			'unicorn/no-array-reduce': 'error',
		},
	},
	{
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		extends: compat.extends(
			'plugin:@typescript-eslint/recommended-type-checked',
			'plugin:@typescript-eslint/stylistic-type-checked',
		),

		rules: {
			'@typescript-eslint/array-type': [
				'warn',
				{
					default: 'generic',
				},
			],

			'@typescript-eslint/consistent-type-exports': ['error'],
			'@typescript-eslint/consistent-type-imports': ['error'],
			'@typescript-eslint/consistent-type-definitions': 'off',
			'@typescript-eslint/prefer-nullish-coalescing': 'off',
			'@typescript-eslint/unbound-method': 'off',
		},
	},
	{
		files: ['src/app/**/*.[jt]s?(x)'],

		rules: {
			'import/group-exports': 'off',
		},
	},
	{
		files: [
			'src/**/__tests__/**/*.[jt]s?(x)',
			'src/**/?(*.)+(spec|test).[jt]s?(x)',
			'src/setup-tests.ts',
		],

		extends: compat.extends('plugin:@vitest/legacy-recommended'),
	},
	{
		files: ['cypress/**/*.[jt]s'],
		extends: compat.extends('plugin:cypress/recommended'),
	},
	// Config files
	{
		files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
		extends: [tseslint.configs.disableTypeChecked],
	},
	// Happo
	{
		files: ['.happo.js'],
		rules: {
			'@typescript-eslint/no-require-imports': 'off',
		},
	},
	globalIgnores([
		'**/node_modules',
		'coverage',
		'**/.next',
		'**/public',
		'**/.env*',
		'**/next-env.d.ts',
	]),
])
