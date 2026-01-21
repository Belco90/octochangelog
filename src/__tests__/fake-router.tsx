import {
	createRootRoute,
	createRoute,
	createRouter,
	Outlet,
} from '@tanstack/react-router'

const rootRoute = createRootRoute({
	component: () => <Outlet />,
})

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: () => <div>Home page</div>,
})

const anotherRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/another',
	component: () => <div>Another page</div>,
})

const routeTree = rootRoute.addChildren([indexRoute, anotherRoute])

/**
 * Minimal router for testing purposes.
 */
export const fakeRouter = createRouter({
	routeTree,
})
