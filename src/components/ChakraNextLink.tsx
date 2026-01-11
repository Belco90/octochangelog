'use client'

import { Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'

import type { LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import type { UrlObject } from 'url'

// Define Next.js Link props that we want to support
interface NextLinkSpecificProps {
	href: string | UrlObject
	replace?: boolean
	scroll?: boolean
	prefetch?: boolean | null
}

// Combine props: Chakra props + Next.js specific props, excluding href from Chakra to avoid conflicts
type CombinedLinkProps = Omit<ChakraLinkProps, 'href'> & NextLinkSpecificProps

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
			href={href as string}
			replace={replace}
			scroll={scroll}
			prefetch={prefetch}
			{...chakraProps}
		/>
	)
}
