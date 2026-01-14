import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import customTheme from '@/custom-theme'
import { queryClient } from '@/query-client'

import type { ReactNode } from 'react'

type ProviderComponentProps = { children: ReactNode }

export function ThemeProvider({ children }: ProviderComponentProps) {
	return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
}

export function QueryProvider({ children }: ProviderComponentProps) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
