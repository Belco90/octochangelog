import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { MinimalRepository } from '@/models'

/**
 * Mock `createServerFn` from TanStack Start so that server functions
 * are directly callable in Node.js without the Start runtime context.
 *
 * The mock mimics the builder pattern:
 *   createServerFn().inputValidator(validator).handler(handlerFn)
 * and returns a function that validates input then calls the handler.
 *
 * We use importOriginal to preserve all other exports (e.g. createServerOnlyFn
 * used by github-auth.ts) so transitive imports don't break.
 */
vi.mock('@tanstack/react-start', async (importOriginal) => {
	const original: Awaited<typeof importOriginal> = await importOriginal()

	return {
		...original,
		createServerFn: () => ({
			inputValidator: (validator: (data: unknown) => unknown) => ({
				handler: (handlerFn: (opts: { data: unknown }) => Promise<unknown>) => {
					return async (opts: { data: unknown }) => {
						const data = validator(opts.data)
						return handlerFn({ data })
					}
				},
			}),
		}),
	}
})

type SearchRepositoriesResult = {
	total_count: number
	incomplete_results: boolean
	items: Array<MinimalRepository>
}

let searchRepositories: (opts: {
	data: { q: string; per_page?: number }
}) => Promise<SearchRepositoriesResult>

let getRepository: (opts: {
	data: { owner: string; repo: string }
}) => Promise<MinimalRepository>

async function importServerFunctions() {
	const mod = await import('@/server/repositories')
	searchRepositories = mod.searchRepositories as typeof searchRepositories
	getRepository = mod.getRepository as typeof getRepository
}

const MINIMAL_REPOSITORY_KEYS: Array<keyof MinimalRepository> = [
	'id',
	'owner',
	'html_url',
	'full_name',
	'name',
]

describe('searchRepositories', () => {
	beforeEach(async () => {
		vi.resetModules()
		await importServerFunctions()
	})

	it('should return matching repos for a search query', async () => {
		const result = await searchRepositories({ data: { q: 'testing' } })

		expect(result.total_count).toBe(2)
		expect(result.items).toHaveLength(2)
		expect(result.items[0].full_name).toBe(
			'testing-library/react-testing-library',
		)
		expect(result.items[1].full_name).toBe(
			'testing-library/dom-testing-library',
		)
	})

	it('should return only MinimalRepository fields', async () => {
		const result = await searchRepositories({ data: { q: 'testing' } })

		for (const item of result.items) {
			expect(Object.keys(item).sort()).toEqual(
				[...MINIMAL_REPOSITORY_KEYS].sort(),
			)
		}
	})

	it('should return empty items for non-matching query', async () => {
		const result = await searchRepositories({
			data: { q: 'nonexistentquery' },
		})

		expect(result.total_count).toBe(0)
		expect(result.items).toHaveLength(0)
	})
})

describe('getRepository', () => {
	beforeEach(async () => {
		vi.resetModules()
		await importServerFunctions()
	})

	it('should return repository data for a valid owner/repo', async () => {
		const result = await getRepository({
			data: { owner: 'testing-library', repo: 'dom-testing-library' },
		})

		expect(result.full_name).toBe('testing-library/dom-testing-library')
		expect(result.name).toBe('dom-testing-library')
	})

	it('should return only MinimalRepository fields', async () => {
		const result = await getRepository({
			data: { owner: 'testing-library', repo: 'dom-testing-library' },
		})

		expect(Object.keys(result).sort()).toEqual(
			[...MINIMAL_REPOSITORY_KEYS].sort(),
		)
	})
})
