import { createFileRoute } from '@tanstack/react-router'

import { RouteLink } from '@/components/RouteLink'

export const Route = createFileRoute('/test-errors/client-side')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div>
			<RouteLink to="/test-errors/server-side">Server error</RouteLink>
			<div>Hello "/test-errors/client-side"!</div>
			<button
				type="button"
				onClick={() => {
					throw new Error('BOOOOM: Client error')
				}}
			>
				Click me 💣
			</button>
		</div>
	)
}
