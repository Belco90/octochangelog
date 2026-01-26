import { Box } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { ChangelogSkeleton } from '@/components/ChangelogSkeleton'
import type { ReleaseVersion, MinimalRepository } from '@/models'
import { releasesQueryOptions } from '@/queries/release'
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
	const { data, isFetching } = useQuery(
		releasesQueryOptions({
			repository,
			fromVersion,
			toVersion,
		}),
	)

	const filteredReleases = data
		? filterReleasesByVersionRange({
				releases: data,
				from: fromVersion,
				to: toVersion,
			}).sort((a, b) => compareReleasesByVersion(a, b, 'asc'))
		: null

	const hasFilteredReleases =
		Array.isArray(filteredReleases) && filteredReleases.length > 0

	if (isFetching) return <ChangelogSkeleton />

	if (!hasFilteredReleases) return <Box>No processed releases to show</Box>

	return (
		<ComparatorChangelogResults
			releases={filteredReleases}
			repository={repository}
		/>
	)
}
