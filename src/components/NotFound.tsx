import {
	Button,
	Container,
	Heading,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react'
import { Link as TanStackLink } from '@tanstack/react-router'

import { OptimizedImage } from '@/components/OptimizedImage'
import { RouteLink } from '@/components/RouteLink'
import mascotLogo from '@/images/mascot-logo.png'

export function NotFound() {
	return (
		<Container variant="fluid" pb={{ base: 8, lg: 16 }}>
			<VStack px="10">
				<OptimizedImage
					src={mascotLogo}
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
						This page could not be found.
					</Heading>
					<Text as="p" color="secondaryText" fontSize="2xl" fontWeight="black">
						Octochangelog cannot divine the page you wanted.
					</Text>
				</Stack>
			</VStack>
			<VStack mt={12} spacing={5}>
				<Button as={TanStackLink} variant="cta" to="/compare">
					Go to compare
				</Button>

				<RouteLink to="/" fontWeight="black">
					Or go to homepage
				</RouteLink>
			</VStack>
		</Container>
	)
}
