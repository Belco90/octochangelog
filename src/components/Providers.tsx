import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import customTheme from '@/custom-theme'
import { queryClient } from '@/query-client'

import type { ReactNode } from 'react'

type ProvidersProps = { children: ReactNode }

export function Providers({ children }: ProvidersProps) {
	return (
		<ChakraProvider theme={customTheme}>
			<QueryClientProvider client={queryClient}>
				{children}
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</ChakraProvider>
	)
}
