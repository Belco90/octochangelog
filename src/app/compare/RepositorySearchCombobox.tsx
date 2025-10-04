import {
	Box,
	Field,
	HStack,
	Icon,
	IconButton,
	Input,
	List,
	Spinner,
	Text,
} from '@chakra-ui/react'
import { useCombobox } from 'downshift'
import { debounce } from 'es-toolkit'
import { useEffect, useMemo, useState } from 'react'
import { HiArrowDown, HiArrowUp } from 'react-icons/hi'

import type { Repository } from '@/models'
import { useSearchRepositoriesQuery } from '@/queries/repository'

interface Props {
	onSelect: (repo?: Repository) => void
	initialInputValue?: string
}

const RepositorySearchCombobox = ({
	onSelect,
	initialInputValue = '',
}: Props) => {
	const [inputValue, setInputValue] = useState('')
	const [isTyping, setIsTyping] = useState(false)

	const {
		data,
		refetch,
		isFetching: isQueryLoading,
	} = useSearchRepositoriesQuery({ q: inputValue }, { enabled: false })

	const {
		isOpen,
		getInputProps,
		getItemProps,
		getLabelProps,
		getMenuProps,
		getToggleButtonProps,
		highlightedIndex,
	} = useCombobox({
		items: data?.items ?? [],
		itemToString: (repo) => repo?.full_name ?? 'unknown',
		initialInputValue,
		onInputValueChange: ({
			inputValue: newInputValue,
			isOpen: isOpenOnChange,
		}) => {
			setIsTyping(Boolean(isOpenOnChange) && Boolean(newInputValue))

			// Avoid set input value when is not open as that means the user already
			// picked an option so we don't want to refetch again.
			// Also, we keep original value entered by user in case they want to select
			// other option from last results.
			if (isOpenOnChange) {
				setInputValue(newInputValue ?? '')
			}
		},
		onSelectedItemChange: ({ selectedItem }) => {
			setIsTyping(false)
			onSelect(selectedItem as unknown as Repository)
		},
	})

	const throttleRefetch = useMemo(
		() =>
			debounce(() => {
				setIsTyping(false)
				void refetch()
			}, 500),
		[refetch],
	)

	useEffect(() => {
		if (inputValue.trim()) {
			throttleRefetch()
		}
	}, [inputValue, throttleRefetch])

	const isLoading = isTyping || isQueryLoading

	return (
		<Field.Root required width="full" position="relative">
			<Field.Label {...getLabelProps()}>Enter repository name</Field.Label>
			<HStack>
				<Box position="relative" flex="1">
					<Input {...getInputProps()} />
					<Box position="absolute" right="2" top="50%" transform="translateY(-50%)">
						{isLoading && (
							<Spinner
								size="sm"
								color="primary.500"
							/>
						)}
					</Box>
				</Box>
				<Box>
					<IconButton
						{...getToggleButtonProps()}
						colorScheme="gray"
						aria-label="toggle repositories results menu"
					>
						<Icon as={isOpen ? HiArrowUp : HiArrowDown} />
					</IconButton>
				</Box>
			</HStack>
			<List.Root
				{...getMenuProps()}
				position="absolute"
				width="full"
				mt={1}
				shadow="md"
				backgroundColor="white"
				borderColor="gray.200"
				borderWidth={1}
				borderRadius={3}
				zIndex="dropdown"
				py={2}
				maxHeight="300px"
				overflowY="scroll"
				opacity={isOpen && !isLoading ? 1 : 0}
			>
				{isOpen && (
					<>
						{!isLoading && (
							<List.Item mb={1}>
								<Text as="em" color="gray.500" px={2}>
									{data?.total_count ?? 0} results
								</Text>
							</List.Item>
						)}
						{data?.items.map((repo, index) => (
							<List.Item
								key={repo.id}
								py={1}
								backgroundColor={
									highlightedIndex === index ? 'primary.400' : undefined
								}
								color={highlightedIndex === index ? 'gray.50' : 'gray.700'}
								cursor="pointer"
								{...getItemProps({ item: repo, index })}
							>
								<Text px={2}>{repo.full_name}</Text>
							</List.Item>
						))}
					</>
				)}
			</List.Root>
		</Field.Root>
	)
}

export default RepositorySearchCombobox
