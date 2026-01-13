import {
	Outlet,
	createRootRoute,
	HeadContent,
	Scripts,
} from '@tanstack/react-router'

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
			{ title: 'TanStack Start Starter' },
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
