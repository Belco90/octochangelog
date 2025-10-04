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

import Link from '@/components/ChakraNextLink'
import mascotIcon from '@/public/mascot-icon.png'

import { openGraph } from './shared-metadata'

import type { FC } from 'react'

export const metadata = {
	title: 'Not Found',
	openGraph: { ...openGraph, title: 'Not Found' },
}

const NotFound: FC = () => {
	return (
		<Container pb={{ base: 8, lg: 16 }}>
			<VStack px="10">
				<Image src={mascotIcon} alt="" width={250} height={250} />
				<Stack
					alignItems="center"
					gap="2"
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
			<VStack mt={12} gap={5}>
				<Button as={NextLink} variant="cta" href="/compare">
					Go to compare
				</Button>

				<Link href="/" fontWeight="black">
					Or go to homepage
				</Link>
			</VStack>
		</Container>
	)
}

export default NotFound
