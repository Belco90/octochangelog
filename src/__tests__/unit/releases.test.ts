import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { MinimalRelease, ProcessedReleasesCollection } from '@/models'

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

/**
 * We dynamically import `getReleases` and `getProcessedReleases` after
 * resetting modules in each test group, so the module-level cache Map
 * is freshly created per group.
 */
let getReleases: (opts: {
	data: {
		owner: string
		repo: string
		fromVersion?: string | null
		toVersion?: string | null
	}
}) => Promise<Array<MinimalRelease>>

let getProcessedReleases: (opts: {
	data: { owner: string; repo: string; from: string; to: string }
}) => Promise<ProcessedReleasesCollection | null>

async function importServerFunctions() {
	const mod = await import('@/server/releases')
	getReleases = mod.getReleases as typeof getReleases
	getProcessedReleases = mod.getProcessedReleases as typeof getProcessedReleases
}

describe('getReleases', () => {
	beforeEach(async () => {
		vi.resetModules()
		await importServerFunctions()
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('should fetch and return only stable releases for dom-testing-library', async () => {
		const releases = await getReleases({
			data: {
				owner: 'testing-library',
				repo: 'dom-testing-library',
			},
		})

		// Fixture has 286 releases total, 12 are prereleases (alpha/beta)
		// So stable releases = 286 - 12 = 274
		expect(releases.length).toBe(274)

		// All returned releases should be stable (no alpha/beta/rc)
		for (const release of releases) {
			expect(release.tag_name).not.toMatch(/alpha|beta|rc/i)
		}
	})

	it('should return releases in fixture order (descending by version)', async () => {
		const releases = await getReleases({
			data: {
				owner: 'testing-library',
				repo: 'dom-testing-library',
			},
		})

		// First release should be the latest
		expect(releases[0].tag_name).toBe('v8.17.1')

		// Last release should be the oldest
		expect(releases[releases.length - 1].tag_name).toBe('v1.1.0')
	})

	it('should include expected MinimalRelease properties', async () => {
		const releases = await getReleases({
			data: {
				owner: 'testing-library',
				repo: 'dom-testing-library',
			},
		})

		const first = releases[0]

		expect(first).toHaveProperty('id')
		expect(first).toHaveProperty('tag_name')
		expect(first).toHaveProperty('name')
		expect(first).toHaveProperty('html_url')
		expect(first).toHaveProperty('body')
	})

	it('should fetch all stable releases for yarnpkg/berry with scoped tags', async () => {
		const releases = await getReleases({
			data: {
				owner: 'yarnpkg',
				repo: 'berry',
			},
		})

		// Fixture has 3 releases, all stable
		expect(releases.length).toBe(3)
		expect(releases[0].tag_name).toBe('@yarnpkg/cli/4.12.0')
		expect(releases[2].tag_name).toBe('@yarnpkg/cli/4.10.3')
	})
})

describe('getReleases caching', () => {
	beforeEach(async () => {
		vi.resetModules()
		await importServerFunctions()
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('should return cached releases on second call without re-fetching', async () => {
		// First call - fetches from MSW
		const releases1 = await getReleases({
			data: {
				owner: 'yarnpkg',
				repo: 'berry',
			},
		})

		// Second call - should return cached data
		const releases2 = await getReleases({
			data: {
				owner: 'yarnpkg',
				repo: 'berry',
			},
		})

		// Both should return the same data
		expect(releases1).toEqual(releases2)
		expect(releases1.length).toBe(3)
	})

	it('should maintain separate cache entries per repository', async () => {
		const berryReleases = await getReleases({
			data: {
				owner: 'yarnpkg',
				repo: 'berry',
			},
		})

		const domReleases = await getReleases({
			data: {
				owner: 'testing-library',
				repo: 'dom-testing-library',
			},
		})

		// Different repos should have different results
		expect(berryReleases.length).toBe(3)
		expect(domReleases.length).toBe(274)
	})
})

describe('getReleases pagination', () => {
	beforeEach(async () => {
		vi.resetModules()
		await importServerFunctions()
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('should stop pagination at max 10 pages when version range targets are met', async () => {
		// Renovate has 1200 releases across 12 pages (100 per page).
		// With per_page=100, page 10 would reach release ~1000.
		// Fetching with fromVersion/toVersion within first 10 pages should stop.
		const releases = await getReleases({
			data: {
				owner: 'renovatebot',
				repo: 'renovate',
				fromVersion: '32.0.0',
				toVersion: '32.172.2',
			},
		})

		// Should have fetched stable releases (all renovate releases are stable)
		// but stopped at max 10 pages = 1000 releases
		expect(releases.length).toBe(1000)
	})

	it('should fetch all pages when version range requires going past max pagination', async () => {
		// When requesting versions that are in the last pages, the smart stopping
		// logic should continue past 10 pages because the target versions haven't
		// been reached yet.
		const releases = await getReleases({
			data: {
				owner: 'renovatebot',
				repo: 'renovate',
				fromVersion: '25.26.3',
				toVersion: 'latest',
			},
		})

		// Should fetch all 12 pages = 1200 releases because fromVersion
		// (25.26.3) is the very last release in page 12
		expect(releases.length).toBe(1200)
	})
})

describe('getProcessedReleases', () => {
	beforeEach(async () => {
		vi.resetModules()
		await importServerFunctions()
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('should filter releases by version range and group by semver type', async () => {
		const result = await getProcessedReleases({
			data: {
				owner: 'testing-library',
				repo: 'dom-testing-library',
				from: 'v8.14.0',
				to: 'v8.17.1',
			},
		})

		expect(result).not.toBeNull()

		// The range v8.14.0 (exclusive) to v8.17.1 (inclusive) should include:
		// v8.17.1 (Bug Fixes), v8.17.0 (Features), v8.16.1 (Bug Fixes),
		// v8.16.0 (Features), v8.15.0 (Features), v8.14.1 (Bug Fixes)
		const groups = Object.keys(result!)

		// Should contain both "features" and "bug fixes" groups
		expect(groups).toContain('bug fixes')
		expect(groups).toContain('features')
	})

	it('should sort filtered releases in ascending order', async () => {
		const result = await getProcessedReleases({
			data: {
				owner: 'testing-library',
				repo: 'dom-testing-library',
				from: 'v8.14.0',
				to: 'v8.17.1',
			},
		})

		expect(result).not.toBeNull()

		// Check that within each group, releases are sorted ascending by version
		for (const group of Object.values(result!)) {
			for (let i = 1; i < group.length; i++) {
				const prevTag = group[i - 1].tag_name.replace('v', '')
				const currTag = group[i].tag_name.replace('v', '')
				const prevParts = prevTag.split('.').map(Number)
				const currParts = currTag.split('.').map(Number)
				// Compare major.minor.patch: prev <= curr
				const isAscending =
					prevParts[0] < currParts[0] ||
					(prevParts[0] === currParts[0] && prevParts[1] < currParts[1]) ||
					(prevParts[0] === currParts[0] &&
						prevParts[1] === currParts[1] &&
						prevParts[2] <= currParts[2])

				expect(isAscending).toBe(true)
			}
		}
	})

	it('should return null when no releases match the version range', async () => {
		const result = await getProcessedReleases({
			data: {
				owner: 'testing-library',
				repo: 'dom-testing-library',
				from: 'v99.0.0',
				to: 'v100.0.0',
			},
		})

		expect(result).toBeNull()
	})

	it('should return null when range is inverted', async () => {
		const result = await getProcessedReleases({
			data: {
				owner: 'testing-library',
				repo: 'dom-testing-library',
				from: 'v8.17.1',
				to: 'v8.14.0',
			},
		})

		expect(result).toBeNull()
	})

	it('should handle "latest" as the to version', async () => {
		const result = await getProcessedReleases({
			data: {
				owner: 'testing-library',
				repo: 'dom-testing-library',
				from: 'v8.16.0',
				to: 'latest',
			},
		})

		expect(result).not.toBeNull()

		// Should include releases from v8.16.1 up to v8.17.1
		const allProcessedReleases = Object.values(result!).flat()
		const tagNames = allProcessedReleases.map((r) => r.tag_name)

		// v8.17.1 should be included (latest)
		expect(tagNames).toContain('v8.17.1')

		// v8.16.0 should NOT be included (from is exclusive)
		expect(tagNames).not.toContain('v8.16.0')
	})
})

describe('getProcessedReleases markdown parsing', () => {
	beforeEach(async () => {
		vi.resetModules()
		await importServerFunctions()
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('should parse markdown bodies into mdast trees', async () => {
		const result = await getProcessedReleases({
			data: {
				owner: 'testing-library',
				repo: 'dom-testing-library',
				from: 'v8.16.1',
				to: 'v8.17.1',
			},
		})

		expect(result).not.toBeNull()

		// Each processed release should have a descriptionMdast with type 'root'
		for (const group of Object.values(result!)) {
			for (const release of group) {
				expect(release.descriptionMdast).toHaveProperty('type', 'root')
				expect(release.descriptionMdast).toHaveProperty('children')
				expect(Array.isArray(release.descriptionMdast.children)).toBe(true)
				// Should have at least one child node (the list of changes)
				expect(release.descriptionMdast.children.length).toBeGreaterThan(0)
			}
		}
	})

	it('should set correct title on processed releases matching semver groups', async () => {
		const result = await getProcessedReleases({
			data: {
				owner: 'testing-library',
				repo: 'dom-testing-library',
				from: 'v8.16.1',
				to: 'v8.17.1',
			},
		})

		expect(result).not.toBeNull()

		// v8.17.1 has "### Bug Fixes" heading -> title: 'bug fixes'
		// v8.17.0 has "### Features" heading -> title: 'features'
		if (result!['bug fixes']) {
			for (const release of result!['bug fixes']) {
				expect(release.title).toBe('bug fixes')
			}
		}

		if (result!.features) {
			for (const release of result!.features) {
				expect(release.title).toBe('features')
			}
		}
	})

	it('should strip body from processed releases and keep remaining properties', async () => {
		const result = await getProcessedReleases({
			data: {
				owner: 'testing-library',
				repo: 'dom-testing-library',
				from: 'v8.16.1',
				to: 'v8.17.1',
			},
		})

		expect(result).not.toBeNull()

		for (const group of Object.values(result!)) {
			for (const release of group) {
				// Should have these properties from MinimalRelease (minus body)
				expect(release).toHaveProperty('id')
				expect(release).toHaveProperty('tag_name')
				expect(release).toHaveProperty('name')
				expect(release).toHaveProperty('html_url')

				// Should NOT have body (it's been replaced by descriptionMdast)
				expect(release).not.toHaveProperty('body')

				// Should have processed properties
				expect(release).toHaveProperty('title')
				expect(release).toHaveProperty('originalTitle')
				expect(release).toHaveProperty('descriptionMdast')
			}
		}
	})
})

describe('getProcessedReleases with yarnpkg/berry scoped tags', () => {
	beforeEach(async () => {
		vi.resetModules()
		await importServerFunctions()
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('should process releases with scoped tags correctly', async () => {
		const result = await getProcessedReleases({
			data: {
				owner: 'yarnpkg',
				repo: 'berry',
				from: '@yarnpkg/cli/4.10.3',
				to: '@yarnpkg/cli/4.12.0',
			},
		})

		expect(result).not.toBeNull()

		// yarnpkg/berry releases have "## What's Changed" and "## New Contributors"
		// headings — these would be grouped under "others" since they don't match
		// semver groups
		const allProcessedReleases = Object.values(result!).flat()

		expect(allProcessedReleases.length).toBeGreaterThan(0)

		// All releases should have scoped tag names
		for (const release of allProcessedReleases) {
			expect(release.tag_name).toMatch(/^@yarnpkg\/cli\//)
		}
	})
})

describe('cache sharing between getReleases and getProcessedReleases', () => {
	beforeEach(async () => {
		vi.resetModules()
		await importServerFunctions()
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('should work end-to-end when getProcessedReleases is called after getReleases for the same repo', async () => {
		// First call fetches and caches releases
		const releases = await getReleases({
			data: {
				owner: 'yarnpkg',
				repo: 'berry',
			},
		})

		expect(releases.length).toBe(3)

		// getProcessedReleases for the same repo should reuse the cached data
		const result = await getProcessedReleases({
			data: {
				owner: 'yarnpkg',
				repo: 'berry',
				from: '@yarnpkg/cli/4.10.3',
				to: '@yarnpkg/cli/4.12.0',
			},
		})

		expect(result).not.toBeNull()

		const allProcessedReleases = Object.values(result!).flat()

		expect(allProcessedReleases.length).toBeGreaterThan(0)
	})
})
