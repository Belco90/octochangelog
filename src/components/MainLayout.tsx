import { Box, Flex } from '@chakra-ui/react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import type { PropsWithRequiredChildren } from '@/models'

export function MainLayout({ children }: PropsWithRequiredChildren) {
	return (
		<Flex height="full" direction="column">
			<Header />
			<Box as="main" flex="1 0 auto">
				{children}
			</Box>
			<Footer />
		</Flex>
	)
}
