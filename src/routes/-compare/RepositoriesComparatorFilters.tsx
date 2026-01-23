import { Stack } from '@chakra-ui/react'

import { ReleaseVersionsRangeFormControl } from './ReleaseVersionsRangeFormControl'
import { RepoCombobox } from './RepoCombobox'
import { useComparatorState, useComparatorUpdater } from './comparator-context'

export const RepositoriesComparatorFilters = () => {
	const { repository } = useComparatorState()
	const { setRepository } = useComparatorUpdater()

	return (
		<Stack gap={{ base: 2, md: 6 }} direction={{ base: 'column', md: 'row' }}>
			<RepoCombobox
				initialInputValue={repository?.full_name}
				onSelect={setRepository}
			/>
			<ReleaseVersionsRangeFormControl
				width={{ base: 'full', md: '80%' }}
				direction={{ base: 'column', md: 'row' }}
			/>
		</Stack>
	)
}
