import { Stack, VStack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import type { MinimalRelease } from '@/models'
import { releasesQueryOptions } from '@/queries/release'
import { ReleaseVersionField } from '@/routes/-compare/ReleaseVersionField'
import { compareReleasesByVersion, getReleaseVersion } from '@/utils'

import { RepoCombobox } from './RepoCombobox'
import { useComparatorState, useComparatorUpdater } from './comparator-context'

function mapReleasesRange(
	releases?: Array<MinimalRelease>,
): [Array<MinimalRelease>, Array<MinimalRelease>] {
	if (!releases?.length) {
		return [[], []]
	}

	const sortedReleases = releases.sort(compareReleasesByVersion)

	// Remove very last version to leave a gap of 1 version between penultimate from version and last to version
	const fromReleases =
		sortedReleases.length === 1 ? sortedReleases : sortedReleases.slice(1)

	// Prepend "latest" option based on last release object
	const toReleases = [
		{
			...sortedReleases[0],
			name: `Latest (${getReleaseVersion(sortedReleases[0])})`,
			tag_name: 'latest',
			id: -1,
		},
		...sortedReleases,
	]

	return [fromReleases, toReleases]
}

function getVersionPlaceholder(hasRepo: boolean, hasReleases: boolean) {
	if (!hasRepo) return 'Pick a repository first'
	if (!hasReleases) return 'No versions found'
	return 'Choose a release'
}

export const RepositoriesComparatorFilters = () => {
	const { repository, fromVersion, toVersion } = useComparatorState()
	const { setRepository, setFromVersion, setToVersion } = useComparatorUpdater()

	const { data: releases, isFetching } = useQuery(
		releasesQueryOptions({
			repository,
			fromVersion,
			toVersion,
		}),
	)

	const [fromReleases, toReleases] = mapReleasesRange(releases)

	const selectPlaceholder = getVersionPlaceholder(
		repository != null,
		releases != null && releases.length > 0,
	)

	return (
		<VStack gap={{ base: 4, md: 6 }}>
			<RepoCombobox
				initialInputValue={repository?.full_name}
				onSelect={setRepository}
			/>

			<Stack
				width="full"
				direction={{ base: 'column', md: 'row' }}
				gap={{ base: 4, md: 6 }}
			>
				<ReleaseVersionField
					label="From version"
					id="from-version"
					isDisabled={!releases || isFetching}
					isLoading={isFetching}
					placeholder={selectPlaceholder}
					options={fromReleases}
					value={fromVersion ?? undefined}
					onChange={setFromVersion}
				/>
				<ReleaseVersionField
					label="To version"
					id="to-version"
					isDisabled={!releases || isFetching}
					isLoading={isFetching}
					placeholder={selectPlaceholder}
					options={toReleases}
					value={toVersion ?? undefined}
					onChange={setToVersion}
				/>
			</Stack>
		</VStack>
	)
}
