import { Box } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { ChangelogSkeleton } from '@/components/ChangelogSkeleton'
import type { ReleaseVersion, MinimalRepository } from '@/models'
import { processedReleasesQueryOptions } from '@/queries/release'

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
	const { data: processedReleases, isFetching } = useQuery(
		processedReleasesQueryOptions({
			repository,
			fromVersion,
			toVersion,
		}),
	)

	if (isFetching) return <ChangelogSkeleton />

	if (!processedReleases || Object.keys(processedReleases).length === 0) {
		return <Box>No processed releases to show</Box>
	}

	return (
		<ComparatorChangelogResults
			processedReleases={processedReleases}
			repository={repository}
		/>
	)
}
