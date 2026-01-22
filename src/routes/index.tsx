import { Container } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'

import { FeaturesSection } from './-home/FeaturesSection'
import { MainSection } from './-home/MainSection'

export const Route = createFileRoute('/')({
	component: HomePage,
})

function HomePage() {
	return (
		<Container
			maxWidth="6xl"
			py={{ base: 2, lg: 4 }}
			mb={4}
			display="flex"
			flexDir="column"
			gap={20}
		>
			<MainSection />
			<FeaturesSection />
		</Container>
	)
}
