import { expect, it } from 'vitest'

import { RouteLink } from '@/components/RouteLink'

import { render } from '../browser-testing'

it('should render a valid anchor', async () => {
	const screen = await render(<RouteLink to="/">Home</RouteLink>)

	const link = screen.getByRole('link', { name: 'Home' })

	await expect.element(link).toBeVisible()
	await expect.element(link).toHaveAttribute('href', '/')
	await expect.element(link).not.toHaveAttribute('to')
})
