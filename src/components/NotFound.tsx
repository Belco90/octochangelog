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
		<Container maxWidth="4xl" pb={{ base: '8', lg: '16' }}>
			<VStack>
				<OptimizedImage
					src={mascotLogo}
					alt=""
					width={250}
					height={250}
					priority
				/>
				<Stack alignItems="center" gap="2" flexGrow="[1]" flexBasis="[0]">
					<Heading
						as="h2"
						fontSize={{ base: '2xl', md: '4xl' }}
						fontWeight="black"
						letterSpacing="tight"
					>
						This page could not be found.
					</Heading>
					<Text
						color="fg.muted"
						fontSize={{ base: 'lg', md: '2xl' }}
						fontWeight="bold"
					>
						Octochangelog could not find the page you wanted.
					</Text>
				</Stack>
			</VStack>
			<VStack mt="12" gap="5">
				<Button asChild variant="cta">
					<TanStackLink to="/compare">Go to compare</TanStackLink>
				</Button>

				<RouteLink to="/" fontWeight="black">
					Or go to homepage
				</RouteLink>
			</VStack>
		</Container>
	)
}
