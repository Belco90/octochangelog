import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { MinimalRelease } from '@/models'

/**
 * The cache module uses module-level state (a Map), so we reset modules
 * before each test to start with a fresh cache.
 */

let getCacheKey: (owner: string, repo: string) => string
let getCachedReleases: (
	owner: string,
	repo: string,
) => Array<MinimalRelease> | null
let setCachedReleases: (
	owner: string,
	repo: string,
	releases: Array<MinimalRelease>,
) => void
let CACHE_TTL_MS: number

async function importCacheModule() {
	const mod = await import('@/server/releases-cache')
	getCacheKey = mod.getCacheKey
	getCachedReleases = mod.getCachedReleases
	setCachedReleases = mod.setCachedReleases
	CACHE_TTL_MS = mod.CACHE_TTL_MS
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

describe('getCachedReleases', () => {
	beforeEach(async () => {
		vi.resetModules()
		await importCacheModule()
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	it('should return null when no entry exists for the repo', () => {
		const result = getCachedReleases('owner', 'repo')

		expect(result).toBeNull()
	})

	it('should return null when TTL is exceeded', () => {
		let currentTime = 1_000_000
		vi.spyOn(Date, 'now').mockImplementation(() => currentTime)

		const releases = [makeRelease('v1.0.0')]
		setCachedReleases('owner', 'repo', releases)

		// Advance past TTL
		currentTime += CACHE_TTL_MS + 1

		const result = getCachedReleases('owner', 'repo')

		expect(result).toBeNull()
	})

	it('should auto-delete the entry when TTL is exceeded', () => {
		let currentTime = 1_000_000
		vi.spyOn(Date, 'now').mockImplementation(() => currentTime)

		const releases = [makeRelease('v1.0.0')]
		setCachedReleases('owner', 'repo', releases)

		// Expire the entry
		currentTime += CACHE_TTL_MS + 1
		getCachedReleases('owner', 'repo') // triggers deletion

		// Reset time to before TTL — if deletion worked, it will still be null
		currentTime = 0
		const result = getCachedReleases('owner', 'repo')

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

		const result = getCachedReleases('owner', 'repo')

		expect(result).toEqual(releases)
	})

	it('should store the timestamp using Date.now', () => {
		const fixedTime = 9_999_999
		vi.spyOn(Date, 'now').mockReturnValue(fixedTime)

		const releases = [makeRelease('v1.0.0')]
		setCachedReleases('owner', 'repo', releases)

		// Just before TTL expires — still valid
		vi.spyOn(Date, 'now').mockReturnValue(fixedTime + CACHE_TTL_MS - 1)

		expect(getCachedReleases('owner', 'repo')).toEqual(releases)
	})

	it('should maintain separate cache entries per repository', () => {
		const releases1 = [makeRelease('v1.0.0')]
		const releases2 = [makeRelease('v2.0.0'), makeRelease('v3.0.0')]

		setCachedReleases('owner', 'repo-a', releases1)
		setCachedReleases('owner', 'repo-b', releases2)

		expect(getCachedReleases('owner', 'repo-a')).toEqual(releases1)
		expect(getCachedReleases('owner', 'repo-b')).toEqual(releases2)
	})

	it('should overwrite a previous entry for the same repo', () => {
		const old = [makeRelease('v1.0.0')]
		const fresh = [makeRelease('v2.0.0')]

		setCachedReleases('owner', 'repo', old)
		setCachedReleases('owner', 'repo', fresh)

		expect(getCachedReleases('owner', 'repo')).toEqual(fresh)
	})
})

describe('CACHE_TTL_MS constant', () => {
	beforeEach(async () => {
		vi.resetModules()
		await importCacheModule()
	})

	it('should be 5 minutes in milliseconds', () => {
		expect(CACHE_TTL_MS).toBe(5 * 60 * 1000)
	})
})
