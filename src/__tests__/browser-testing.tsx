import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
// eslint-disable-next-line no-restricted-imports
import { render as vitestRender } from 'vitest-browser-react'

import { customTheme } from '@/custom-theme'

import type { ReactElement } from 'react'

/**
 * Custom render function that wraps components with necessary providers
 * (ChakraProvider with custom theme)
 *
 * This ensures all Chakra UI components work correctly in tests with
 * the same theme configuration used in the application.
 *
 * @example
 * ```tsx
 * import { render, userEvent } from './test-utils'
 * import { expect, vi } from 'vitest'
 * import { MyButton } from '../MyButton'
 *
 * it('should render button', async () => {
 *   const screen = await render(<MyButton>Click me</MyButton>)
 *   const button = screen.getByRole('button', { name: /click me/i })
 *   await expect.element(button).toBeVisible()
 * })
 * ```
 */
export async function render(ui: ReactElement) {
	return vitestRender(
		<ChakraProvider theme={customTheme}>
			<ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
			{ui}
		</ChakraProvider>,
	)
}

// Re-export browser-specific utilities
export { userEvent } from 'vitest/browser'
