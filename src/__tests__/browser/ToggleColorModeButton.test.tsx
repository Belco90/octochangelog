import { expect, it } from 'vitest'

import { ToggleColorModeButton } from '@/components/ToggleColorModeButton'

import { render } from './test-utils'

it('should render with correct ARIA attributes', async () => {
	const screen = await render(<ToggleColorModeButton />)

	const button = screen.getByRole('button', { name: /dark theme/i })

	await expect.element(button).toBeVisible()
	await expect.element(button).toHaveAttribute('aria-pressed')
})

it('should toggle aria-pressed when clicked', async () => {
	const screen = await render(<ToggleColorModeButton />)

	const button = screen.getByRole('button', { name: /dark theme/i })

	// Get initial aria-pressed state
	const buttonElement = button.element()
	const initialPressed = buttonElement.getAttribute('aria-pressed')

	// Click the button
	await button.click()

	// Wait a bit for state to update
	await new Promise((resolve) => setTimeout(resolve, 100))

	// aria-pressed should have changed
	const afterPressed = buttonElement.getAttribute('aria-pressed')

	expect(initialPressed).not.toBe(afterPressed)
})

it('should accept additional props', async () => {
	const screen = await render(
		<ToggleColorModeButton size="lg" data-testid="custom-toggle" />,
	)

	const button = screen.getByTestId('custom-toggle')

	await expect.element(button).toBeVisible()
	await expect.element(button).toHaveAttribute('data-testid', 'custom-toggle')
})
