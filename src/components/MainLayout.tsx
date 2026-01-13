import { Flex, Box } from '@chakra-ui/react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

import type { ReactNode } from 'react'

type MainLayoutProps = {
	children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
	return (
		<Flex height="100%" direction="column">
			<Header />
			<Box as="main" flex="1 0 auto" bgColor="background2">
				{children}
			</Box>
			<Footer />
		</Flex>
	)
}
