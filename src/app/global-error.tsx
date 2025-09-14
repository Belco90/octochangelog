'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

import { interFont, robotoMonoFont } from '@/fonts'
import type { NextErrorPageProps } from '@/models'

import Providers from './Providers'
import UIError from './UIError'

import type { FC } from 'react'

const GlobalError: FC<NextErrorPageProps> = ({ error, reset }) => {
	useEffect(() => {
		Sentry.captureException(error)
	}, [error])

	return (
		<html
			lang="en"
			className={`${interFont.variable} ${robotoMonoFont.variable}`}
			suppressHydrationWarning
		>
			<body suppressHydrationWarning>
				<Providers>
					<UIError error={error} reset={reset} />
				</Providers>
			</body>
		</html>
	)
}

export default GlobalError
