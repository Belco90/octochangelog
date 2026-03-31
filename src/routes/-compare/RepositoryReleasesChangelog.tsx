import { Box } from '@chakra-ui/react'
import { useInfiniteQuery } from '@tanstack/react-query'

import { ChangelogSkeleton } from '@/components/ChangelogSkeleton'
import type { ReleaseVersion, MinimalRepository } from '@/models'
import {
	flattenReleasePages,
	mapReleasesQueryParams,
	releasesInfiniteQueryOptions,
} from '@/queries/release'
import { compareReleasesByVersion, filterReleasesByVersionRange } from '@/utils'

import { ComparatorChangelogResults } from './ComparatorChangelogResults'

type RepositoryReleasesChangelogProps = {
	repository: MinimalRepository
	fromVersion: ReleaseVersion
	toVersion: ReleaseVersion
}

export const RepositoryReleasesChangelog = ({
	repository,
	fromVersion,
	toVersion,
}: RepositoryReleasesChangelogProps) => {
	const { data, isLoading } = useInfiniteQuery(
		releasesInfiniteQueryOptions(mapReleasesQueryParams(repository)),
	)

	const releases = flattenReleasePages(data)

	const filteredReleases =
		releases.length > 0
			? filterReleasesByVersionRange({
					releases,
					from: fromVersion,
					to: toVersion,
				}).sort((a, b) => compareReleasesByVersion(a, b, 'asc'))
			: null

	const hasFilteredReleases =
		Array.isArray(filteredReleases) && filteredReleases.length > 0

	if (isLoading) return <ChangelogSkeleton />

	if (!hasFilteredReleases) return <Box>No processed releases to show</Box>

	return (
		<ComparatorChangelogResults
			releases={filteredReleases}
			repository={repository}
		/>
	)
}
