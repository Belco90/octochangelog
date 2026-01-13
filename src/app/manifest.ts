import { BRIEF_DESCRIPTION, SITE_TITLE } from '@/common'
import customTheme from '@/custom-theme'

import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: SITE_TITLE,
		description: BRIEF_DESCRIPTION,
		short_name: SITE_TITLE,
		theme_color: customTheme.colors.primary['700'],
		icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
	}
}
