import { Box, Container, Link, Stack, Text } from '@chakra-ui/react'
import Image from 'next/image'

const Footer = () => {
	return (
		<Box
			as="footer"
			bgColor="background2"
			pb={{ base: 8, lg: 12 }}
			borderTop="solid 1px"
			borderTopColor="monochromeInverted3"
		>
			<Container
				centerContent
				maxWidth="full"
				py={{ base: 1, lg: 4 }}
				px={{ base: 4, lg: 5 }}
			>
				<Stack
					direction={{ base: 'column', md: 'row' }}
					spacing={4}
					alignItems="center"
					justifyContent="center"
					width="full"
				>
					<Text
						color="primaryText"
						fontSize={{ base: 'lg', md: '2xl' }}
						fontWeight="black"
						textAlign="center"
					>
						Created with love <br /> by{' '}
						<Link isExternal href="https://mario.dev/" title="Mario's website">
							Mario
						</Link>{' '}
						&{' '}
						<Link
							isExternal
							href="https://github.com/HonkingGoose"
							title="HonkingGoose's GitHub profile"
						>
							HonkingGoose
						</Link>
					</Text>
					<Link
						isExternal
						href="https://www.netlify.com"
						title="Deploys by Netlify"
					>
						<Image
							src="https://www.netlify.com/assets/badges/netlify-badge-color-bg.svg"
							alt="Deploys by Netlify"
							width={114}
							height={51}
						/>
					</Link>
				</Stack>
			</Container>
		</Box>
	)
}

export default Footer
