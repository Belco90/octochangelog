import { Field, Icon, NativeSelect } from '@chakra-ui/react'
import { HiArrowDown } from 'react-icons/hi'

import type { MinimalRelease } from '@/models'
import { getReleaseVersion } from '@/utils'

import type { NativeSelectFieldProps } from '@chakra-ui/react'
import type { ChangeEvent } from 'react'
import type { Except } from 'type-fest'

type CustomProps = {
	label: string
	placeholder?: string
	value?: string
	isLoading?: boolean
	isDisabled?: boolean
	options?: Array<MinimalRelease>
	onChange(version: string): void
}

type ReleaseVersionFieldProps = CustomProps &
	Except<NativeSelectFieldProps, 'children' | 'onChange'>

export const ReleaseVersionField = ({
	options,
	label,
	id,
	placeholder,
	onChange,
	value,
	isLoading = false,
	isDisabled = false,
	...remainingProps
}: ReleaseVersionFieldProps) => {
	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		onChange(e.currentTarget.value)
	}

	return (
		<Field.Root disabled={isDisabled} gap="1">
			<Field.Label htmlFor={id}>{label}</Field.Label>

			<NativeSelect.Root size={{ base: 'md', md: 'lg' }} colorPalette="accent">
				<NativeSelect.Field
					{...remainingProps}
					id={id}
					value={value}
					onChange={handleChange}
					placeholder={isLoading ? 'Loading...' : placeholder}
					fontWeight="medium"
					rounded="2xl"
					_focusVisible={{
						borderColor: 'border',
					}}
				>
					{options?.map((release) => (
						<option key={release.id} value={release.tag_name}>
							{getReleaseVersion(release)}
						</option>
					))}
				</NativeSelect.Field>
				<NativeSelect.Indicator>
					<Icon color="brand.fg">
						<HiArrowDown />
					</Icon>
				</NativeSelect.Indicator>
			</NativeSelect.Root>
		</Field.Root>
	)
}
