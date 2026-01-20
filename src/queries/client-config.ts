import type { QueryClientConfig } from '@tanstack/react-query'

export const defaultQueryClientConfig: Readonly<QueryClientConfig> = {
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 1,
			staleTime: 5 * 60 * 1000, // 5min
		},
	},
}
