'use client'

import { Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'

// TODO: fix this
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ChakraNextLink(props: any) {
	return (
		<ChakraLink asChild>
			<NextLink {...props} />
		</ChakraLink>
	)
}
