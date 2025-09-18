'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import customTheme from '@/custom-theme'
import { queryClient } from '@/query-client'

import type { FC, ReactNode } from 'react'

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<CacheProvider>
			<ChakraProvider theme={customTheme}>
				<QueryClientProvider client={queryClient}>
					{children}
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</ChakraProvider>
		</CacheProvider>
	)
}

export default Providers
