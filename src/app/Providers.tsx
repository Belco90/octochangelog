'use client'

import { QueryClientProvider } from '@tanstack/react-query'

import { Provider as ThemeProvider } from '@/components/snippets/provider'
import { queryClient } from '@/query-client'

import type { FC, ReactNode } from 'react'

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</ThemeProvider>
	)
}

export default Providers
