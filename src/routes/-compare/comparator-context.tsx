import { useQuery } from '@tanstack/react-query'
import { getRouteApi, useRouteContext } from '@tanstack/react-router'
import { createContext, use } from 'react'

import type {
	CompareSearchParams,
	FullRepository,
	PropsWithRequiredChildren,
	ReleaseVersion,
	Repository,
} from '@/models'
import { getRepositoryQueryOptions } from '@/queries/repository'
import { mapStringToRepositoryQueryParams } from '@/utils'

type ComparatorStateContextValue = {
	repository?: Repository | null
	fromVersion?: ReleaseVersion | null
	toVersion?: ReleaseVersion | null
	error: Error | null
}

type ComparatorUpdaterContextValue = {
	setRepository: (newRepository?: FullRepository | null) => void
	setFromVersion: (newVersion?: ReleaseVersion | null) => void
	setToVersion: (newVersion?: ReleaseVersion | null) => void
}

const ComparatorStateContext = createContext<
	ComparatorStateContextValue | undefined
>(undefined)
const ComparatorUpdaterContext = createContext<
	ComparatorUpdaterContextValue | undefined
>(undefined)

type ComparatorProviderProps = PropsWithRequiredChildren

const routeApi = getRouteApi('/compare')

function ComparatorProvider({ children }: ComparatorProviderProps) {
	const { queryClient } = useRouteContext({ from: '/compare' })
	const { repo, from, to } = routeApi.useSearch()
	const navigate = routeApi.useNavigate()

	const repositoryQueryParams = repo
		? mapStringToRepositoryQueryParams(repo)
		: undefined

	const { data: repository, error } = useQuery(
		getRepositoryQueryOptions(repositoryQueryParams),
	)

	function updateSearchParams(patch: Partial<CompareSearchParams>) {
		return navigate({
			replace: true,
			search: (prev) => ({ ...prev, ...patch }),
		})
	}

	const setSelectedRepository: ComparatorUpdaterContextValue['setRepository'] =
		(newRepository) => {
			if (newRepository != null && newRepository.id !== repository?.id) {
				queryClient.setQueryData(
					getRepositoryQueryOptions(repositoryQueryParams).queryKey,
					newRepository,
				)
			}

			void updateSearchParams({
				repo: newRepository?.full_name,
				from: undefined, // reset versions range after selecting a new repository
				to: undefined,
			})
		}

	const setSelectedFromVersion: ComparatorUpdaterContextValue['setFromVersion'] =
		(newFrom) => {
			void updateSearchParams({ from: newFrom ?? undefined })
		}

	const setSelectedToVersion: ComparatorUpdaterContextValue['setToVersion'] = (
		newTo,
	) => {
		void updateSearchParams({ to: newTo ?? undefined })
	}

	const stateValue: ComparatorStateContextValue = {
		repository,
		fromVersion: from,
		toVersion: to,
		error,
	}

	const updaterValue: ComparatorUpdaterContextValue = {
		setRepository: setSelectedRepository,
		setFromVersion: setSelectedFromVersion,
		setToVersion: setSelectedToVersion,
	}

	return (
		<ComparatorStateContext value={stateValue}>
			<ComparatorUpdaterContext value={updaterValue}>
				{children}
			</ComparatorUpdaterContext>
		</ComparatorStateContext>
	)
}

function useComparatorState() {
	const context = use(ComparatorStateContext)

	if (context === undefined) {
		throw new Error(
			'useComparatorState must be used within a ComparatorProvider',
		)
	}

	return context
}

function useComparatorUpdater() {
	const context = use(ComparatorUpdaterContext)

	if (context === undefined) {
		throw new Error(
			'useComparatorUpdater must be used within a ComparatorProvider',
		)
	}

	return context
}

export { ComparatorProvider, useComparatorState, useComparatorUpdater }
