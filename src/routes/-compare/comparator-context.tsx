import { useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import {
	createContext,
	use,
	useCallback,
	useEffect,
	useMemo,
	useReducer,
} from 'react'

import type {
	CompareSearchParams,
	PropsWithRequiredChildren,
	ReleaseVersion,
	Repository,
} from '@/models'
import { getRepositoryQueryOptions } from '@/queries/repository'
import { mapStringToRepositoryQueryParams } from '@/utils'

interface ComparatorStateContextValue {
	repository?: Repository | null
	fromVersion?: ReleaseVersion | null
	toVersion?: ReleaseVersion | null
}

interface ComparatorUpdaterContextValue {
	setRepository: (newRepository?: Repository | null) => void
	setFromVersion: (newVersion?: ReleaseVersion | null) => void
	setToVersion: (newVersion?: ReleaseVersion | null) => void
}

interface ComparatorState {
	repository: Repository | null
	fromVersion: string | null
	toVersion: string | null
}

type ComparatorAction =
	| { type: 'SET_REPOSITORY'; payload: Repository | null }
	| { type: 'SET_FROM_VERSION'; payload: string | null }
	| { type: 'SET_TO_VERSION'; payload: string | null }

function comparatorReducer(
	state: ComparatorState,
	action: ComparatorAction,
): ComparatorState {
	switch (action.type) {
		case 'SET_REPOSITORY':
			return {
				...state,
				repository: action.payload,
				fromVersion: null, // reset the version range when switching repositories
				toVersion: null,
			}
		case 'SET_FROM_VERSION':
			return { ...state, fromVersion: action.payload }
		case 'SET_TO_VERSION':
			return { ...state, toVersion: action.payload }
		default:
			return state
	}
}

const ComparatorStateContext = createContext<
	ComparatorStateContextValue | undefined
>(undefined)
const ComparatorUpdaterContext = createContext<
	ComparatorUpdaterContextValue | undefined
>(undefined)

type ComparatorProviderProps = PropsWithRequiredChildren<{
	initialRepoFullName?: string
	initialFrom?: string
	initialTo?: string
}>

const route = getRouteApi('/compare')

function ComparatorProvider({
	children,
	initialRepoFullName,
	initialFrom,
	initialTo,
}: ComparatorProviderProps) {
	const repositoryQueryParams = initialRepoFullName
		? mapStringToRepositoryQueryParams(initialRepoFullName)
		: undefined

	const shouldFetchRepo = Boolean(
		repositoryQueryParams?.repo && repositoryQueryParams?.owner,
	)

	const { data: initialRepository } = useQuery(
		getRepositoryQueryOptions(repositoryQueryParams),
	)

	const [state, dispatch] = useReducer(comparatorReducer, {
		// @ts-expect-error Repository types from 'search/repos' and 'repos/get' don't match, fix it defining MinimalRepo type
		repository: shouldFetchRepo ? initialRepository : null,
		fromVersion: initialFrom ?? null,
		toVersion: initialTo ?? null,
	})
	const navigate = route.useNavigate()

	useEffect(
		function syncQueryParams() {
			const updatedSearch: CompareSearchParams = {}
			if (state.repository?.full_name)
				updatedSearch.repo = state.repository.full_name
			if (state.fromVersion) updatedSearch.from = state.fromVersion
			if (state.toVersion) updatedSearch.to = state.toVersion

			void navigate({
				replace: true,
				search: (prev) => ({ ...prev, ...updatedSearch }),
			})
		},
		[state.repository?.full_name, state.fromVersion, state.toVersion, navigate],
	)

	const setSelectedRepository = useCallback(
		(newRepository?: Repository | null) => {
			dispatch({ type: 'SET_REPOSITORY', payload: newRepository ?? null })
		},
		[],
	)

	const setSelectedFromVersion = useCallback((newFrom?: string | null) => {
		dispatch({ type: 'SET_FROM_VERSION', payload: newFrom ?? null })
	}, [])

	const setSelectedToVersion = useCallback((newTo?: string | null) => {
		dispatch({ type: 'SET_TO_VERSION', payload: newTo ?? null })
	}, [])

	const stateValue = useMemo<ComparatorStateContextValue>(
		() => ({
			repository: state.repository,
			fromVersion: state.fromVersion,
			toVersion: state.toVersion,
		}),
		[state.repository, state.fromVersion, state.toVersion],
	)

	const updaterValue = useMemo<ComparatorUpdaterContextValue>(
		() => ({
			setRepository: setSelectedRepository,
			setFromVersion: setSelectedFromVersion,
			setToVersion: setSelectedToVersion,
		}),
		[setSelectedRepository, setSelectedFromVersion, setSelectedToVersion],
	)

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
