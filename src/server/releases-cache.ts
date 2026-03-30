import type { MinimalRelease, ReleaseVersion } from '@/models'
import { extractVersionFromTag } from '@/utils'

export const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes
export const MAX_CACHE_ENTRIES = 100

interface CacheEntry {
	releases: Array<MinimalRelease>
	timestamp: number
}

const releasesCache = new Map<string, CacheEntry>()

export function getCacheKey(owner: string, repo: string): string {
	return `${owner}/${repo}`
}

/**
 * Returns cached releases for a repository if the entry exists and hasn't expired.
 */
function getCachedReleases(
	owner: string,
	repo: string,
): Array<MinimalRelease> | null {
	const key = getCacheKey(owner, repo)
	const entry = releasesCache.get(key)

	if (!entry) return null

	if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
		releasesCache.delete(key)
		return null
	}

	return entry.releases
}

/**
 * Returns cached releases if the cache contains data that covers the requested
 * version range. When both `from` and `to` are provided, their tag names must
 * exist in the cached releases (with `"latest"` resolving to the first/newest
 * cached release). When neither is provided, any non-expired cache entry is
 * considered a hit.
 *
 * Returns `null` on cache miss, expiry, or if the range is not fully covered.
 */
export function getCachedReleasesForRange(
	owner: string,
	repo: string,
	from?: ReleaseVersion | null,
	to?: ReleaseVersion | null,
): Array<MinimalRelease> | null {
	const cached = getCachedReleases(owner, repo)
	if (!cached || cached.length === 0) return null

	// No version range specified — any cached data is a hit
	if (!from && !to) return cached

	const resolvedFrom = from
		? from.toLowerCase() === 'latest'
			? extractVersionFromTag(cached[0].tag_name)
			: extractVersionFromTag(from)
		: null

	const resolvedTo = to
		? to.toLowerCase() === 'latest'
			? extractVersionFromTag(cached[0].tag_name)
			: extractVersionFromTag(to)
		: null

	const hasFrom =
		!resolvedFrom ||
		cached.some((r) => extractVersionFromTag(r.tag_name) === resolvedFrom)
	const hasTo =
		!resolvedTo ||
		cached.some((r) => extractVersionFromTag(r.tag_name) === resolvedTo)

	if (hasFrom && hasTo) return cached

	return null
}

/**
 * Stores releases in the cache for a repository.
 *
 * Enforces a maximum cache size ({@link MAX_CACHE_ENTRIES}) by first sweeping
 * expired entries, then evicting the oldest entry if still at capacity.
 */
export function setCachedReleases(
	owner: string,
	repo: string,
	releases: Array<MinimalRelease>,
): void {
	const key = getCacheKey(owner, repo)

	// Eviction: if at capacity, sweep expired entries first
	if (releasesCache.size >= MAX_CACHE_ENTRIES && !releasesCache.has(key)) {
		sweepExpiredEntries()

		// If still at capacity after sweep, evict the oldest entry
		if (releasesCache.size >= MAX_CACHE_ENTRIES) {
			evictOldestEntry()
		}
	}

	releasesCache.set(key, { releases, timestamp: Date.now() })
}

/**
 * Removes all expired entries from the cache.
 */
function sweepExpiredEntries(): void {
	const now = Date.now()
	for (const [key, entry] of releasesCache) {
		if (now - entry.timestamp > CACHE_TTL_MS) {
			releasesCache.delete(key)
		}
	}
}

/**
 * Evicts the oldest cache entry by timestamp.
 */
function evictOldestEntry(): void {
	let oldestKey: string | null = null
	let oldestTimestamp = Infinity

	for (const [key, entry] of releasesCache) {
		if (entry.timestamp < oldestTimestamp) {
			oldestTimestamp = entry.timestamp
			oldestKey = key
		}
	}

	if (oldestKey) {
		releasesCache.delete(oldestKey)
	}
}
