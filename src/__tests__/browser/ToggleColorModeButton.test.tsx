import { expect, it } from 'vitest'

import { ToggleColorModeButton } from '@/components/ToggleColorModeButton'

import { render } from '../browser-testing'

it('should toggle dark mode when clicked', async () => {
	const screen = await render(<ToggleColorModeButton />)

	const button = screen.getByRole('button', { name: /dark theme/i })

	await expect.element(button).toBeVisible()
	await expect.element(button).toHaveAttribute('aria-pressed', 'false')

	await button.click()

	await expect.element(button).toHaveAttribute('aria-pressed', 'true')

	await button.click()

	await expect.element(button).toHaveAttribute('aria-pressed', 'false')
})
