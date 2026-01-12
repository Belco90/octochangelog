'use client'

import { CircularProgress, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { createContext, use, useEffect, useReducer, useRef } from 'react'

import { octokit } from '@/github-client'
import type { ReleaseVersion, Repository } from '@/models'
import { mapStringToRepositoryQueryParams } from '@/utils'

import type { Route } from 'next'
import type { ReactNode } from 'react'

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
	isReady: boolean
	repository: Repository | null
	fromVersion: string | null
	toVersion: string | null
}

type ComparatorAction =
	| { type: 'SET_INITIAL_REPOSITORY'; payload: Repository | null }
	| { type: 'SET_REPOSITORY'; payload: Repository | null }
	| { type: 'SET_FROM_VERSION'; payload: string | null }
	| { type: 'SET_TO_VERSION'; payload: string | null }
	| { type: 'SET_READY'; payload: boolean }

function comparatorReducer(
	state: ComparatorState,
	action: ComparatorAction,
): ComparatorState {
	switch (action.type) {
		case 'SET_INITIAL_REPOSITORY':
			return { ...state, repository: action.payload }
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
		case 'SET_READY':
			return { ...state, isReady: action.payload }
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

const loadingElement = (
	<Flex align="center" justify="center" height="100%">
		<CircularProgress isIndeterminate size="8" color="primary.400" />
	</Flex>
)

interface ComparatorProviderProps {
	children: ReactNode
	repo?: string
	from?: string
	to?: string
}

const ComparatorProvider = ({
	children,
	repo,
	from,
	to,
}: ComparatorProviderProps) => {
	const [state, dispatch] = useReducer(comparatorReducer, {
		isReady: false,
		repository: null,
		fromVersion: from ?? null,
		toVersion: to ?? null,
	})

	const initializedRef = useRef(false)
	const router = useRouter()

	useEffect(() => {
		if (initializedRef.current) {
			return
		}

		const getInitialRepository = async () => {
			if (repo) {
				const repositoryQueryParams = mapStringToRepositoryQueryParams(repo)

				if (repositoryQueryParams.repo && repositoryQueryParams.owner) {
					const response = await octokit.repos.get(repositoryQueryParams)
					dispatch({ type: 'SET_INITIAL_REPOSITORY', payload: response.data })
				}
			}
			dispatch({ type: 'SET_READY', payload: true })
			initializedRef.current = true
		}

		void getInitialRepository()
	}, [repo])

	const updateUrl = (newRepo?: string, newFrom?: string, newTo?: string) => {
		const params = new URLSearchParams()
		if (newRepo) params.set('repo', newRepo)
		if (newFrom) params.set('from', newFrom)
		if (newTo) params.set('to', newTo)

		const query = params.toString()
		const newHref = query ? `/compare?${query}` : '/compare'
		router.replace(newHref as Route)
	}

	const setSelectedRepository = (newRepository?: Repository | null) => {
		dispatch({ type: 'SET_REPOSITORY', payload: newRepository ?? null })
		updateUrl(newRepository?.full_name)
	}

	const setSelectedFromVersion = (newFrom?: string | null) => {
		dispatch({ type: 'SET_FROM_VERSION', payload: newFrom ?? null })
		updateUrl(
			state.repository?.full_name,
			newFrom ?? undefined,
			state.toVersion ?? undefined,
		)
	}

	const setSelectedToVersion = (newTo?: string | null) => {
		dispatch({ type: 'SET_TO_VERSION', payload: newTo ?? null })
		updateUrl(
			state.repository?.full_name,
			state.fromVersion ?? undefined,
			newTo ?? undefined,
		)
	}

	const stateValue: ComparatorStateContextValue = {
		repository: state.repository,
		fromVersion: state.fromVersion,
		toVersion: state.toVersion,
	}

	const updaterValue: ComparatorUpdaterContextValue = {
		setRepository: setSelectedRepository,
		setFromVersion: setSelectedFromVersion,
		setToVersion: setSelectedToVersion,
	}

	return (
		<ComparatorStateContext value={stateValue}>
			<ComparatorUpdaterContext value={updaterValue}>
				{state.isReady ? children : loadingElement}
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
