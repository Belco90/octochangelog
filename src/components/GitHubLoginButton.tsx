import { Button, Icon } from '@chakra-ui/react'
import { useSearch } from '@tanstack/react-router'
import { DiGithubBadge } from 'react-icons/di'

import { AUTH_REDIRECT_STORAGE_KEY } from '@/common'
import { getGitHubAuthUrl } from '@/github-auth'

import type { ButtonProps } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'

type GitHubLoginButtonProps = PropsWithChildren

const GitHubLoginButton = ({
	children = 'Login with GitHub',
}: GitHubLoginButtonProps) => {
	const { repo, from, to } = useSearch({ strict: false })

	const handleClick: ButtonProps['onClick'] = (event) => {
		event.preventDefault()

		const filledSearchParams = new URLSearchParams(
			Object.fromEntries(
				Object.entries({ repo, from, to }).filter(
					([, value]) => typeof value === 'string',
				),
			) as Record<string, string>,
		)
		sessionStorage.setItem(
			AUTH_REDIRECT_STORAGE_KEY,
			filledSearchParams.toString(),
		)

		window.location.href = getGitHubAuthUrl({
			redirectUrl: window.location.origin,
		}).toString()
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

export default GitHubLoginButton
