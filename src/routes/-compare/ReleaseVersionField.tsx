import {
	Field,
	Icon,
	Portal,
	Select,
	useListCollection,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { HiArrowDown } from 'react-icons/hi'

import type { MinimalRelease } from '@/models'
import { getReleaseVersion } from '@/utils'

type ReleaseVersionFieldProps = {
	label: string
	id?: string
	onChange(version: string): void
	placeholder?: string
	value?: string
	isLoading?: boolean
	isDisabled?: boolean
	options?: Array<MinimalRelease>
	error?: string
}

export const ReleaseVersionField = ({
	options,
	label,
	id,
	placeholder,
	onChange,
	value,
	isLoading = false,
	isDisabled = false,
	error,
}: ReleaseVersionFieldProps) => {
	const { collection, set: setCollection } = useListCollection<MinimalRelease>({
		initialItems: options ?? [],
		itemToString: (release) => getReleaseVersion(release),
		itemToValue: (release) => release.tag_name,
	})

	useEffect(() => {
		setCollection(options ?? [])
	}, [options, setCollection])

	const hasError = Boolean(error)

	return (
		<Field.Root disabled={isDisabled} gap="1" invalid={hasError}>
			<Select.Root
				collection={collection}
				size="lg"
				value={value ? [value] : []}
				onValueChange={(details) => {
					const selectedValue = details.value[0]
					if (selectedValue) {
						onChange(selectedValue)
					}
				}}
				positioning={{ sameWidth: true }}
				disabled={isDisabled}
				invalid={hasError}
			>
				<Select.Label>{label}</Select.Label>

				<Select.HiddenSelect id={id} />

				<Select.Control pr="-8">
					<Select.Trigger
						fontWeight="medium"
						rounded="2xl"
						_focusVisible={{
							borderColor: 'border',
						}}
					>
						<Select.ValueText
							placeholder={isLoading ? 'Loading...' : placeholder}
						/>
						<Select.Indicator mr="-1">
							<Icon color="brand.fg">
								<HiArrowDown />
							</Icon>
						</Select.Indicator>
					</Select.Trigger>
				</Select.Control>

				<Portal>
					<Select.Positioner>
						<Select.Content maxHeight="xs" overflowY="auto">
							{collection.items.map((release) => (
								<Select.Item
									key={release.id}
									item={release}
									bgColor={{
										_highlighted: 'brand.muted',
									}}
								>
									<Select.ItemText>
										{getReleaseVersion(release)}
									</Select.ItemText>
									<Select.ItemIndicator
										color="brand.fg"
										css={{
											_icon: {
												boxSize: '5',
											},
										}}
									/>
								</Select.Item>
							))}
						</Select.Content>
					</Select.Positioner>
				</Portal>
			</Select.Root>

			<Field.ErrorText>{error}</Field.ErrorText>
		</Field.Root>
	)
}
