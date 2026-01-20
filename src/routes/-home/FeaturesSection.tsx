import {
	Box,
	Flex,
	Heading,
	Icon,
	SimpleGrid,
	useColorModeValue,
} from '@chakra-ui/react'
import {
	HiOutlineFilter,
	HiOutlineFire,
	HiOutlineShare,
	HiOutlineSwitchHorizontal,
	HiOutlineTag,
} from 'react-icons/hi'

import type { PropsWithRequiredChildren } from '@/models'

import type { IconType } from 'react-icons'

type FeatureItemProps = PropsWithRequiredChildren<{
	icon: IconType
	title: string
}>

const FEATURES_DESCRIPTIONS: Array<FeatureItemProps> = [
	{
		icon: HiOutlineSwitchHorizontal,
		title: 'Compare releases easily',
		children: (
			<Box as="p">
				Sifting through changelogs on GitHub taking too much time?
				<br />
				Let Octochangelog put the list of changes in a single view!
			</Box>
		),
	},
	{
		icon: HiOutlineShare,
		title: 'Share changelogs',
		children: (
			<Box as="p">
				Want to let your team review the changes in a dependency?
				<br />
				Give them a link!
			</Box>
		),
	},
	{
		icon: HiOutlineFire,
		title: "Don't miss breaking changes",
		children: (
			<Box as="p">
				Octochangelog finds all breaking changes, and lists them at the top.
				<br />
				You can’t miss those pesky gotcha’s now!
			</Box>
		),
	},
	{
		icon: HiOutlineFilter,
		title: 'No manual sorting',
		children: (
			<Box as="p">
				Want a list of major, minor and patch level changes?
				<br />
				Octochangelog groups changes into categories for you!
			</Box>
		),
	},
	{
		icon: HiOutlineTag,
		title: 'Changes per version',
		children: (
			<Box as="p">
				Want to know which version introduced a certain change?
				<br />
				Octochangelog labels each change with the version number.
			</Box>
		),
	},
]

function FeatureItem({ icon, title, children }: FeatureItemProps) {
	const iconColor = useColorModeValue('secondary.700', 'secondary.200')
	const iconBgColor = useColorModeValue('secondary.200', 'secondary.800')
	return (
		<Flex direction="column" gap={2}>
			<Flex
				boxSize={10}
				bgColor={iconBgColor}
				borderRadius="full"
				alignItems="center"
				justifyContent="center"
			>
				<Icon as={icon} boxSize="18px" color={iconColor} />
			</Flex>
			<Heading as="h3" color="primaryText" fontSize="2xl">
				{title}
			</Heading>
			<Box
				fontSize="md"
				width={{ base: 'full', lg: '70%' }}
				color="secondaryText"
			>
				{children}
			</Box>
		</Flex>
	)
}

export function FeaturesSection() {
	return (
		<SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 10, md: 32 }}>
			{FEATURES_DESCRIPTIONS.map(({ title, icon, children }) => (
				<FeatureItem key={title} icon={icon} title={title}>
					{children}
				</FeatureItem>
			))}
		</SimpleGrid>
	)
}
