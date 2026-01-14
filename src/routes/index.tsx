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
			maxWidth="container.lg"
			py={{ base: 8, lg: 16 }}
			mb={4}
			display="flex"
			flexDir="column"
			gap={40}
		>
			<MainSection />
			<FeaturesSection />
		</Container>
	)
}
