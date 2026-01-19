import { ChakraProvider } from '@chakra-ui/react'

import { customTheme } from '@/custom-theme'
import type { PropsWithRequiredChildren } from '@/models'

export function ThemeProvider({ children }: PropsWithRequiredChildren) {
	return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
}

export function AllProviders({ children }: PropsWithRequiredChildren) {
	return <ThemeProvider>{children}</ThemeProvider>
}
