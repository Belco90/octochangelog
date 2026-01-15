import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

import type { CompareSearchParams } from '@/models'
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
	component: ComparePage,
	errorComponent: CompareErrorPage,
})

function ComparePage() {
	const { repo, from, to } = Route.useSearch()

	return (
		<Box height="full" width="full" bgColor="background3">
			<ComparatorProvider
				initialRepoFullName={repo}
				initialFrom={from}
				initialTo={to}
			>
				<RepositoryReleasesComparator />
			</ComparatorProvider>
		</Box>
	)
}

function CompareErrorPage({ error, reset }: ErrorComponentProps) {
	useEffect(() => {
		console.log('TODO: capture exception in Sentry (include info?)', error)
	}, [error])

	return (
		<Box height="full" width="full" bgColor="background3">
			<Container variant="fluid" height="full">
				<VStack
					px="10"
					alignItems="center"
					spacing={4}
					justifyContent="center"
					height="full"
				>
					<Heading>Something went wrong!</Heading>
					<Text as="p">
						Octochangelog could not process the releases changelogs to be
						compared.
					</Text>
					<Button onClick={() => reset()}>Try again</Button>
				</VStack>
			</Container>
		</Box>
	)
}
