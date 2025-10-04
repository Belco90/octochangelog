import { Field, NativeSelectRoot, NativeSelectField } from '@chakra-ui/react'

import type { Release } from '@/models'
import { getReleaseVersion } from '@/utils'

import type { ChangeEvent, ReactNode } from 'react'

interface ReleaseVersionFormControlProps {
	label: string
	id?: string
	placeholder?: string
	value?: string
	isLoading?: boolean
	options: Array<Release>
	onChange(version: string): void
	isRequired?: boolean
	width?: string
	isDisabled?: boolean
}

function renderReleasesOptions(
	releases?: Array<Release>,
): Array<ReactNode> | null {
	if (!releases) {
		return null
	}

	return releases.map((release) => (
		<option key={release.id} value={release.tag_name}>
			{getReleaseVersion(release)}
		</option>
	))
}

const ReleaseVersionFormControl = ({
	options,
	label,
	id,
	placeholder = 'Choose a version',
	onChange,
	value,
	isLoading = false,
	isRequired = true,
	width = 'full',
	isDisabled = false,
}: ReleaseVersionFormControlProps) => {
	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		onChange(e.target.value)
	}

	return (
		<Field.Root required={isRequired} width={width}>
			<Field.Label htmlFor={id} lineClamp={1}>
				{label}
			</Field.Label>
			<NativeSelectRoot>
				<NativeSelectField
					id={id}
					placeholder={isLoading ? 'Loading...' : placeholder}
					value={value}
					onChange={handleChange}
					disabled={isDisabled}
				>
					{renderReleasesOptions(options)}
				</NativeSelectField>
			</NativeSelectRoot>
		</Field.Root>
	)
}

export default ReleaseVersionFormControl
