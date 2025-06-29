'use client'

import { AuthCallbackError } from './UIComponents'

import type { FC } from 'react'

type ErrorAuthPageProps = {
	error: Error & { digest?: string }
	reset: () => void
}

const ErrorAuthPage: FC<ErrorAuthPageProps> = ({ error }) => {
	return <AuthCallbackError errorMessage={error.message} />
}

export default ErrorAuthPage
