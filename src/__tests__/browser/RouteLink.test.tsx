import { expect, it, vi } from 'vitest'

// Mock TanStack Router's createLink - MUST be before other imports
vi.mock('@tanstack/react-router', () => ({
	createLink: vi.fn((Component: unknown) => Component),
}))

import { RouteLink } from '@/components/RouteLink'

import { render } from '../browser-testing'

it('should render children correctly', async () => {
	const screen = await render(<RouteLink to="/">Home</RouteLink>)

	const link = screen.getByText('Home')

	await expect.element(link).toBeVisible()
	await expect.element(link).toHaveTextContent('Home')
})

it('should render as an anchor element', async () => {
	const screen = await render(<RouteLink to="/compare">Compare</RouteLink>)

	const link = screen.getByText('Compare')

	await expect.element(link).toBeVisible()

	const linkElement = link.element()

	expect(linkElement.tagName.toLowerCase()).toBe('a')
})

it('should pass through data attributes', async () => {
	const screen = await render(
		<RouteLink to="/compare" data-testid="compare-link">
			Compare
		</RouteLink>,
	)

	const link = screen.getByTestId('compare-link')

	await expect.element(link).toBeVisible()
	await expect.element(link).toHaveTextContent('Compare')
})

it('should render complex children', async () => {
	const screen = await render(
		<RouteLink to="/">
			<span>User Profile</span>
		</RouteLink>,
	)

	// The text should be visible
	const text = screen.getByText('User Profile')

	await expect.element(text).toBeVisible()

	// Get the parent link element
	const textElement = text.element()
	const linkElement = textElement.closest('a')

	expect(linkElement).toBeTruthy()
	expect(linkElement?.textContent).toBe('User Profile')
})
