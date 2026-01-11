'use client'

import { ColorModeScript } from '@chakra-ui/react'
import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

import customTheme from '@/custom-theme'
import '@/fonts'
import type { NextErrorPageProps } from '@/models'

import Providers from './Providers'
import UIError from './UIError'

import type { FC } from 'react'

const GlobalError: FC<NextErrorPageProps> = ({ error, reset }) => {
	useEffect(() => {
		Sentry.captureException(error)
	}, [error])

	return (
		<html lang="en" suppressHydrationWarning>
			<body suppressHydrationWarning>
				<ColorModeScript
					initialColorMode={customTheme.config.initialColorMode}
				/>
				<Providers>
					<UIError error={error} reset={reset} />
				</Providers>
			</body>
		</html>
	)
}

export default GlobalError
