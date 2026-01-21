import { ChakraProvider } from '@chakra-ui/react'
import { ChakraProvider as ChakraProviderV2 } from '@chakra-ui/react-v2'

import { customTheme } from '@/deprecated-theme'
import type { PropsWithRequiredChildren } from '@/models'
import { system } from '@/theme'

// V2 Providers (deprecated)
export function DeprecatedThemeProvider({
	children,
}: PropsWithRequiredChildren) {
	return <ChakraProviderV2 theme={customTheme}>{children}</ChakraProviderV2>
}

export function DeprecatedProviders({ children }: PropsWithRequiredChildren) {
	return <DeprecatedThemeProvider>{children}</DeprecatedThemeProvider>
}

// V3 Provider
export function ThemeProvider({ children }: PropsWithRequiredChildren) {
	return <ChakraProvider value={system}>{children}</ChakraProvider>
}
