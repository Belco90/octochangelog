import {
	Box,
	Button,
	Container,
	Heading,
	VStack,
	EmptyState,
} from '@chakra-ui/react'
import * as Sentry from '@sentry/tanstackstart-react'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { HiOutlineEmojiSad } from 'react-icons/hi'

import type { CompareSearchParams, PropsWithRequiredChildren } from '@/models'
import { getRepositoryQueryOptions } from '@/queries/repository'
import { seo } from '@/seo'
import { mapStringToRepositoryQueryParams } from '@/utils'

import { RepositoryReleasesComparator } from './-compare/RepositoryReleasesComparator'
import { ComparatorProvider } from './-compare/comparator-context'
import hljsCss from './-compare/hljs.css?url'

import type { ErrorComponentProps } from '@tanstack/react-router'

export const Route = createFileRoute('/compare')({
	validateSearch: (search): CompareSearchParams => {
		return {
			repo: search.repo as string | undefined,
			from: search.from as string | undefined,
			to: search.to as string | undefined,
		}
	},
	loaderDeps: ({ search }) => {
		const { repo } = search
		return { repo }
	},
	loader: async ({ context, deps }) => {
		const { repo } = deps

		if (repo) {
			const repositoryQueryParams = mapStringToRepositoryQueryParams(repo)
			if (repositoryQueryParams.owner && repositoryQueryParams.repo) {
				await context.queryClient.ensureQueryData(
					getRepositoryQueryOptions(repositoryQueryParams),
				)
			}
		}
	},
	head: () => ({
		meta: seo({
			title: 'Compare',
		}),
		links: [{ rel: 'stylesheet', href: hljsCss }],
	}),
	component: () => (
		<CompareLayout>
			<ComparePage />
		</CompareLayout>
	),
	errorComponent: (props) => (
		<CompareLayout>
			<CompareErrorPage {...props} />
		</CompareLayout>
	),
})

function CompareLayout({ children }: PropsWithRequiredChildren) {
	return (
		<Box
			height="full"
			width="full"
			py={{ base: 4, md: 10 }}
			bgColor="bg.subtle"
		>
			<Container maxWidth="2xl">
				<Heading
					as="h1"
					fontSize={{ base: '3xl', md: '4xl' }}
					fontWeight="black"
					letterSpacing="tight"
				>
					Compare
				</Heading>
			</Container>
			<ComparatorProvider>{children}</ComparatorProvider>
		</Box>
	)
}

function ComparePage() {
	return (
		<Box mt="4">
			<RepositoryReleasesComparator />
		</Box>
	)
}

function CompareErrorPage({ error, reset }: ErrorComponentProps) {
	const { queryClient } = Route.useRouteContext()
	const navigate = Route.useNavigate()
	useEffect(() => {
		Sentry.captureException(error)
	}, [error])

	const handleReset = () => {
		void queryClient.resetQueries()
		void navigate({ replace: true, search: undefined })
		reset()
	}

	return (
		<EmptyState.Root size="lg">
			<EmptyState.Content>
				<EmptyState.Indicator>
					<HiOutlineEmojiSad />
				</EmptyState.Indicator>

				<VStack textAlign="center">
					<EmptyState.Title>Something went wrong!</EmptyState.Title>
					<EmptyState.Description fontSize="lg">
						Octochangelog could not process the releases changelogs to be
						compared.
					</EmptyState.Description>
				</VStack>

				<Button onClick={handleReset} colorPalette="brand">
					Try again
				</Button>
			</EmptyState.Content>
		</EmptyState.Root>
	)
}
