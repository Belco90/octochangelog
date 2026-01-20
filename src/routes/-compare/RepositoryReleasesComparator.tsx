import { Box, Container, Divider, Flex } from '@chakra-ui/react'
import { ClientOnly } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

import { AuthMessageSection } from './AuthMessageSection'
import { RepositoriesComparatorFilters } from './RepositoriesComparatorFilters'
import { RepositoryReleasesChangelogHeading } from './RepositoryReleasesChangelogHeading'
import { useComparatorState } from './comparator-context'

const RepositoryReleasesChangelog = lazy(() =>
	import('./RepositoryReleasesChangelog').then((m) => ({
		default: m.RepositoryReleasesChangelog,
	})),
)

export const RepositoryReleasesComparator = () => {
	const { repository, fromVersion, toVersion } = useComparatorState()

	return (
		<Flex direction="column" height="full">
			<Box bgColor="background2" py={{ base: 4, md: 8 }}>
				<Container variant="fluid">
					<RepositoriesComparatorFilters />
				</Container>
			</Box>
			<Divider />
			<Box pt={2} flex="1 0 auto">
				{repository && (
					<>
						<RepositoryReleasesChangelogHeading
							repository={repository}
							fromVersion={fromVersion ?? undefined}
							toVersion={toVersion ?? undefined}
						/>
						<Container variant="fluid">
							<Suspense>
								<RepositoryReleasesChangelog
									repository={repository}
									fromVersion={fromVersion ?? undefined}
									toVersion={toVersion ?? undefined}
								/>
							</Suspense>
						</Container>
					</>
				)}

				<ClientOnly fallback={null}>
					<AuthMessageSection />
				</ClientOnly>
			</Box>
		</Flex>
	)
}
