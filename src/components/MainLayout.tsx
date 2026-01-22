import { Flex } from '@chakra-ui/react'

import type { PropsWithRequiredChildren } from '@/models'

// function OldMainLayout({ children }: PropsWithRequiredChildren) {
// 	return (
// 		<Flex height="100%" direction="column">
// 			<Header />
// 			<Box as="main" flex="1 0 auto" bgColor="background2">
// 				{children}
// 			</Box>
// 			<Footer />
// 		</Flex>
// 	)
// }

export function MainLayout({ children }: PropsWithRequiredChildren) {
	return <Flex height="full">{children}</Flex>
}
