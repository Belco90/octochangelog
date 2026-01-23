import {
	Field,
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

type RepositorySearchComboboxProps = {
	onSelect: (repo?: FullRepository | null) => void
	initialInputValue?: string
}

export const RepositorySearchCombobox = ({
	onSelect,
	initialInputValue = '',
}: RepositorySearchComboboxProps) => {
	const { combobox, collection, contentStatus, isOpen, totalCount } =
		useRepoCombobox({
			initialValue: initialInputValue,
			onSelect,
		})

	return (
		<Field.Root>
			<Field.Label>Repository</Field.Label>

			<Combobox.RootProvider value={combobox} size="lg" colorPalette="accent">
				<Combobox.Control>
					<Combobox.IndicatorGroup
						insetInlineStart="0"
						insetInlineEnd="unset"
						p="0"
					>
						<Flex
							alignItems="center"
							bgColor="brand.subtle"
							px="2"
							h="full"
							roundedLeft="2xl"
							borderLeftWidth="1px"
						>
							<Icon color="brand.fg" strokeWidth="3">
								<HiOutlineSearch />
							</Icon>
						</Flex>
					</Combobox.IndicatorGroup>
					<Combobox.Input
						placeholder="Type to search"
						fontWeight="medium"
						rounded="2xl"
						pl="12"
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
									<Spinner size="xs" borderWidth="1px" />
									<Span>Loading...</Span>
								</HStack>
							)}
							{contentStatus === 'error' && (
								<Span p="2" color="fg.error">
									Error fetching
								</Span>
							)}
							<Combobox.Empty>No repos found</Combobox.Empty>
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
		</Field.Root>
	)
}
