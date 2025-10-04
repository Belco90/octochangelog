import { FormControl, FormLabel, Select } from '@chakra-ui/react'

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
}: ReleaseVersionFormControlProps) => {
	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		onChange(e.target.value)
	}

	return (
		<FormControl isRequired={isRequired} width={width}>
			<FormLabel htmlFor={id} lineClamp={1}>
				{label}
			</FormLabel>
			<Select
				id={id}
				placeholder={isLoading ? 'Loading...' : placeholder}
				value={value}
				onChange={handleChange}
			>
				{renderReleasesOptions(options)}
			</Select>
		</FormControl>
	)
}

export default ReleaseVersionFormControl
