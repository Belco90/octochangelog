import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
	Outlet,
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from '@tanstack/react-router'

import { MainLayout } from '@/components/MainLayout'
import { ChakraThemeProvider } from '@/components/snippets/theme-provider'
import type { PropsWithRequiredChildren } from '@/models'
import { seo } from '@/seo'
import appCss from '@/styles/app.css?url'
import { system } from '@/theme'

import type { QueryClient } from '@tanstack/react-query'

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
	{
		head: ({ match }) => {
			const customTitle = match.globalNotFound ? '404 Not Found' : undefined
			return {
				meta: [
					{ charSet: 'utf-8' },
					{
						name: 'viewport',
						content: 'width=device-width, initial-scale=1',
					},
					{
						name: 'color-scheme',
						content: 'light dark',
					},
					{
						name: 'theme-color',
						content: system.token('colors.brand.200', '#F5D0FE') as string,
						media: '(prefers-color-scheme: light)',
					},
					{
						name: 'theme-color',
						content: system.token('colors.brand.950', '#701A75') as string,
						media: '(prefers-color-scheme: dark)',
					},
					...seo({ title: customTitle }),
				],
				links: [
					{ rel: 'stylesheet', href: appCss },
					{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
					{
						rel: 'apple-touch-icon',
						sizes: '180x180',
						href: '/apple-touch-icon.png',
					},
					{
						rel: 'icon',
						type: 'image/png',
						sizes: '32x32',
						href: '/favicon-32x32.png',
					},
					{
						rel: 'icon',
						type: 'image/png',
						sizes: '16x16',
						href: '/favicon-16x16.png',
					},
					{ rel: 'manifest', href: '/manifest.json' },
					{
						rel: 'preload',
						href: '/fonts/inter.woff2',
						as: 'font',
						type: 'font/woff2',
						crossOrigin: '',
					},
				],
				scripts: [
					{
						defer: true,
						src: 'https://api.pirsch.io/pa.js',
						id: 'pianjs',
						'data-code': import.meta.env.VITE_PIRSCH_ID_CODE,
					},
				],
			}
		},
		component: () => (
			<DocumentWrapper>
				<Outlet />
			</DocumentWrapper>
		),
	},
)

function DocumentWrapper({ children }: PropsWithRequiredChildren) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<div data-happo-hide>
					<ReactQueryDevtools buttonPosition="bottom-left" />
				</div>

				<ChakraThemeProvider>
					<MainLayout>{children}</MainLayout>
				</ChakraThemeProvider>

				<Scripts />
			</body>
		</html>
	)
}
