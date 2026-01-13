import {
	Outlet,
	createRootRoute,
	HeadContent,
	Scripts,
} from '@tanstack/react-router'

import customTheme from '@/custom-theme'
import { seo } from '@/seo'

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
		links: [],
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
				<Outlet />
				<Scripts />
			</body>
		</html>
	)
}
