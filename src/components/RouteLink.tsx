import { Link as ChakraLink } from '@chakra-ui/react'
import { createLink } from '@tanstack/react-router'

import type { LinkComponent } from '@tanstack/react-router'
import type { ComponentPropsWithoutRef, RefObject } from 'react'

type CustomChakraLinkProps = Omit<
	ComponentPropsWithoutRef<typeof ChakraLink>,
	'href' | 'as'
>

const ChakraLinkComponent = ({
	ref,
	...props
}: CustomChakraLinkProps & { ref?: RefObject<HTMLAnchorElement | null> }) => {
	return <ChakraLink ref={ref} {...props} />
}

const CreatedLinkComponent = createLink(ChakraLinkComponent)

/**
 * This component takes the same properties as the Chakra UI Link component,
 * enabling seamless integration with Chakra's styling.
 *
 * This is the recommended way of creating custom links with TanStack Router:
 * https://tanstack.com/router/latest/docs/framework/react/guide/custom-link#chakra-ui-example*
 */
export const RouteLink: LinkComponent<typeof ChakraLinkComponent> = (props) => {
	return <CreatedLinkComponent {...props} />
}
