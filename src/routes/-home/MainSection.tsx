import { Button, Center, Flex, Heading, Stack } from '@chakra-ui/react'
import { Link as TanStackLink } from '@tanstack/react-router'

import { BRIEF_DESCRIPTION } from '@/common'
import { OptimizedImage } from '@/components/OptimizedImage'
import mascotLogo from '@/images/mascot-logo.png'

export function MainSection() {
	return (
		<Stack
			alignItems="center"
			justifyContent="center"
			direction={{ base: 'column-reverse', lg: 'row' }}
			spacing={{ base: 10, lg: 1 }}
		>
			<Stack alignItems={{ base: 'center', lg: 'start' }} spacing="24">
				<Heading
					as="h2"
					color="primaryText"
					fontSize={{ base: '3xl', md: '5xl' }}
					fontWeight="black"
					textAlign={{ base: 'center', lg: 'left' }}
					letterSpacing="tight"
					px={{ base: 12, lg: 0 }}
				>
					{BRIEF_DESCRIPTION}.
				</Heading>
				<Flex justify="center" align="center">
					<Button as={TanStackLink} variant="cta" to="/compare">
						Try me now!
					</Button>
				</Flex>
			</Stack>
			<Center width="full">
				<OptimizedImage
					src={mascotLogo}
					alt=""
					width={500}
					height={500}
					priority
				/>
			</Center>
		</Stack>
	)
}
