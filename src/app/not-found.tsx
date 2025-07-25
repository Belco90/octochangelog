import {
	Button,
	Container,
	Heading,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'

import { Link } from '@/components/ChakraNextLink'
import mascotIcon from '@/public/mascot-icon.png'

import { openGraph } from './shared-metadata'

import type { FC } from 'react'

export const metadata = {
	title: 'Not Found',
	openGraph: { ...openGraph, title: 'Not Found' },
}

const NotFound: FC = () => {
	return (
		<Container variant="fluid" pb={{ base: 8, lg: 16 }}>
			<VStack px="10">
				<Image src={mascotIcon} alt="" width={250} height={250} />
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
				<NextLink href="/compare" passHref legacyBehavior>
					<Button as="a" variant="cta">
						Go to compare
					</Button>
				</NextLink>

				<Link href="/" fontWeight="black">
					Or go to homepage
				</Link>
			</VStack>
		</Container>
	)
}

export default NotFound
