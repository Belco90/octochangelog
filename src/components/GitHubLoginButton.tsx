import { Button, Icon } from '@chakra-ui/react'
import { ClientOnly, useSearch } from '@tanstack/react-router'
import { createClientOnlyFn } from '@tanstack/react-start'
import { DiGithubBadge } from 'react-icons/di'

import { AUTH_REDIRECT_STORAGE_KEY } from '@/common'
import { getGitHubAuthUrl } from '@/github-auth'

import type { ButtonProps } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'

type GitHubLoginButtonProps = PropsWithChildren

const redirectToGitHubAuth = createClientOnlyFn(
	({ repo, from, to }: { repo?: string; from?: string; to?: string }) => {
		const filledSearchParams = new URLSearchParams(
			Object.fromEntries(
				Object.entries({ repo, from, to }).filter(([, value]) => value != null),
			) as Record<string, string>,
		)

		sessionStorage.setItem(
			AUTH_REDIRECT_STORAGE_KEY,
			filledSearchParams.toString(),
		)

		window.location.href = getGitHubAuthUrl({
			redirectUrl: window.location.origin,
		}).toString()
	},
)

export function GitHubLoginButtonInner({
	children = 'Login with GitHub',
}: GitHubLoginButtonProps) {
	const { repo, from, to } = useSearch({ strict: false })

	const handleClick: ButtonProps['onClick'] = (event) => {
		event.preventDefault()
		redirectToGitHubAuth({ repo, from, to })
	}

	return (
		<Button
			bg="gray.700"
			color="white"
			_hover={{ bg: 'gray.900' }}
			onClick={handleClick}
		>
			{children} <Icon as={DiGithubBadge} ml={2} boxSize={6} />
		</Button>
	)
}

export function GitHubLoginButton(props: GitHubLoginButtonProps) {
	return (
		<ClientOnly fallback={null}>
			<GitHubLoginButtonInner {...props} />
		</ClientOnly>
	)
}
