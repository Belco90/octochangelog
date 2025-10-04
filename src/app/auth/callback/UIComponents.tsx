'use client'

import {
	Alert,
	Button,
	Center,
	Container,
	Heading,
	Spinner,
	Text,
	VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

import { AUTH_REDIRECT_STORAGE_KEY } from '@/common'
import { setGithubAccessToken } from '@/github-auth'

import type { Route } from 'next'
import type { FC, ReactNode } from 'react'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<Container maxWidth="lg" pt={{ base: 4, md: 8 }} height="full" width="full">
			<VStack width="full" gap={{ base: 4, md: 16 }}>
				<Heading alignSelf="start">Authorizing on GitHub</Heading>
				{children}
			</VStack>
		</Container>
	)
}

export const AutCallbackLoading: FC = () => {
	return (
		<Layout>
			<Center>
				<VStack>
					<Spinner
						borderWidth="4px"
						animationDuration="0.65s"
						color="primary.500"
						size="xl"
					/>
					<Text>Authorizing...</Text>
				</VStack>
			</Center>
		</Layout>
	)
}

export const AuthCallbackSuccess: FC<{ accessToken: string }> = ({
	accessToken,
}) => {
	const router = useRouter()

	useEffect(() => {
		setGithubAccessToken(accessToken)
	}, [accessToken])

	const handleClick = () => {
		const redirectSearchParams = sessionStorage.getItem(
			AUTH_REDIRECT_STORAGE_KEY,
		)
		const redirectUrl: Route = redirectSearchParams
			? `/compare?${redirectSearchParams}`
			: '/compare'

		router.replace(redirectUrl)
	}

	return (
		<Layout>
			<Alert.Root status="success">
				<Alert.Indicator />
				<Alert.Title>Authorized successfully!</Alert.Title>
			</Alert.Root>

			<Button variant="cta" onClick={handleClick}>
				Back to compare
			</Button>
		</Layout>
	)
}

export const AuthCallbackError: FC<{ errorMessage: string }> = ({
	errorMessage,
}) => {
	return (
		<Layout>
			<Alert.Root status="error">
				<Alert.Indicator />
				<Alert.Title>Something went wrong!</Alert.Title>
				<Alert.Description>{errorMessage}. Please try again.</Alert.Description>
			</Alert.Root>
		</Layout>
	)
}
