import { NotFound } from './NotFound'
import { openGraph } from './shared-metadata'

import type { FC } from 'react'

export const metadata = {
	title: 'Not Found',
	openGraph: { ...openGraph, title: 'Not Found' },
}

const NotFoundPage: FC = () => {
	return <NotFound />
}

export default NotFoundPage
