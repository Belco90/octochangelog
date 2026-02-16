import { Box, VStack } from '@chakra-ui/react'

type TableOfContentsSidebarProps = {
	sections: Array<string>
}

export function TableOfContentsSidebar({
	sections,
}: TableOfContentsSidebarProps) {
	return (
		<Box
			as="nav"
			hideBelow="lg"
			position="fixed"
			py="24"
			px={{ base: '4', xl: '8' }}
			top="8"
			left="0"
			overflowY="auto"
		>
			<VStack as="ul" spaceY="2" alignItems="start" textTransform="capitalize">
				{sections.map((section) => (
					<li key={section}>{section}</li>
				))}
			</VStack>
		</Box>
	)
}
