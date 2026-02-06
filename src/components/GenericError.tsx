import { Button, EmptyState, VStack } from '@chakra-ui/react'
import * as Sentry from '@sentry/tanstackstart-react'
import { useEffect } from 'react'
import { HiOutlineEmojiSad } from 'react-icons/hi'

import type { ErrorComponentProps } from '@tanstack/react-router'
import type { PropsWithChildren } from 'react'

type GenericErrorProps = PropsWithChildren<ErrorComponentProps>

const DEFAULT_DESCRIPTION =
	'Octochangelog could not handle the workload properly.'

export function GenericError({ error, reset, children }: GenericErrorProps) {
	useEffect(() => {
		Sentry.captureException(error)
	}, [error])

	return (
		<EmptyState.Root size="lg">
			<EmptyState.Content>
				<EmptyState.Indicator>
					<HiOutlineEmojiSad />
				</EmptyState.Indicator>

				<VStack textAlign="center">
					<EmptyState.Title as="h2">Something went wrong!</EmptyState.Title>
					<EmptyState.Description fontSize="lg">
						{children ?? DEFAULT_DESCRIPTION}
					</EmptyState.Description>
				</VStack>

				<Button onClick={reset} colorPalette="brand">
					Try again
				</Button>
			</EmptyState.Content>
		</EmptyState.Root>
	)
}
