import { Text, Alert, VStack } from '@chakra-ui/react'

import { SITE_TITLE } from '@/common'
import { GitHubLoginButton } from '@/components/GitHubLoginButton'
import { getIsAuth } from '@/github-auth'

export const AuthMessageSection = () => {
	const isAuth = getIsAuth()

	if (isAuth) {
		return undefined
	}

	return (
		<Alert.Root colorPalette="accent">
			<Alert.Description w="full">
				<VStack gap={4} alignItems="center" textAlign="center">
					<Text>
						Authorize {SITE_TITLE} to increase the maximum number of requests.
					</Text>
					<GitHubLoginButton />
				</VStack>
			</Alert.Description>
		</Alert.Root>
	)
}
