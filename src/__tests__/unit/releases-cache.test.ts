import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { MinimalRelease, ReleaseVersion } from '@/models'

/**
 * The cache module uses module-level state (a Map), so we reset modules
 * before each test to start with a fresh cache.
 */

let getCacheKey: (owner: string, repo: string) => string
let getCachedReleasesForRange: (
	owner: string,
	repo: string,
	from?: ReleaseVersion | null,
	to?: ReleaseVersion | null,
) => Array<MinimalRelease> | null
let setCachedReleases: (
	owner: string,
	repo: string,
	releases: Array<MinimalRelease>,
) => void
let CACHE_TTL_MS: number
let MAX_CACHE_ENTRIES: number

async function importCacheModule() {
	const mod = await import('@/server/releases-cache')
	getCacheKey = mod.getCacheKey
	getCachedReleasesForRange = mod.getCachedReleasesForRange
	setCachedReleases = mod.setCachedReleases
	CACHE_TTL_MS = mod.CACHE_TTL_MS
	MAX_CACHE_ENTRIES = mod.MAX_CACHE_ENTRIES
}

const makeRelease = (tagName: string): MinimalRelease => ({
	id: Math.random(),
	tag_name: tagName,
	name: tagName,
	html_url: `https://github.com/owner/repo/releases/tag/${tagName}`,
	body: null,
})

describe('getCacheKey', () => {
	beforeEach(async () => {
		vi.resetModules()
		await importCacheModule()
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('should return owner/repo format', () => {
		expect(getCacheKey('testing-library', 'dom-testing-library')).toBe(
			'testing-library/dom-testing-library',
		)
	})

	it('should handle scoped package owners', () => {
		expect(getCacheKey('yarnpkg', 'berry')).toBe('yarnpkg/berry')
	})
})

describe('getCachedReleasesForRange without version range', () => {
	beforeEach(async () => {
		vi.resetModules()
		await importCacheModule()
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('should return null when no entry exists for the repo', () => {
		const result = getCachedReleasesForRange('owner', 'repo')

		expect(result).toBeNull()
	})

	it('should return null when TTL is exceeded', () => {
		let currentTime = 1_000_000
		vi.spyOn(Date, 'now').mockImplementation(() => currentTime)

		const releases = [makeRelease('v1.0.0')]
		setCachedReleases('owner', 'repo', releases)

		// Advance past TTL
		currentTime += CACHE_TTL_MS + 1

		const result = getCachedReleasesForRange('owner', 'repo')

		expect(result).toBeNull()
	})

	it('should auto-delete the entry when TTL is exceeded', () => {
		let currentTime = 1_000_000
		vi.spyOn(Date, 'now').mockImplementation(() => currentTime)

		const releases = [makeRelease('v1.0.0')]
		setCachedReleases('owner', 'repo', releases)

		// Expire the entry
		currentTime += CACHE_TTL_MS + 1
		getCachedReleasesForRange('owner', 'repo') // triggers deletion

		// Reset time to before TTL — if deletion worked, it will still be null
		currentTime = 0
		const result = getCachedReleasesForRange('owner', 'repo')

		expect(result).toBeNull()
	})
})

describe('getCachedReleasesForRange', () => {
	beforeEach(async () => {
		vi.resetModules()
		await importCacheModule()
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('should return null when no cache entry exists', () => {
		const result = getCachedReleasesForRange(
			'owner',
			'repo',
			'v1.0.0',
			'v2.0.0',
		)

		expect(result).toBeNull()
	})

	it('should return null when cached releases is empty', () => {
		setCachedReleases('owner', 'repo', [])

		const result = getCachedReleasesForRange(
			'owner',
			'repo',
			'v1.0.0',
			'v2.0.0',
		)

		expect(result).toBeNull()
	})

	it('should return cached releases when both from and to versions exist in cache', () => {
		const releases = [
			makeRelease('v3.0.0'),
			makeRelease('v2.0.0'),
			makeRelease('v1.0.0'),
		]
		setCachedReleases('owner', 'repo', releases)

		const result = getCachedReleasesForRange(
			'owner',
			'repo',
			'v1.0.0',
			'v3.0.0',
		)

		expect(result).toEqual(releases)
	})

	it('should return null when from version is not in cache', () => {
		const releases = [makeRelease('v3.0.0'), makeRelease('v2.0.0')]
		setCachedReleases('owner', 'repo', releases)

		const result = getCachedReleasesForRange(
			'owner',
			'repo',
			'v1.0.0',
			'v3.0.0',
		)

		expect(result).toBeNull()
	})

	it('should return null when to version is not in cache', () => {
		const releases = [
			makeRelease('v3.0.0'),
			makeRelease('v2.0.0'),
			makeRelease('v1.0.0'),
		]
		setCachedReleases('owner', 'repo', releases)

		const result = getCachedReleasesForRange(
			'owner',
			'repo',
			'v1.0.0',
			'v4.0.0',
		)

		expect(result).toBeNull()
	})

	it('should return null when "to" is "latest" even if data is cached (per #691)', () => {
		const releases = [
			makeRelease('v3.0.0'),
			makeRelease('v2.0.0'),
			makeRelease('v1.0.0'),
		]
		setCachedReleases('owner', 'repo', releases)

		const result = getCachedReleasesForRange(
			'owner',
			'repo',
			'v1.0.0',
			'latest',
		)

		expect(result).toBeNull()
	})

	it('should return null when "from" is "latest" even if data is cached (per #691)', () => {
		const releases = [
			makeRelease('v3.0.0'),
			makeRelease('v2.0.0'),
			makeRelease('v1.0.0'),
		]
		setCachedReleases('owner', 'repo', releases)

		const result = getCachedReleasesForRange(
			'owner',
			'repo',
			'latest',
			'v3.0.0',
		)

		expect(result).toBeNull()
	})

	it('should return null when both from and to are "latest" (per #691)', () => {
		const releases = [makeRelease('v3.0.0'), makeRelease('v2.0.0')]
		setCachedReleases('owner', 'repo', releases)

		const result = getCachedReleasesForRange(
			'owner',
			'repo',
			'latest',
			'latest',
		)

		expect(result).toBeNull()
	})

	it('should be case-insensitive when checking for "latest"', () => {
		const releases = [makeRelease('v3.0.0'), makeRelease('v1.0.0')]
		setCachedReleases('owner', 'repo', releases)

		expect(
			getCachedReleasesForRange('owner', 'repo', 'v1.0.0', 'LATEST'),
		).toBeNull()
		expect(
			getCachedReleasesForRange('owner', 'repo', 'Latest', 'v3.0.0'),
		).toBeNull()
	})

	it('should handle scoped tag names like @yarnpkg/cli/4.12.0', () => {
		const releases = [
			makeRelease('@yarnpkg/cli/4.12.0'),
			makeRelease('@yarnpkg/cli/4.11.0'),
			makeRelease('@yarnpkg/cli/4.10.3'),
		]
		setCachedReleases('owner', 'repo', releases)

		const result = getCachedReleasesForRange(
			'owner',
			'repo',
			'@yarnpkg/cli/4.10.3',
			'@yarnpkg/cli/4.12.0',
		)

		expect(result).toEqual(releases)
	})

	it('should return null when cache is expired', () => {
		let currentTime = 1_000_000
		vi.spyOn(Date, 'now').mockImplementation(() => currentTime)

		const releases = [makeRelease('v2.0.0'), makeRelease('v1.0.0')]
		setCachedReleases('owner', 'repo', releases)

		// Advance past TTL
		currentTime += CACHE_TTL_MS + 1

		const result = getCachedReleasesForRange(
			'owner',
			'repo',
			'v1.0.0',
			'v2.0.0',
		)

		expect(result).toBeNull()
	})

	it('should return cached releases when only from version is provided and exists', () => {
		const releases = [
			makeRelease('v3.0.0'),
			makeRelease('v2.0.0'),
			makeRelease('v1.0.0'),
		]
		setCachedReleases('owner', 'repo', releases)

		const result = getCachedReleasesForRange('owner', 'repo', 'v1.0.0', null)

		expect(result).toEqual(releases)
	})

	it('should return null when only from version is provided and does not exist', () => {
		const releases = [makeRelease('v3.0.0'), makeRelease('v2.0.0')]
		setCachedReleases('owner', 'repo', releases)

		const result = getCachedReleasesForRange('owner', 'repo', 'v1.0.0', null)

		expect(result).toBeNull()
	})

	it('should return cached releases when only to version is provided and exists', () => {
		const releases = [
			makeRelease('v3.0.0'),
			makeRelease('v2.0.0'),
			makeRelease('v1.0.0'),
		]
		setCachedReleases('owner', 'repo', releases)

		const result = getCachedReleasesForRange('owner', 'repo', null, 'v3.0.0')

		expect(result).toEqual(releases)
	})

	it('should return null when only to version is provided and does not exist', () => {
		const releases = [makeRelease('v3.0.0'), makeRelease('v2.0.0')]
		setCachedReleases('owner', 'repo', releases)

		const result = getCachedReleasesForRange('owner', 'repo', null, 'v4.0.0')

		expect(result).toBeNull()
	})
})

describe('setCachedReleases', () => {
	beforeEach(async () => {
		vi.resetModules()
		await importCacheModule()
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('should store releases and return them on subsequent get', () => {
		const releases = [makeRelease('v1.0.0'), makeRelease('v2.0.0')]
		setCachedReleases('owner', 'repo', releases)

		const result = getCachedReleasesForRange('owner', 'repo')

		expect(result).toEqual(releases)
	})

	it('should store the timestamp using Date.now', () => {
		const fixedTime = 9_999_999
		vi.spyOn(Date, 'now').mockReturnValue(fixedTime)

		const releases = [makeRelease('v1.0.0')]
		setCachedReleases('owner', 'repo', releases)

		// Just before TTL expires — still valid
		vi.spyOn(Date, 'now').mockReturnValue(fixedTime + CACHE_TTL_MS - 1)

		expect(getCachedReleasesForRange('owner', 'repo')).toEqual(releases)
	})

	it('should maintain separate cache entries per repository', () => {
		const releases1 = [makeRelease('v1.0.0')]
		const releases2 = [makeRelease('v2.0.0'), makeRelease('v3.0.0')]

		setCachedReleases('owner', 'repo-a', releases1)
		setCachedReleases('owner', 'repo-b', releases2)

		expect(getCachedReleasesForRange('owner', 'repo-a')).toEqual(releases1)
		expect(getCachedReleasesForRange('owner', 'repo-b')).toEqual(releases2)
	})

	it('should overwrite a previous entry for the same repo', () => {
		const old = [makeRelease('v1.0.0')]
		const fresh = [makeRelease('v2.0.0')]

		setCachedReleases('owner', 'repo', old)
		setCachedReleases('owner', 'repo', fresh)

		expect(getCachedReleasesForRange('owner', 'repo')).toEqual(fresh)
	})
})

describe('cache eviction', () => {
	beforeEach(async () => {
		vi.resetModules()
		await importCacheModule()
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('should evict expired entries when at capacity', () => {
		let currentTime = 1_000_000
		vi.spyOn(Date, 'now').mockImplementation(() => currentTime)

		// Fill cache to capacity with expired entries
		for (let i = 0; i < MAX_CACHE_ENTRIES; i++) {
			setCachedReleases('owner', `repo-${i}`, [makeRelease('v1.0.0')])
		}

		// Advance past TTL so all entries expire
		currentTime += CACHE_TTL_MS + 1

		// Adding a new entry should trigger sweep of expired entries
		setCachedReleases('owner', 'new-repo', [makeRelease('v2.0.0')])

		// New entry should be accessible
		expect(getCachedReleasesForRange('owner', 'new-repo')).not.toBeNull()
	})

	it('should evict the oldest entry when at capacity with no expired entries', () => {
		let currentTime = 1_000_000
		vi.spyOn(Date, 'now').mockImplementation(() => currentTime)

		// Fill cache to capacity — each entry gets a slightly newer timestamp
		for (let i = 0; i < MAX_CACHE_ENTRIES; i++) {
			currentTime += 1
			setCachedReleases('owner', `repo-${i}`, [makeRelease('v1.0.0')])
		}

		// All entries are still valid (within TTL)
		// Adding a new entry should evict the oldest (repo-0)
		currentTime += 1
		setCachedReleases('owner', 'new-repo', [makeRelease('v2.0.0')])

		// The oldest entry (repo-0) should have been evicted
		expect(getCachedReleasesForRange('owner', 'repo-0')).toBeNull()

		// The new entry and a recent entry should still be accessible
		expect(getCachedReleasesForRange('owner', 'new-repo')).not.toBeNull()
		expect(
			getCachedReleasesForRange('owner', `repo-${MAX_CACHE_ENTRIES - 1}`),
		).not.toBeNull()
	})

	it('should allow overwriting existing entries without triggering eviction', () => {
		// Fill cache to capacity
		for (let i = 0; i < MAX_CACHE_ENTRIES; i++) {
			setCachedReleases('owner', `repo-${i}`, [makeRelease('v1.0.0')])
		}

		// Overwriting an existing entry should not evict anything
		const fresh = [makeRelease('v2.0.0')]
		setCachedReleases('owner', 'repo-0', fresh)

		expect(getCachedReleasesForRange('owner', 'repo-0')).toEqual(fresh)

		// Other entries should still be accessible
		expect(
			getCachedReleasesForRange('owner', `repo-${MAX_CACHE_ENTRIES - 1}`),
		).not.toBeNull()
	})
})

describe('constants', () => {
	beforeEach(async () => {
		vi.resetModules()
		await importCacheModule()
	})

	it('should have CACHE_TTL_MS set to 5 minutes in milliseconds', () => {
		expect(CACHE_TTL_MS).toBe(5 * 60 * 1000)
	})

	it('should have MAX_CACHE_ENTRIES set to 100', () => {
		expect(MAX_CACHE_ENTRIES).toBe(100)
	})
})
