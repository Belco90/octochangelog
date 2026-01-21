import { Box, Heading, Text, Stack, Button, Container } from '@chakra-ui/react'
import { createFileRoute } from '@tanstack/react-router'
import { FaReact, FaCheckCircle } from 'react-icons/fa'

import { ThemeProvider } from '@/components/Providers'

export const Route = createFileRoute('/chakra')({
	component: ChakraV3TestPage,
})

function ChakraV3TestPage() {
	return (
		<ThemeProvider>
			<ChakraV3Layout>
				<ChakraV3Content />
			</ChakraV3Layout>
		</ThemeProvider>
	)
}

function ChakraV3Layout({ children }: { children: React.ReactNode }) {
	return (
		<Box minH="100vh" bg="gray.50">
			<Container maxW="7xl" py={8}>
				{children}
			</Container>
		</Box>
	)
}

function ChakraV3Content() {
	return (
		<Stack gap={8}>
			<Box>
				<Heading size="2xl" mb={4}>
					Chakra UI v3 Test Page
				</Heading>
				<Text fontSize="lg" color="gray.600">
					This page demonstrates Chakra UI v3 components working alongside v2.
				</Text>
			</Box>

			{/* Button showcase */}
			<Box>
				<Heading size="lg" mb={4}>
					Buttons
				</Heading>
				<Stack direction="row" gap={4} flexWrap="wrap">
					<Button colorPalette="blue">Primary Button</Button>
					<Button colorPalette="green" variant="outline">
						Outline Button
					</Button>
					<Button colorPalette="red" variant="ghost">
						Ghost Button
					</Button>
					<Button size="sm">Small Button</Button>
					<Button size="lg">Large Button</Button>
					<Button loading>Loading Button</Button>
				</Stack>
			</Box>

			{/* Headings showcase */}
			<Box>
				<Heading size="lg" mb={4}>
					Typography
				</Heading>
				<Stack gap={2}>
					<Heading size="2xl">Heading 2XL</Heading>
					<Heading size="xl">Heading XL</Heading>
					<Heading size="lg">Heading LG</Heading>
					<Heading size="md">Heading MD</Heading>
					<Heading size="sm">Heading SM</Heading>
					<Text fontSize="lg">Large body text</Text>
					<Text>Regular body text</Text>
					<Text fontSize="sm" color="gray.600">
						Small secondary text
					</Text>
				</Stack>
			</Box>

			{/* Icons showcase */}
			<Box>
				<Heading size="lg" mb={4}>
					Icons
				</Heading>
				<Stack direction="row" gap={4}>
					<Box>
						<FaReact size={32} color="blue" />
						<Text fontSize="sm" mt={2}>
							React Icon
						</Text>
					</Box>
					<Box>
						<FaCheckCircle size={32} color="green" />
						<Text fontSize="sm" mt={2}>
							Check Icon
						</Text>
					</Box>
				</Stack>
			</Box>

			{/* Color scheme test */}
			<Box>
				<Heading size="lg" mb={4}>
					Color Palettes
				</Heading>
				<Stack direction="row" gap={4} flexWrap="wrap">
					{['blue', 'green', 'red', 'purple', 'teal', 'orange'].map((color) => (
						<Button key={color} colorPalette={color}>
							{color}
						</Button>
					))}
				</Stack>
			</Box>

			{/* Layout test */}
			<Box>
				<Heading size="lg" mb={4}>
					Layout Components
				</Heading>
				<Box
					p={6}
					borderWidth="1px"
					borderRadius="lg"
					bg="white"
					boxShadow="sm"
				>
					<Text>
						This is a Card-like component built with Box. It demonstrates v3's
						layout and styling capabilities.
					</Text>
				</Box>
			</Box>
		</Stack>
	)
}
