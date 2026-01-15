import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Button,
	Center,
	Code,
	Container,
	Heading,
	Spinner,
	Text,
	VStack,
} from '@chakra-ui/react'
import { createFileRoute, Link as TanStackLink } from '@tanstack/react-router'
import { createClientOnlyFn, createServerFn } from '@tanstack/react-start'
import { deleteCookie, setCookie } from '@tanstack/react-start/server'

import { AUTH_REDIRECT_STORAGE_KEY } from '@/common'
import { exchangeCodeByAccessToken, GITHUB_STORAGE_KEY } from '@/github-auth'
import type { PropsWithRequiredChildren } from '@/models'
import { seo } from '@/seo'

import type { ErrorComponentProps } from '@tanstack/react-router'

const MISSING_CODE_ERROR = new Error('Missing GitHub code')

const getAuthResult = createServerFn()
	.inputValidator((data: { code: string }) => data)
	.handler(async ({ data }) => {
		try {
			const { code } = data
			if (code === '') {
				throw MISSING_CODE_ERROR
			}
			const { access_token } = await exchangeCodeByAccessToken(code)
			setCookie(GITHUB_STORAGE_KEY, access_token, {
				// Expires within a year
				expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
				sameSite: 'lax',
				secure: process.env.NODE_ENV === 'production',
			})
			return { success: true }
		} catch (err) {
			deleteCookie(GITHUB_STORAGE_KEY)
			throw err
		}
	})

const getRedirectSearchParams = createClientOnlyFn(() => {
	return sessionStorage.getItem(AUTH_REDIRECT_STORAGE_KEY)
})

export const Route = createFileRoute('/auth/callback')({
	head: () => ({
		meta: seo({
			title: 'Authorizing on GitHub',
		}),
	}),
	validateSearch: (search) => {
		if (search.code == null) {
			throw MISSING_CODE_ERROR
		}
		return search as { code: string }
	},
	loaderDeps: ({ search }) => {
		const { code } = search
		return { code }
	},
	loader: async ({ deps }) => getAuthResult({ data: deps }),
	pendingComponent: () => (
		<AuthLayout>
			<AuthCallbackPending />
		</AuthLayout>
	),
	component: () => (
		<AuthLayout>
			<AuthCallbackPage />
		</AuthLayout>
	),
	errorComponent: (props) => (
		<AuthLayout>
			<AuthCallbackError {...props} />
		</AuthLayout>
	),
})

function AuthLayout({ children }: PropsWithRequiredChildren) {
	return (
		<Container
			maxWidth="container.lg"
			pt={{ base: 4, md: 8 }}
			height="full"
			width="full"
		>
			<VStack width="full" gap={{ base: 4, md: 16 }}>
				<Heading alignSelf="start">Authorizing on GitHub</Heading>
				{children}
			</VStack>
		</Container>
	)
}

function AuthCallbackPage() {
	Route.useLoaderData()

	const redirectSearchParams = getRedirectSearchParams()
	const compareUrl = redirectSearchParams
		? `/compare?${redirectSearchParams}`
		: '/compare'

	return (
		<Alert
			status="success"
			variant="subtle"
			py={12}
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			textAlign="center"
		>
			<AlertIcon boxSize="40px" />
			<AlertTitle mt={4} mb={2} fontSize="lg">
				Authorized successfully!
			</AlertTitle>
			<AlertDescription maxWidth="sm" mt={4}>
				<Button as={TanStackLink} variant="cta" to={compareUrl} replace>
					Back to compare
				</Button>
			</AlertDescription>
		</Alert>
	)
}

function AuthCallbackPending() {
	return (
		<Center>
			<VStack>
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="primary.500"
					size="xl"
				/>
				<Text>Authorizing...</Text>
			</VStack>
		</Center>
	)
}

function AuthCallbackError({ error }: ErrorComponentProps) {
	return (
		<Alert
			status="error"
			variant="subtle"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
			textAlign="center"
		>
			<AlertIcon boxSize="40px" />
			<AlertTitle mt={4} mb={2} fontSize="lg">
				Something went wrong!
			</AlertTitle>
			<AlertDescription maxWidth="sm">
				<Code>{error.message}</Code>
				<Text mt={4}>Please try again.</Text>
			</AlertDescription>
		</Alert>
	)
}
