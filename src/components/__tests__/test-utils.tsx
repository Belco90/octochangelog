import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
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
 * import { render, page, expect } from './test-utils'
 * import { MyButton } from '../MyButton'
 *
 * test('renders button', async () => {
 *   render(<MyButton>Click me</MyButton>)
 *   const button = page.getByRole('button', { name: /click me/i })
 *   await expect.element(button).toBeInTheDocument()
 * })
 * ```
 */
export function render(ui: ReactElement) {
	return vitestRender(
		<ChakraProvider theme={customTheme}>
			<ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
			{ui}
		</ChakraProvider>,
	)
}

// Re-export commonly used utilities from Vitest browser mode
export { page, userEvent } from 'vitest/browser'
export { expect, vi } from 'vitest'
