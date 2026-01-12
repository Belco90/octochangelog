'use client'

import { Box } from '@chakra-ui/react'

import RepositoryReleasesComparator from '@/app/compare/RepositoryReleasesComparator'

import { ComparatorProvider } from './comparator-context'

interface ComparatorClientViewProps {
	repo?: string
	from?: string
	to?: string
}

const ComparatorClientView = ({
	repo,
	from,
	to,
}: ComparatorClientViewProps) => {
	return (
		<Box height="full" width="full" bgColor="background3">
			<ComparatorProvider repo={repo} from={from} to={to}>
				<RepositoryReleasesComparator />
			</ComparatorProvider>
		</Box>
	)
}

export default ComparatorClientView
