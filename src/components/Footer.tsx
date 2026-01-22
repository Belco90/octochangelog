import { Box, Center, VStack, Text } from '@chakra-ui/react'
import { Image } from '@unpic/react'

import { Link } from '@/components/Link'

export function Footer() {
	return (
		<Box
			as="footer"
			bgColor="bg.subtle"
			pb={{ base: 4, lg: 6 }}
			borderTop="solid 1px"
			borderTopColor="border.muted"
		>
			<Center py={{ base: 1, lg: 4 }} px={{ base: 4, lg: 5 }}>
				<VStack gap={4} alignItems="center">
					<Text
						fontSize={{ base: 'lg', md: '2xl' }}
						fontWeight="black"
						textAlign="center"
					>
						Created with love <br />
						by{' '}
						<Link
							href="https://mario.dev/"
							title="Mario's website"
							colorPalette="brand"
							isExternal
						>
							Mario
						</Link>{' '}
						&{' '}
						<Link
							href="https://github.com/HonkingGoose"
							title="HonkingGoose's GitHub profile"
							colorPalette="brand"
							isExternal
						>
							HonkingGoose
						</Link>
					</Text>
					<Link
						href="https://www.netlify.com?utm_source=octochangelog&utm_campaign=oss"
						isExternal
					>
						<Image
							src="https://www.netlify.com/assets/badges/netlify-badge-color-bg.svg"
							alt="Built with Netlify"
							width={114}
							height={50}
							loading="lazy"
						/>
					</Link>
				</VStack>
			</Center>
		</Box>
	)
}
