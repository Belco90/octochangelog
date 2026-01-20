import {
	Button,
	Container,
	Heading,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react'
import * as Sentry from '@sentry/tanstackstart-react'
import { useEffect } from 'react'

import { OptimizedImage } from '@/components/OptimizedImage'
import mascotIcon from '@/images/mascot-logo.png'

import type { ErrorComponentProps } from '@tanstack/react-router'

export function GenericError({ error, reset }: ErrorComponentProps) {
	useEffect(() => {
		Sentry.captureException(error)
	}, [error])

	return (
		<Container variant="fluid" pb={{ base: 8, lg: 16 }}>
			<VStack px="10">
				<OptimizedImage
					src={mascotIcon}
					alt=""
					width={250}
					height={250}
					priority
				/>
				<Stack
					shouldWrapChildren
					alignItems="center"
					spacing="2"
					flexGrow={1}
					flexBasis={0}
				>
					<Heading
						as="h2"
						color="primaryText"
						fontSize="4xl"
						fontWeight="black"
						letterSpacing="tight"
					>
						Something went wrong!
					</Heading>
					<Text as="p" color="secondaryText" fontSize="2xl" fontWeight="black">
						Octochangelog could not handle the workload properly.
					</Text>
				</Stack>
			</VStack>

			<VStack mt={12} spacing={5}>
				<Button onClick={() => reset()}>Try again</Button>
			</VStack>
		</Container>
	)
}
