import { Blockquote as ChakraBlockquote } from '@chakra-ui/react'

import type { BlockquoteRootProps } from '@chakra-ui/react'
import type { Ref, ReactNode } from 'react'

export interface SimpleBlockquoteProps extends BlockquoteRootProps {
	cite?: ReactNode
	ref?: Ref<HTMLDivElement>
}

export function SimpleBlockquote(props: SimpleBlockquoteProps) {
	const { children, cite, ref, ...rest } = props

	return (
		<ChakraBlockquote.Root ref={ref} px="4" borderInlineWidth="[4px]" {...rest}>
			<ChakraBlockquote.Content>{children}</ChakraBlockquote.Content>
			{!!cite && (
				<ChakraBlockquote.Caption>
					<cite>{cite}</cite>
				</ChakraBlockquote.Caption>
			)}
		</ChakraBlockquote.Root>
	)
}
