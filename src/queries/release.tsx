import { queryOptions } from '@tanstack/react-query'

import type {
	MinimalRelease,
	ProcessedReleasesCollection,
	ReleaseVersion,
	MinimalRepository,
	RepositoryQueryParams,
} from '@/models'
import { getProcessedReleases, getReleases } from '@/server/releases'
import { mapRepositoryToQueryParams } from '@/utils'

type ReleasesQueryResults = Array<MinimalRelease>
type ReleasesQueryParams = {
	repository?: MinimalRepository | null
	fromVersion?: ReleaseVersion | null
	toVersion?: ReleaseVersion | null
}

const RELEASES_QUERY_KEY = 'releases'
const PROCESSED_RELEASES_QUERY_KEY = 'processed-releases'

function releasesQueryOptions(params: ReleasesQueryParams) {
	const { repository, ...remainingParams } = params
	const repo: RepositoryQueryParams = mapRepositoryToQueryParams(
		repository ?? undefined,
	)

	const finalParams = { ...repo, ...remainingParams }

	return queryOptions<ReleasesQueryResults>({
		queryKey: [RELEASES_QUERY_KEY, finalParams],
		placeholderData: (previousData, previousQuery) => {
			// Keep the previous data if the repo is still the same to keep a smooth value
			// in the UI (prevent loading blinks).
			const previousParams = previousQuery?.queryKey[1] as
				| RepositoryQueryParams
				| undefined
			if (
				previousParams?.owner === finalParams.owner &&
				previousParams?.repo === finalParams.repo
			) {
				return previousData
			}

			return undefined
		},
		queryFn: () =>
			getReleases({
				data: finalParams,
			}),
		enabled: Boolean(params.repository),
	})
}

type ProcessedReleasesQueryParams = {
	repository?: MinimalRepository | null
	fromVersion?: ReleaseVersion | null
	toVersion?: ReleaseVersion | null
}

function processedReleasesQueryOptions(params: ProcessedReleasesQueryParams) {
	const finalParams: RepositoryQueryParams = mapRepositoryToQueryParams(
		params.repository ?? undefined,
	)
	const { fromVersion, toVersion } = params

	return queryOptions<ProcessedReleasesCollection | null>({
		queryKey: [
			PROCESSED_RELEASES_QUERY_KEY,
			{ ...finalParams, from: fromVersion, to: toVersion },
		],
		queryFn: () =>
			getProcessedReleases({
				data: {
					owner: finalParams.owner,
					repo: finalParams.repo,
					from: fromVersion!,
					to: toVersion!,
				},
			}),
		enabled: Boolean(params.repository && fromVersion && toVersion),
	})
}

export { releasesQueryOptions, processedReleasesQueryOptions }
