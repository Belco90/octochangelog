import { Link as ChakraLink } from '@chakra-ui/react'
import { Link as TanStackLink } from '@tanstack/react-router'

import type { LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import type { LinkProps as TanStackLinkProps } from '@tanstack/react-router'

type RouteLinkProps = Omit<ChakraLinkProps, 'href' | 'as'> & TanStackLinkProps

export function RouteLink({ children, to, ...remainingProps }: RouteLinkProps) {
	return (
		<ChakraLink as={TanStackLink} href={to} {...remainingProps}>
			{children}
		</ChakraLink>
	)
}
