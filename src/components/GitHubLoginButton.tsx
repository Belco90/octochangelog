import { Button, Icon } from '@chakra-ui/react'
import { useSearch } from '@tanstack/react-router'
import { DiGithubBadge } from 'react-icons/di'

import { AUTH_REDIRECT_STORAGE_KEY } from '@/common'
import { getGitHubAuthUrl } from '@/github-auth'

import type { MouseEvent, PropsWithChildren } from 'react'

type GitHubLoginButtonProps = PropsWithChildren

const GitHubLoginButton = ({
	children = 'Login with GitHub',
}: GitHubLoginButtonProps) => {
	const search = useSearch({ strict: false })

	const handleClick = (event: MouseEvent) => {
		event.preventDefault()

		const searchParams = new URLSearchParams(search).toString()

		sessionStorage.setItem(AUTH_REDIRECT_STORAGE_KEY, searchParams)

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
