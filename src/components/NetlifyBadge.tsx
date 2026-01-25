import { Image } from '@unpic/react'

import { useColorModeValue } from '@/components/snippets/color-mode'

export function NetlifyBadge() {
	const src = useColorModeValue(
		'https://www.netlify.com/assets/badges/netlify-badge-color-bg.svg',
		'https://www.netlify.com/assets/badges/netlify-badge-color-accent.svg',
	)
	return (
		<Image
			src={src}
			alt="Deploys by Netlify"
			width={114}
			height={50}
			loading="lazy"
		/>
	)
}
