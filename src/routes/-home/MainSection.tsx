import { Heading, Stack, VStack, Button } from '@chakra-ui/react'

import { BRIEF_DESCRIPTION, SITE_TITLE } from '@/common'
import { OptimizedImage } from '@/components/OptimizedImage'
import { RouteLink } from '@/components/RouteLink'
import mascotLogo from '@/images/mascot-logo.png'

export function MainSection() {
	return (
		<Stack
			alignItems="center"
			gap="8"
			direction={{ base: 'column', xl: 'row' }}
		>
			<OptimizedImage
				src={mascotLogo}
				alt=""
				width={500}
				height={500}
				priority
			/>
			<VStack gap="8" alignItems={{ base: 'center', xl: 'start' }}>
				<Heading
					as="h1"
					fontSize={{ base: '5xl', md: '7xl' }}
					fontWeight="black"
					letterSpacing="tighter"
				>
					{SITE_TITLE}
				</Heading>
				<Heading
					as="h2"
					color="fg.muted"
					fontSize={{ base: '2xl', md: '4xl' }}
					fontWeight="extrabold"
					textAlign={{ base: 'center', lg: 'start' }}
					pr={{ base: '0', lg: '4' }}
					lineHeight="shorter"
				>
					{BRIEF_DESCRIPTION}
				</Heading>
				<Stack
					direction={{ base: 'column', md: 'row' }}
					alignItems="center"
					gap="2"
				>
					<Button variant="cta" asChild>
						<RouteLink to="/compare" textDecoration="none">
							Compare changelogs
						</RouteLink>
					</Button>
					<Button variant="plain" colorPalette="accent" size="lg" asChild>
						<RouteLink
							to="/compare"
							textDecoration="none"
							search={{
								repo: 'testing-library/eslint-plugin-testing-library',
								from: 'v6.5.0',
								to: 'latest',
							}}
						>
							See example
						</RouteLink>
					</Button>
				</Stack>
			</VStack>
		</Stack>
	)
}
