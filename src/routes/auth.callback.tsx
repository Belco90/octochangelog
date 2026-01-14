import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/callback')({
	component: AuthCallbackPage,
})

function AuthCallbackPage() {
	return <div>TODO</div>
}
