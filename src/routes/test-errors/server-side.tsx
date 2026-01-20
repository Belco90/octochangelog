import { createFileRoute } from '@tanstack/react-router'
import { createServerOnlyFn } from '@tanstack/react-start'

import { RouteLink } from '@/components/RouteLink'

const testServerFn = createServerOnlyFn(() => {
	throw new Error('BOOOOM: Server error')
})

export const Route = createFileRoute('/test-errors/server-side')({
	beforeLoad: testServerFn,
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div>
			<RouteLink to="/test-errors/server-side">Server error</RouteLink>
			<div>Hello "/test-errors/server-side"!</div>
		</div>
	)
}
