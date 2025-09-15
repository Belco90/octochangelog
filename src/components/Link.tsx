// eslint-disable-next-line no-restricted-imports
import { Link as ChakraLink } from '@chakra-ui/react'

import type { LinkProps as ChakraLinkProps } from '@chakra-ui/react'

export type LinkProps = ChakraLinkProps & {
	isExternal?: boolean
}

const externalLinkProps = { target: '_blank', rel: 'noopener noreferrer' }

export function Link(props: LinkProps) {
	const { isExternal, ...rest } = props
	return (
		<ChakraLink
			{...(isExternal && externalLinkProps)}
			{...rest}
			colorPalette="primary"
			color={{ base: 'primary.700', _dark: 'primary.400' }}
			_hover={{ textDecoration: 'underline' }}
		/>
	)
}
