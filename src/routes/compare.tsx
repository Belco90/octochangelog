import { Box } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'

import type { CompareSearchParams } from '@/models'
import { seo } from '@/seo'

import { RepositoryReleasesComparator } from './-compare/RepositoryReleasesComparator'
import { ComparatorProvider } from './-compare/comparator-context'
import hljsCss from './-compare/hljs.css?url'

export const Route = createFileRoute('/compare')({
	head: () => ({
		meta: seo({
			title: 'Compare',
		}),
		links: [{ rel: 'stylesheet', href: hljsCss }],
	}),
	validateSearch: (search): CompareSearchParams => {
		return {
			repo: search.repo as string | undefined,
			from: search.from as string | undefined,
			to: search.to as string | undefined,
		}
	},
	component: ComparePage,
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
