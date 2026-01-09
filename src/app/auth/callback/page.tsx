import {
	AuthCallbackSuccess,
	AuthCallbackError,
} from '@/app/auth/callback/UIComponents'
import { exchangeCodeByAccessToken } from '@/github-auth'
import type { NextSearchParams } from '@/models'

import type { FC } from 'react'

export const metadata = {
	title: 'Authorizing on GitHub',
}

async function getAuthResult(code: string | Array<string> | undefined) {
	try {
		if (typeof code !== 'string') {
			throw new Error('Missing GitHub code')
		}
		const accessToken = await exchangeCodeByAccessToken(code)
		return { accessToken, errorMessage: null }
	} catch (error) {
		const errorMessage =
			error instanceof Error ? error.message : 'An unknown error occurred'
		return { accessToken: null, errorMessage }
	}
}

const AuthCallbackPage: FC<{ searchParams: NextSearchParams }> = async (
	props,
) => {
	const { code } = await props.searchParams

	const { accessToken, errorMessage } = await getAuthResult(code)

	if (errorMessage != null) {
		return <AuthCallbackError errorMessage={errorMessage} />
	}

	return <AuthCallbackSuccess accessToken={accessToken} />
}

export default AuthCallbackPage
