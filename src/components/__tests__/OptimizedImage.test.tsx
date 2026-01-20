import { expect, it } from 'vitest'

import { OptimizedImage } from '../OptimizedImage'
import { render } from './test-utils'

it('should render with required props', async () => {
	const screen = await render(
		<OptimizedImage
			src="/test-image.jpg"
			alt="Test image"
			width={400}
			height={300}
		/>,
	)

	const img = screen.getByRole('img', { name: /test image/i })

	await expect.element(img).toBeVisible()
})

it('should apply alt text correctly', async () => {
	const screen = await render(
		<OptimizedImage
			src="/test.jpg"
			alt="A beautiful landscape"
			width={800}
			height={600}
		/>,
	)

	const img = screen.getByRole('img', { name: /a beautiful landscape/i })

	await expect.element(img).toBeVisible()

	const imgElement = img.element()

	expect(imgElement.getAttribute('alt')).toBe('A beautiful landscape')
})

it('should render with custom operations', async () => {
	const screen = await render(
		<OptimizedImage
			src="/custom.jpg"
			alt="Custom optimized"
			width={500}
			height={500}
			operations={{ q: 90, fm: 'jpg' }}
		/>,
	)

	const img = screen.getByRole('img', { name: /custom optimized/i })

	await expect.element(img).toBeVisible()
})

it('should handle priority prop', async () => {
	const screen = await render(
		<OptimizedImage
			src="/priority.jpg"
			alt="Priority image"
			width={1200}
			height={800}
			priority
		/>,
	)

	const img = screen.getByRole('img', { name: /priority image/i })

	await expect.element(img).toBeVisible()
})

it('should pass through additional props', async () => {
	const screen = await render(
		<OptimizedImage
			src="/styled.jpg"
			alt="Styled image"
			width={300}
			height={200}
			data-testid="styled-image"
			className="custom-class"
		/>,
	)

	const img = screen.getByTestId('styled-image')

	await expect.element(img).toBeVisible()
	await expect.element(img).toHaveAttribute('data-testid', 'styled-image')
})
