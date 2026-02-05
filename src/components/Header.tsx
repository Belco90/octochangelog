import { Box, Flex, Text, HStack, Icon, IconButton } from '@chakra-ui/react'
import { DiGithubBadge } from 'react-icons/di'

import { REPO_URL } from '@/common'
import { Link } from '@/components/Link'
import { OptimizedImage } from '@/components/OptimizedImage'
import { RouteLink } from '@/components/RouteLink'
import { ColorModeButton } from '@/components/snippets/color-mode'
import mascotLogo from '@/images/mascot-logo.png'

import type { BoxProps } from '@chakra-ui/react'

const LOGO_SIZES = { base: 8, md: 10 }

export const Header = (props: BoxProps) => {
	return (
		<Box
			{...props}
			as="header"
			borderBottomWidth={1}
			borderColor="brand.emphasized"
		>
			<Box px={2} py={1}>
				<Flex justify="space-between" alignItems="center">
					<Flex align="center">
						<RouteLink
							to="/"
							textDecorationThickness={4}
							textDecorationColor="brand.solid"
						>
							<HStack gap={{ base: 1, lg: 2 }}>
								<Box boxSize={LOGO_SIZES}>
									<OptimizedImage
										src={mascotLogo}
										alt=""
										height={50}
										width={50}
										priority
									/>
								</Box>
								<Text
									as="span"
									letterSpacing="tight"
									fontWeight="black"
									fontSize={{ base: 20, md: 28 }}
								>
									Octochangelog
								</Text>
							</HStack>
						</RouteLink>
					</Flex>

					<HStack gap={{ base: 1, md: 4 }}>
						<IconButton asChild variant="ghost" rounded="full">
							<Link
								href={REPO_URL}
								aria-label="Check repo on GitHub"
								isExternal
							>
								<Icon boxSize={LOGO_SIZES}>
									<DiGithubBadge />
								</Icon>
							</Link>
						</IconButton>
						<ColorModeButton rounded="full" boxSize={LOGO_SIZES} />
					</HStack>
				</Flex>
			</Box>
		</Box>
	)
}
