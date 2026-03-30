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
	const finalParams: RepositoryQueryParams = mapRepositoryToQueryParams(
		params.repository ?? undefined,
	)
	const { fromVersion, toVersion } = params

	return queryOptions<ReleasesQueryResults>({
		queryKey: [RELEASES_QUERY_KEY, finalParams, fromVersion, toVersion],
		queryFn: () =>
			getReleases({
				data: {
					owner: finalParams.owner,
					repo: finalParams.repo,
					fromVersion,
					toVersion,
				},
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
