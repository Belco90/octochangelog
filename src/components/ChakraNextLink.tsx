'use client'

import { Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'

import type { LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import type { ComponentProps } from 'react'

// Extract props from Next Link component
type NextLinkProps = ComponentProps<typeof NextLink>

// Combine props from both Chakra Link and Next Link
type CombinedLinkProps = ChakraLinkProps & NextLinkProps

export function Link({
	href,
	replace,
	scroll,
	prefetch,
	...chakraProps
}: CombinedLinkProps) {
	return (
		<ChakraLink
			as={NextLink}
			href={href}
			replace={replace}
			scroll={scroll}
			prefetch={prefetch}
			{...chakraProps}
		/>
	)
}
