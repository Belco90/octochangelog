'use client'

import NextLink from 'next/link'

import { Link } from '@/components/Link'

import type { LinkProps as NextLinkProps } from 'next/link'

export default function ChakraNextLink(props: NextLinkProps<unknown>) {
	return (
		<Link asChild>
			<NextLink {...props} />
		</Link>
	)
}
