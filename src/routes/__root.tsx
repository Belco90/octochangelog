import { ColorModeScript } from '@chakra-ui/react'
import interWoff2 from '@fontsource-variable/inter/files/inter-latin-standard-normal.woff2?url'
import {
	Outlet,
	createRootRoute,
	HeadContent,
	Scripts,
} from '@tanstack/react-router'

import { MainLayout } from '@/components/MainLayout'
import { Providers } from '@/components/Providers'
import customTheme from '@/custom-theme'
import { seo } from '@/seo'
import '@/fonts'

export const Route = createRootRoute({
	head: () => ({
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
				content: customTheme.colors.primary['50'],
				media: '(prefers-color-scheme: light)',
			},
			{
				name: 'theme-color',
				content: customTheme.colors.primary['900'],
				media: '(prefers-color-scheme: dark)',
			},
			...seo(),
		],
		links: [
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
				href: interWoff2,
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
	}),
	component: RootLayout,
})

function RootLayout() {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<ColorModeScript
					initialColorMode={customTheme.config.initialColorMode}
				/>
				<Providers>
					<MainLayout>
						<Outlet />
					</MainLayout>
				</Providers>
				<Scripts />
			</body>
		</html>
	)
}
