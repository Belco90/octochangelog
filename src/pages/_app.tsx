import { ChakraProvider } from '@chakra-ui/react'
import { resetIdCounter } from 'downshift'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import 'focus-visible/dist/focus-visible'

import { GithubAuthProvider } from '~/contexts/github-auth-provider'
import customTheme from '~/customTheme'
import DefaultSEO from '~/next-seo.config'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5min
    },
  },
})

const App = ({ Component, pageProps }: AppProps) => {
  resetIdCounter()

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={customTheme}>
        <GithubAuthProvider>
          <DefaultSeo {...DefaultSEO} />
          <Component {...pageProps} />
        </GithubAuthProvider>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
