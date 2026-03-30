import type { MinimalRelease } from '@/models'

export const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

interface CacheEntry {
	releases: Array<MinimalRelease>
	timestamp: number
}

const releasesCache = new Map<string, CacheEntry>()

export function getCacheKey(owner: string, repo: string): string {
	return `${owner}/${repo}`
}

export function getCachedReleases(
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

export function setCachedReleases(
	owner: string,
	repo: string,
	releases: Array<MinimalRelease>,
): void {
	const key = getCacheKey(owner, repo)
	releasesCache.set(key, { releases, timestamp: Date.now() })
}
