import { BRIEF_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/common'

type SeoArgs = {
	title?: string
	description?: string
	imageUrl?: string
}

const DEFAULT_OG_IMAGE_URL = `${SITE_URL}/logo.png`

export function seo({ title, description, imageUrl }: SeoArgs = {}) {
	const finalTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE
	const finalDescription = description || BRIEF_DESCRIPTION
	const finalImageUrl = imageUrl || DEFAULT_OG_IMAGE_URL

	return [
		{ title: finalTitle },
		{ name: 'description', content: finalDescription },
		{ name: 'og:type', content: 'website' },
		{ name: 'og:title', content: finalTitle },
		{ name: 'og:description', content: finalDescription },
		{ name: 'og:image', content: finalImageUrl },
	]
}
