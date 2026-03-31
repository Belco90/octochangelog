import { useListCollection, useCombobox } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { debounce } from 'es-toolkit'
import { useEffect, useMemo, useRef, useState } from 'react'

import type { FullRepository, MinimalRepository } from '@/models'
import { searchRepositoriesQueryOptions } from '@/queries/repository'

import type { ListCollection } from '@chakra-ui/react'

const MIN_SEARCH_LENGTH = 3
const DEBOUNCE_MS = 500
const STALE_TIME_MS = 30_000

interface UseRepoComboboxParams {
	initialValue?: string
	onSelect: (repo?: FullRepository | null) => void
}

interface UseRepoComboboxReturn {
	combobox: ReturnType<typeof useCombobox<MinimalRepository>>
	collection: ListCollection<MinimalRepository>
	inputValue: string
	isOpen: boolean
	isMinSearchLengthReached: boolean
	contentStatus: 'loading' | 'error' | 'success' | 'pending'
	totalCount: number
}

/**
 * Custom hook that combines TanStack Query, Chakra's useListCollection,
 * and useCombobox to provide repository search functionality with
 * debounced search, collection management, and selection handling.
 *
 * @example
 * ```tsx
 * const { combobox, collection, contentStatus, isOpen, totalCount } =
 *   useRepoCombobox({
 *     initialValue: 'foo/bar',
 *     onSelect: (repo) => console.log('Selected:', repo?.full_name),
 *   })
 * ```
 */
export function useRepoCombobox({
	initialValue = '',
	onSelect,
}: UseRepoComboboxParams): UseRepoComboboxReturn {
	const [inputValue, setInputValue] = useState(initialValue)
	const [debouncedQuery, setDebouncedQuery] = useState(initialValue)
	const [isOpen, setIsOpen] = useState(false)
	const [isTyping, setIsTyping] = useState(false)
	const hydratedRef = useRef(false)

	const { data, isFetching, status } = useQuery({
		...searchRepositoriesQueryOptions({ q: debouncedQuery }),
		enabled: debouncedQuery.trim().length >= MIN_SEARCH_LENGTH,
		staleTime: STALE_TIME_MS,
	})

	const { collection, set: setCollection } =
		useListCollection<MinimalRepository>({
			initialItems: [],
			itemToString: (item) => item.full_name,
			itemToValue: (item) => item.full_name,
		})

	const combobox = useCombobox({
		collection,
		defaultValue: [initialValue],
		inputValue,
		onInputValueChange: (e) => {
			setIsTyping(isOpen && Boolean(e.inputValue))
			setInputValue(e.inputValue)
		},
		defaultInputValue: initialValue,
		open: isOpen,
		openOnClick: true,
		openOnChange: true,
		onOpenChange: (e) => setIsOpen(e.open),
		onValueChange: ({ items }) => {
			setIsTyping(false)
			const selectedRepo = items[0] as FullRepository | null
			onSelect(selectedRepo)
		},
	})

	useEffect(() => {
		// This logic is needed for rehydrating the value in Chakra Combobox
		// https://www.chakra-ui.com/docs/components/combobox#rehydrate-value
		if (
			initialValue &&
			combobox.value.length &&
			collection.size &&
			!hydratedRef.current
		) {
			combobox.syncSelectedItems()
			hydratedRef.current = true
		}
	}, [collection.size, combobox, initialValue])

	useEffect(() => {
		// Sync TanStack Query data with Chakra collection state.
		// This is the recommended pattern: useListCollection is designed for
		// dynamic data, while createListCollection is for static/immutable lists.
		setCollection(data?.items ?? [])
	}, [data, setCollection])

	const debouncedSetQuery = useMemo(
		() =>
			debounce((value: string) => {
				// eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
				setIsTyping(false)
				// eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
				setDebouncedQuery(value)
			}, DEBOUNCE_MS),
		[],
	)

	useEffect(() => {
		if (inputValue.trim().length >= MIN_SEARCH_LENGTH) {
			debouncedSetQuery(inputValue)
		}
	}, [inputValue, debouncedSetQuery])

	const isMinSearchLengthReached = inputValue.trim().length >= MIN_SEARCH_LENGTH
	const isLoading = isMinSearchLengthReached && (isFetching || isTyping)
	const contentStatus = isLoading ? 'loading' : status
	const totalCount = data?.total_count ?? 0

	return {
		combobox,
		collection,
		inputValue,
		isOpen,
		contentStatus,
		totalCount,
		isMinSearchLengthReached,
	}
}
