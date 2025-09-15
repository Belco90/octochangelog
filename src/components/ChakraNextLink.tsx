'use client'

import NextLink from 'next/link'

import { Link } from '@/components/Link'

import type { LinkProps as NextLinkProps } from 'next/link'

// TODO: fix this
export default function ChakraNextLink(props: NextLinkProps<unknown>) {
	return (
		<Link asChild>
			<NextLink {...props} />
		</Link>
	)
}
