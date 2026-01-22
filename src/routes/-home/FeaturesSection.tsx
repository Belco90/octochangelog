import { Badge, Box, Card, SimpleGrid, Text } from '@chakra-ui/react'
import {
	HiOutlineFilter,
	HiOutlineFire,
	HiOutlineShare,
	HiOutlineSwitchHorizontal,
	HiOutlineTag,
} from 'react-icons/hi'

import type { PropsWithRequiredChildren } from '@/models'

import type { ReactNode } from 'react'

type FeatureItemProps = PropsWithRequiredChildren<{
	icon: ReactNode
	title: string
}>

const FEATURES_DESCRIPTIONS: Array<FeatureItemProps> = [
	{
		icon: <HiOutlineSwitchHorizontal />,
		title: 'Compare releases easily',
		children: (
			<Text>
				Sifting through changelogs on GitHub taking too much time? Let
				Octochangelog put the list of changes in a single view!
			</Text>
		),
	},
	{
		icon: <HiOutlineShare />,
		title: 'Share changelogs',
		children: (
			<Text>
				Want to let your team review the changes in a dependency? Give them a
				link!
			</Text>
		),
	},
	{
		icon: <HiOutlineFire />,
		title: "Don't miss breaking changes",
		children: (
			<Text>
				Octochangelog finds all breaking changes, and lists them at the top. You
				can’t miss those pesky gotcha’s now!
			</Text>
		),
	},
	{
		icon: <HiOutlineFilter />,
		title: 'No manual sorting',
		children: (
			<Text>
				Want a list of major, minor and patch level changes? Octochangelog
				groups changes into categories for you!
			</Text>
		),
	},
	{
		icon: <HiOutlineTag />,
		title: 'Changes per version',
		children: (
			<Text>
				Want to know which version introduced a certain change? Octochangelog
				labels each change with the version number.
			</Text>
		),
	},
]

function FeatureItem({ icon, title, children }: FeatureItemProps) {
	return (
		<Card.Root variant="elevated">
			<Card.Body gap={2}>
				<Box>
					<Badge
						variant="subtle"
						colorPalette="accent"
						borderRadius="full"
						size="lg"
						aspectRatio="1"
					>
						{icon}
					</Badge>
				</Box>
				<Card.Title as="h3">{title}</Card.Title>
				<Card.Description>{children}</Card.Description>
			</Card.Body>
		</Card.Root>
	)
}

export function FeaturesSection() {
	return (
		<SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 10, lg: 20 }}>
			{FEATURES_DESCRIPTIONS.map(({ title, icon, children }) => (
				<FeatureItem key={title} icon={icon} title={title}>
					{children}
				</FeatureItem>
			))}
		</SimpleGrid>
	)
}
