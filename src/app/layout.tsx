import { PirschAnalytics } from '@/app/PirschAnalytics'
import UILayout from '@/app/UILayout'
import { FULL_DESCRIPTION, SITE_TITLE } from '@/common'
import { interFont, robotoMonoFont } from '@/fonts'
import { themeColors } from '@/theme'

import Providers from './Providers'
import { getMetadataBase, openGraph } from './shared-metadata'

import type { Viewport } from 'next'
import type { FC, ReactNode } from 'react'

export const metadata = {
	title: {
		template: `%s | ${SITE_TITLE}`,
		default: SITE_TITLE,
	},
	description: FULL_DESCRIPTION,
	metadataBase: getMetadataBase(),
	openGraph: { ...openGraph },
}

export const viewport: Viewport = {
	colorScheme: 'light dark',
	themeColor: [
		{
			media: '(prefers-color-scheme: light)',
			color: themeColors.primary[300],
		},
		{
			media: '(prefers-color-scheme: dark)',
			color: themeColors.primary[700],
		},
	],
}

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
	<html
		lang="en"
		className={`${interFont.variable} ${robotoMonoFont.variable}`}
		suppressHydrationWarning
	>
		<body>
			<PirschAnalytics />
			<Providers>
				<UILayout>{children}</UILayout>
			</Providers>
		</body>
	</html>
)

export default RootLayout
