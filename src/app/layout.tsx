import { ColorModeScript } from '@chakra-ui/react'

import { PirschAnalytics } from '@/app/PirschAnalytics'
import UILayout from '@/app/UILayout'
import { BRIEF_DESCRIPTION, SITE_TITLE } from '@/common'
import customTheme from '@/custom-theme'
import '@/fonts'

import Providers from './Providers'

import type { Viewport } from 'next'
import type { FC, ReactNode } from 'react'

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
	<html lang="en" suppressHydrationWarning>
		<body suppressHydrationWarning>
			<PirschAnalytics />
			<ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
			<Providers>
				<UILayout>{children}</UILayout>
			</Providers>
		</body>
	</html>
)

export default RootLayout
