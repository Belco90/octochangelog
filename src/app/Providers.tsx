'use client'

import { QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider } from '@/components/ThemeProvider'
import { queryClient } from '@/query-client'

import type { FC, ReactNode } from 'react'

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<ThemeProvider enableColorScheme enableSystem>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</ThemeProvider>
	)
}

export default Providers
