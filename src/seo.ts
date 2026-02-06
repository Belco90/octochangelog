import { BRIEF_DESCRIPTION, SITE_TITLE } from '@/common'

const SITE_URL = 'https://octochangelog.com'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

type SeoArgs = {
	title?: string
	description?: string
	imageUrl?: string
	url?: string
}

export function seo({ title, description, imageUrl, url }: SeoArgs = {}) {
	const finalTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE
	const finalDescription = description || BRIEF_DESCRIPTION
	const finalImageUrl = imageUrl || DEFAULT_OG_IMAGE
	const finalUrl = url ? `${SITE_URL}${url}` : SITE_URL

	const tags = [
		{ title: finalTitle },
		{ name: 'description', content: finalDescription },
		// Open Graph tags
		{ name: 'og:type', content: 'website' },
		{ name: 'og:site_name', content: SITE_TITLE },
		{ name: 'og:title', content: finalTitle },
		{ name: 'og:description', content: finalDescription },
		{ name: 'og:url', content: finalUrl },
		{ name: 'og:image', content: finalImageUrl },
		{ name: 'og:image:width', content: '600' },
		{ name: 'og:image:height', content: '600' },
		{ name: 'og:image:alt', content: SITE_TITLE },
		// Twitter/X Card tags
		{ name: 'twitter:card', content: 'summary' },
		{ name: 'twitter:title', content: finalTitle },
		{ name: 'twitter:description', content: finalDescription },
		{ name: 'twitter:image', content: finalImageUrl },
		{ name: 'twitter:image:alt', content: SITE_TITLE },
	]

	return tags
}
