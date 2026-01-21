import { Text } from '@chakra-ui/react-v2'

import type { BoxProps } from '@chakra-ui/react-v2'

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
