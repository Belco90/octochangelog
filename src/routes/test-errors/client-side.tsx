import * as Sentry from '@sentry/tanstackstart-react'
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
					Sentry.metrics.count('test_counter', 1)
					throw new Error('BOOOOM: Client error')
				}}
			>
				Click me{' '}
				<span role="img" aria-label="bomb">
					💣
				</span>
			</button>
		</div>
	)
}
