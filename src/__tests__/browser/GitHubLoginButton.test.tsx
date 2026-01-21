import { beforeEach, expect, it, vi } from 'vitest'

import { GitHubLoginButton } from '@/components/GitHubLoginButton'

import { render } from '../browser-testing'

const { useSearchMock, getGitHubAuthUrlMock } = vi.hoisted(() => ({
	useSearchMock: vi.fn<() => { repo: string; from?: string; to?: string }>(
		() => ({
			repo: 'test/repo',
			from: 'v1.0.0',
			to: 'v2.0.0',
		}),
	),
	getGitHubAuthUrlMock: vi.fn(() => {
		// Return a javascript: URL to prevent navigation
		// This is a no-op URL that won't cause page navigation
		return new URL('javascript:void(0)')
	}),
}))

// @ts-expect-error Ignoring for testing purposes
vi.mock(import('@tanstack/react-router'), async (importOriginal) => {
	const mod = await importOriginal()
	return {
		...mod,
		useSearch: useSearchMock,
	}
})

vi.mock('@tanstack/react-start', () => ({
	createClientOnlyFn: (fn: () => unknown) => fn,
	createServerOnlyFn: (fn: () => unknown) => fn,
}))

vi.mock('@/github-auth', () => ({
	getGitHubAuthUrl: getGitHubAuthUrlMock,
}))

beforeEach(() => {
	// Clear sessionStorage before each test
	sessionStorage.clear()
})

it('should render with default text', async () => {
	const screen = await render(<GitHubLoginButton />)

	const button = screen.getByRole('button', { name: /login with github/i })

	await expect.element(button).toBeVisible()
})

it('should render with custom children', async () => {
	const screen = await render(
		<GitHubLoginButton>Sign in to continue</GitHubLoginButton>,
	)

	const button = screen.getByRole('button', { name: /sign in to continue/i })

	await expect.element(button).toBeVisible()
})

it('should save full repo params in the session on click', async () => {
	const screen = await render(<GitHubLoginButton />)

	expect(sessionStorage.getItem('auth-redirect-search-params')).toBeNull()

	await screen.getByRole('button', { name: /login with github/i }).click()

	expect(sessionStorage.getItem('auth-redirect-search-params')).toBe(
		'repo=test%2Frepo&from=v1.0.0&to=v2.0.0',
	)

	// Verify getGitHubAuthUrl was called with window origin
	expect(getGitHubAuthUrlMock).toHaveBeenCalledWith({
		redirectUrl: window.location.origin,
	})
})

it('should save partial repo params in the session on click', async () => {
	useSearchMock.mockReturnValue({ repo: 'owner/name' })

	const screen = await render(<GitHubLoginButton />)

	expect(sessionStorage.getItem('auth-redirect-search-params')).toBeNull()

	await screen.getByRole('button', { name: /login with github/i }).click()

	expect(sessionStorage.getItem('auth-redirect-search-params')).toBe(
		'repo=owner%2Fname',
	)

	// Verify getGitHubAuthUrl was called with window origin
	expect(getGitHubAuthUrlMock).toHaveBeenCalledWith({
		redirectUrl: window.location.origin,
	})
})
