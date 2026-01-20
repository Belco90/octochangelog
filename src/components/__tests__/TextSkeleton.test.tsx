import { expect, it } from 'vitest'

import { TextSkeleton } from '../TextSkeleton'
import { render } from './test-utils'

it('should render multiple skeleton lines', async () => {
	const screen = await render(<TextSkeleton />)

	// TextSkeleton renders 4 Skeleton components
	// Query by Chakra's skeleton class or data attributes
	const skeletons = screen.container.querySelectorAll('[class*="skeleton"]')

	// Should have multiple skeleton lines (at least 4)
	expect(skeletons.length).toBeGreaterThanOrEqual(4)
})

it('should render with correct structure', async () => {
	const screen = await render(<TextSkeleton />)

	// Should be wrapped in a Stack component
	const stack = screen.container.querySelector('[class*="stack"]')

	expect(stack).toBeTruthy()
})

it('should use Chakra UI Skeleton component', async () => {
	const screen = await render(<TextSkeleton />)

	// Chakra Skeleton components should have specific data attributes or classes
	const skeletons = screen.container.querySelectorAll('[class*="chakra"]')

	expect(skeletons.length).toBeGreaterThan(0)
})
