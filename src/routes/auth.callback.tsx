import {
	Alert,
	Box,
	Button,
	Code,
	Container,
	Heading,
	Spinner,
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
	validateSearch: (search) => {
		if (search.code == null) {
			throw MISSING_CODE_ERROR
		}
		return search as { code: string }
	},
	ssr: 'data-only',
	loaderDeps: ({ search }) => {
		const { code } = search
		return { code }
	},
	loader: async ({ deps }) => getAuthResult({ data: deps }),
	head: () => ({
		meta: seo({
			title: 'Authorizing on GitHub',
		}),
	}),
	// Do not cache this route's data after it's unloaded
	gcTime: 0,
	// Only reload the route when the user navigates to it or when deps change.
	shouldReload: false,
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
			maxWidth="2xl"
			py={{ base: 4, md: 8 }}
			height="full"
			width="full"
		>
			<Box width="full">
				<Heading
					as="h1"
					fontSize={{ base: '3xl', md: '4xl' }}
					fontWeight="black"
					letterSpacing="tight"
				>
					Authorizing on GitHub
				</Heading>
				<Box mt={{ base: 4, md: 16 }}>{children}</Box>
			</Box>
		</Container>
	)
}

function AuthCallbackPage() {
	// No need to call `Route.useLoaderData()` since reaching
	// this client component means the OAuth flow was successful.

	const redirectSearchParams = getRedirectSearchParams()
	const compareUrl = redirectSearchParams
		? `/compare?${redirectSearchParams}`
		: '/compare'

	return (
		<Alert.Root status="success" variant="subtle">
			<VStack w="full" alignItems="center">
				<Alert.Indicator boxSize="10" />
				<Alert.Content display="contents">
					<Alert.Title>
						<Heading fontWeight="black">Authorized successfully</Heading>
					</Alert.Title>
					<Alert.Description mt={4}>
						<Button asChild variant="cta" fontSize="md" fontWeight="bold">
							<TanStackLink to={compareUrl} replace>
								Back to compare
							</TanStackLink>
						</Button>
					</Alert.Description>
				</Alert.Content>
			</VStack>
		</Alert.Root>
	)
}

function AuthCallbackPending() {
	return (
		<Alert.Root status="info" variant="subtle">
			<VStack w="full" alignItems="center">
				<Alert.Indicator boxSize="10">
					<Spinner size="lg" borderWidth="4px" />
				</Alert.Indicator>
				<Alert.Content display="contents">
					<Alert.Title>
						<Heading fontWeight="black">Authorizing...</Heading>
					</Alert.Title>
				</Alert.Content>
			</VStack>
		</Alert.Root>
	)
}

function AuthCallbackError({ error, reset }: ErrorComponentProps) {
	return (
		<Alert.Root status="error" variant="subtle">
			<VStack w="full" alignItems="center">
				<Alert.Indicator boxSize="10" />
				<Alert.Content display="contents">
					<Alert.Title>
						<Heading fontWeight="black">Something went wrong!</Heading>
					</Alert.Title>
					<Alert.Description mt={4} display="contents">
						<Code>{error.message}</Code>
						<Button onClick={() => reset()} colorPalette="accent" mt={4}>
							Try again
						</Button>
					</Alert.Description>
				</Alert.Content>
			</VStack>
		</Alert.Root>
	)
}
