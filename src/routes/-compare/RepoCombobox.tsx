import {
	Combobox,
	HStack,
	Portal,
	Spinner,
	Span,
	Em,
	Flex,
	Icon,
} from '@chakra-ui/react'
import { HiArrowDown, HiArrowUp, HiOutlineSearch } from 'react-icons/hi'

import { useRepoCombobox } from '@/hooks/useRepoCombobox'
import type { FullRepository } from '@/models'

type RepoComboboxProps = {
	onSelect: (repo?: FullRepository | null) => void
	initialInputValue?: string
}

export const RepoCombobox = ({
	onSelect,
	initialInputValue = '',
}: RepoComboboxProps) => {
	const { combobox, collection, contentStatus, isOpen, totalCount } =
		useRepoCombobox({
			initialValue: initialInputValue,
			onSelect,
		})

	return (
		<Combobox.RootProvider
			value={combobox}
			size={{ base: 'md', md: 'lg' }}
			colorPalette="accent"
		>
			<Combobox.Label fontSize="md" fontWeight="bold" color="fg.muted">
				Repository
			</Combobox.Label>
			<Combobox.Control>
				<Combobox.IndicatorGroup
					insetInlineStart="0"
					insetInlineEnd="unset"
					p="0"
				>
					<Combobox.Trigger asChild>
						<Flex
							alignItems="center"
							bgColor="brand.subtle"
							px="2"
							h="full"
							roundedLeft="2xl"
							borderWidth="1px"
							borderRightWidth="0"
						>
							<Icon color="brand.fg" strokeWidth="3">
								<HiOutlineSearch />
							</Icon>
						</Flex>
					</Combobox.Trigger>
				</Combobox.IndicatorGroup>
				<Combobox.Input
					placeholder="Type to search (at least 3 chars)"
					fontWeight="medium"
					rounded="2xl"
					pl={{ base: '10', md: '12' }}
					_focusVisible={{
						borderColor: 'border',
					}}
				/>
				<Combobox.IndicatorGroup>
					{combobox.inputValue.length > 0 && <Combobox.ClearTrigger />}
					<Combobox.Trigger>
						<Icon color="brand.fg">
							{isOpen ? <HiArrowUp /> : <HiArrowDown />}
						</Icon>
					</Combobox.Trigger>
				</Combobox.IndicatorGroup>
			</Combobox.Control>

			<Portal>
				<Combobox.Positioner>
					<Combobox.Content minW="xs">
						{contentStatus === 'loading' && (
							<HStack p="2">
								<Spinner size="sm" borderWidth="2px" color="brand.fg" />
								<Span>Loading...</Span>
							</HStack>
						)}
						{contentStatus === 'error' && (
							<Span p="2" color="fg.error">
								Error fetching
							</Span>
						)}
						<Combobox.Empty
							display={contentStatus === 'loading' ? 'none' : undefined}
						>
							No repos found
						</Combobox.Empty>
						{contentStatus === 'success' && (
							<>
								{totalCount > 0 && (
									<Em px={3} color="fg.subtle">
										{totalCount} results
									</Em>
								)}
								{collection.items?.map((repo) => (
									<Combobox.Item
										key={repo.id}
										item={repo}
										bgColor={{
											_highlighted: 'accent.muted',
										}}
									>
										<Span fontWeight="medium">{repo.full_name}</Span>
										<Combobox.ItemIndicator color="brand.fg" />
									</Combobox.Item>
								))}
							</>
						)}
					</Combobox.Content>
				</Combobox.Positioner>
			</Portal>
		</Combobox.RootProvider>
	)
}
