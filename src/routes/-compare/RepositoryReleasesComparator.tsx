import {
	Box,
	Container,
	Separator,
	Flex,
	Bleed,
	EmptyState,
} from '@chakra-ui/react'
import { ClientOnly } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { HiOutlineFunnel } from 'react-icons/hi2'

import { AuthMessageSection } from './AuthMessageSection'
import { RepositoriesComparatorFilters } from './RepositoriesComparatorFilters'
import { useComparatorState } from './comparator-context'

const RepositoryReleasesChangelog = lazy(() =>
	import('./RepositoryReleasesChangelog').then((m) => ({
		default: m.RepositoryReleasesChangelog,
	})),
)

export const RepositoryReleasesComparator = () => {
	const { repository, fromVersion, toVersion } = useComparatorState()

	return (
		<Flex direction="column" height="full" pb={10}>
			<Box py={{ base: 4, md: 6 }}>
				<Container maxWidth="2xl">
					<Bleed inline={{ md: '10' }}>
						<Box
							bgColor="bg"
							rounded={{ md: '2xl' }}
							padding={{ md: '10' }}
							shadow={{ md: 'main' }}
						>
							<RepositoriesComparatorFilters />
						</Box>
					</Bleed>
				</Container>
			</Box>

			<Separator hideFrom="md" />

			<Flex
				flex="1 1 0%"
				direction="column"
				bgColor="bg.subtle"
				height="full"
				justifyContent="space-between"
			>
				<Container maxWidth="2xl">
					{repository && fromVersion && toVersion ? (
						<Box mt={2}>
							<Suspense>
								<RepositoryReleasesChangelog
									repository={repository}
									fromVersion={fromVersion}
									toVersion={toVersion}
								/>
							</Suspense>
						</Box>
					) : (
						<EmptyState.Root size="sm">
							<EmptyState.Content textAlign="center">
								<EmptyState.Indicator>
									<HiOutlineFunnel />
								</EmptyState.Indicator>
								<EmptyState.Description>
									You will see the changelog here after you fill out the
									filters.
								</EmptyState.Description>
							</EmptyState.Content>
						</EmptyState.Root>
					)}
				</Container>

				<Container maxWidth="2xl">
					<ClientOnly fallback={null}>
						<AuthMessageSection />
					</ClientOnly>
				</Container>
			</Flex>
		</Flex>
	)
}
