import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import customTheme from '@/custom-theme'
import type { PropsWithRequiredChildren } from '@/models'
import { queryClient } from '@/query-client'

export function ThemeProvider({ children }: PropsWithRequiredChildren) {
	return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
}

export function QueryProvider({ children }: PropsWithRequiredChildren) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

export function AllProviders({ children }: PropsWithRequiredChildren) {
	return (
		<ThemeProvider>
			<QueryProvider>{children}</QueryProvider>
		</ThemeProvider>
	)
}
