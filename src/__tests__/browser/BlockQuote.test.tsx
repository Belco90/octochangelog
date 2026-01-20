import { expect, it } from 'vitest'

import { BlockQuote } from '@/components/BlockQuote'

import { render } from './test-utils'

it('should render children correctly', async () => {
	const screen = await render(<BlockQuote>This is a quote</BlockQuote>)

	const quote = screen.getByText('This is a quote')

	await expect.element(quote).toBeVisible()
})

it('should render as blockquote element semantically', async () => {
	const screen = await render(<BlockQuote>Quote content</BlockQuote>)

	// The component uses Text with as="blockquote"
	const quote = screen.getByText('Quote content')

	await expect.element(quote).toBeVisible()

	const quoteElement = quote.element()

	expect(quoteElement.tagName.toLowerCase()).toBe('blockquote')
})

it('should accept custom data attributes', async () => {
	const screen = await render(
		<BlockQuote data-testid="custom-quote">Custom styled quote</BlockQuote>,
	)

	const quote = screen.getByTestId('custom-quote')

	await expect.element(quote).toBeVisible()
	await expect.element(quote).toHaveTextContent('Custom styled quote')
})

it('should render complex children', async () => {
	const screen = await render(
		<BlockQuote>
			<p>First paragraph</p>
			<p>Second paragraph</p>
		</BlockQuote>,
	)

	const firstPara = screen.getByText('First paragraph')
	const secondPara = screen.getByText('Second paragraph')

	await expect.element(firstPara).toBeVisible()
	await expect.element(secondPara).toBeVisible()
})
