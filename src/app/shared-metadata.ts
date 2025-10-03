import { BRIEF_DESCRIPTION, SITE_TITLE } from '@/common'

import type { Metadata } from 'next'

export const openGraph: NonNullable<Metadata['openGraph']> = {
	type: 'website',
	url: '/',
	title: SITE_TITLE,
	description: BRIEF_DESCRIPTION,
	images: ['/mascot-icon.png'],
}

export const getMetadataBase: () => URL = () => {
	const hostUrl = process.env.URL

	if (hostUrl) {
		return new URL(hostUrl)
	}

	return new URL(`http://localhost:${process.env.PORT || 3000}`)
}
