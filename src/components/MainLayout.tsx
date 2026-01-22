import { Flex, Box } from '@chakra-ui/react-v2'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import type { PropsWithRequiredChildren } from '@/models'
import { isNewDesignEnabled } from '@/utils'

function OldMainLayout({ children }: PropsWithRequiredChildren) {
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

export function MainLayout({ children }: PropsWithRequiredChildren) {
	if (!isNewDesignEnabled) {
		return <OldMainLayout>{children}</OldMainLayout>
	}

	return <div>{children}</div>
}
