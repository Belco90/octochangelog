'use client'

import { Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'

import type { LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import type { ComponentProps } from 'react'

// Extract Next.js Link props from the component
type NextLinkProps = ComponentProps<typeof NextLink>

// Pick only the routing-related props we want to expose
type NextLinkSpecificProps = Pick<
	NextLinkProps,
	'href' | 'replace' | 'scroll' | 'prefetch'
>

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
