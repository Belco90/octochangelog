import { Text } from '@chakra-ui/react'

import type { BoxProps } from '@chakra-ui/react'

export const BlockQuote = (props: BoxProps) => (
	<Text
		as="blockquote"
		px={4}
		borderLeftWidth={4}
		borderLeftColor="coolGray.200"
		color="tertiaryText"
		{...props}
	/>
)
