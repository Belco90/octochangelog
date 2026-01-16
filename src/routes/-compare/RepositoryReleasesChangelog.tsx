import {
	Alert,
	AlertIcon,
	Box,
	CircularProgress,
	Flex,
	Skeleton,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { TextSkeleton } from '@/components/TextSkeleton'
import type { ReleaseVersion, MinimalRepository } from '@/models'
import { releasesQueryOptions } from '@/queries/release'
import { compareReleasesByVersion, filterReleasesByVersionRange } from '@/utils'

import { ComparatorChangelogResults } from './ComparatorChangelogResults'

type RepositoryReleasesChangelogProps = {
	repository: MinimalRepository
	fromVersion?: ReleaseVersion
	toVersion?: ReleaseVersion
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

	const filteredReleases =
		data && fromVersion && toVersion
			? filterReleasesByVersionRange({
					releases: data,
					from: fromVersion,
					to: toVersion,
				}).sort((a, b) => compareReleasesByVersion(a, b, 'asc'))
			: null

	const hasFilteredReleases =
		Array.isArray(filteredReleases) && filteredReleases.length > 0
	const hasRequiredDataToFilter = !!fromVersion && !!toVersion

	return (
		<>
			{/* Changelog skeleton: fetching and processing releases from preloaded URL */}
			{hasRequiredDataToFilter && isFetching && (
				<Box aria-busy="true" aria-label="Calculating changelog">
					<Skeleton width="20%" height={8} mb={4} />
					<TextSkeleton />
				</Box>
			)}

			{/* Changelog spinner: only fetching releases from repository input manually filled */}
			{!hasRequiredDataToFilter && isFetching && (
				<Flex align="center" justify="center" height="100%">
					<CircularProgress
						isIndeterminate
						size="8"
						color="primary.400"
						aria-label="Loading releases"
					/>
				</Flex>
			)}

			{!!fromVersion && !!toVersion && !isFetching && !hasFilteredReleases && (
				<Alert status="error">
					<AlertIcon />
					No processed releases to show
				</Alert>
			)}

			{!isFetching && hasFilteredReleases && (
				<ComparatorChangelogResults
					releases={filteredReleases}
					repository={repository}
				/>
			)}
		</>
	)
}
