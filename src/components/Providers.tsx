import {
	ColorModeScript,
	ChakraProvider as ChakraProviderV2,
} from '@chakra-ui/react-v2'

import { customTheme } from '@/deprecated-theme'
import type { PropsWithRequiredChildren } from '@/models'

// V2 Providers (deprecated)
export function DeprecatedThemeProvider({
	children,
}: PropsWithRequiredChildren) {
	return <ChakraProviderV2 theme={customTheme}>{children}</ChakraProviderV2>
}

export function DeprecatedProviders({ children }: PropsWithRequiredChildren) {
	return (
		<>
			<ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
			<DeprecatedThemeProvider>{children}</DeprecatedThemeProvider>
		</>
	)
}
