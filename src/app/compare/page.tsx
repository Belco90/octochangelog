import { openGraph } from '@/app/shared-metadata'

import ComparatorClientView from './ComparatorClientView'

export const metadata = {
	title: 'Compare',
	openGraph: { ...openGraph, title: 'Compare', url: '/compare' },
}

interface ComparatorPageProps {
	searchParams: Promise<{ repo?: string; from?: string; to?: string }>
}

const ComparatorPage = async ({ searchParams }: ComparatorPageProps) => {
	const params = await searchParams
	return (
		<ComparatorClientView
			repo={params.repo}
			from={params.from}
			to={params.to}
		/>
	)
}

export default ComparatorPage
