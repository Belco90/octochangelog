import { Flex, Box } from '@chakra-ui/react'

import Footer from '@/components/Footer'
import Header from '@/components/Header'

import type { FC, ReactNode } from 'react'

interface Props {
	children: ReactNode
}

const UILayout: FC<Props> = ({ children }: Props) => (
	<Flex height="100%" direction="column">
		<Header />
		<Box as="main" flex="1 0 auto" bgColor="background2">
			{children}
		</Box>
		<Footer />
	</Flex>
)

export default UILayout
