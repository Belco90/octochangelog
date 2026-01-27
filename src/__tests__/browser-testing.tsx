import { RouterContextProvider } from '@tanstack/react-router'
// eslint-disable-next-line no-restricted-imports
import { render as vitestRender } from 'vitest-browser-react'

import { fakeRouter } from '@/__tests__/fake-router'
import { ChakraThemeProvider } from '@/components/snippets/theme-provider'

import type { ReactElement } from 'react'
import type { ComponentRenderOptions } from 'vitest-browser-react'

/**
 * Custom render function that wraps components with necessary providers:
 * - RouterContextProvider with minimal router
 * - ChakraProvider with custom theme
 *
 * @example
 * ```tsx
 * import { expect, vi } from 'vitest'
 * import { render } from '../browser-testing'
 * import { MyButton } from '../MyButton'
 *
 * it('should render button', async () => {
 *   const screen = await render(<MyButton>Click me</MyButton>)
 *   const button = screen.getByRole('button', { name: /click me/i })
 *   await expect.element(button).toBeVisible()
 *   await button.click()
 *   // ...
 * })
 * ```
 */
export async function render(
	ui: ReactElement,
	options?: ComponentRenderOptions,
) {
	return vitestRender(
		<RouterContextProvider router={fakeRouter}>
			<ChakraThemeProvider>{ui}</ChakraThemeProvider>
		</RouterContextProvider>,
		options,
	)
}
