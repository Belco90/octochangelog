import { Box, Container, Heading } from '@chakra-ui/react'
import * as Sentry from '@sentry/tanstackstart-react'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

import { GenericError } from '@/components/GenericError'
import type { CompareSearchParams, PropsWithRequiredChildren } from '@/models'
import {
	prefetchReleasesForVersions,
	releasesInfiniteQueryOptions,
} from '@/queries/release'
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
	loader: async ({ context, location }) => {
		const { repo, from, to } = location.search as CompareSearchParams

		if (repo) {
			const repositoryQueryParams = mapStringToRepositoryQueryParams(repo)
			if (repositoryQueryParams.owner && repositoryQueryParams.repo) {
				await context.queryClient.ensureQueryData(
					getRepositoryQueryOptions(repositoryQueryParams),
				)

				if (from || to) {
					// URL has versions: fetch pages until both versions found.
					// Wrapped in try/catch so that transient server-side errors
					// (e.g. GitHub rate limiting) degrade gracefully — the client
					// will fall back to fetching on its own.
					try {
						await prefetchReleasesForVersions({
							queryClient: context.queryClient,
							repository: repositoryQueryParams,
							from,
							to,
						})
					} catch {
						// fall through, components will fetch on the client
						return
					}
				} else {
					// URL has repo only: prefetch first page of releases
					await context.queryClient.prefetchInfiniteQuery({
						...releasesInfiniteQueryOptions({
							repository: repositoryQueryParams,
						}),
						pages: 1,
					})
				}
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
			py={{ base: '4', md: '6' }}
			bgColor={{ base: 'bg', md: 'bg.subtle' }}
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
		<Box mt={{ base: '2', md: '0' }} height="full">
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
		<GenericError error={error} reset={handleReset}>
			Octochangelog could not process the releases changelogs to be compared.
		</GenericError>
	)
}
