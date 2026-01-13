import { BRIEF_DESCRIPTION, SITE_TITLE } from '@/common'

type SeoArgs = {
	title?: string
	description?: string
	imageUrl?: string
}

export function seo({ title, description, imageUrl }: SeoArgs = {}) {
	const finalTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE
	const finalDescription = description || BRIEF_DESCRIPTION

	const tags = [
		{ title: finalTitle },
		{ name: 'description', content: finalDescription },
		{ name: 'og:type', content: 'website' },
		{ name: 'og:title', content: finalTitle },
		{ name: 'og:description', content: finalDescription },
	]

	if (imageUrl) {
		tags.push({ name: 'og:image', content: imageUrl })
	}

	return tags
}
