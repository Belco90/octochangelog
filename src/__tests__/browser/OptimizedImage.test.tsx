import { afterEach, expect, it, vi } from 'vitest'

import type { OptimizedImageProps } from '@/components/OptimizedImage'
import { OptimizedImage } from '@/components/OptimizedImage'

import { render } from '../browser-testing'

const { ImageMock } = vi.hoisted(() => ({
	ImageMock: vi.fn(({ src, alt }: OptimizedImageProps) => (
		// Simplify img rendering for testing purposes
		<img src={src} alt={alt} />
	)),
}))

// @ts-expect-error Ignoring for testing purposes
vi.mock(import('@unpic/react'), async (importOriginal) => {
	const originalModule = await importOriginal()
	return {
		...originalModule,
		Image: ImageMock,
	}
})

afterEach(() => {
	vi.unstubAllEnvs()
})

it('should not enable cdn mode by default', async () => {
	expect(ImageMock).not.toHaveBeenCalled()

	const screen = await render(
		<OptimizedImage
			src="/raw-logo.jpg"
			alt="Test image"
			width={400}
			height={300}
			priority
		/>,
	)

	await expect
		.element(screen.getByRole('img', { name: /test image/i }))
		.toBeVisible()

	expect(ImageMock).toHaveBeenCalledOnce()
	expect(ImageMock).toHaveBeenCalledWith(
		expect.objectContaining({ cdn: undefined, priority: undefined }),
		undefined,
	)
})

it('should enable cdn mode if running on Netlify', async () => {
	vi.stubEnv('VITE_NETLIFY', 'DEV')

	expect(ImageMock).not.toHaveBeenCalled()

	const screen = await render(
		<OptimizedImage
			src="/raw-logo.jpg"
			alt="Test image"
			width={400}
			height={300}
			priority
		/>,
	)

	await expect
		.element(screen.getByRole('img', { name: /test image/i }))
		.toBeVisible()

	expect(ImageMock).toHaveBeenCalledOnce()
	expect(ImageMock).toHaveBeenCalledWith(
		expect.objectContaining({ cdn: 'netlify', priority: true }),
		undefined,
	)
})

it('should merge custom operations with default values', async () => {
	const screen = await render(
		<OptimizedImage
			src="/raw-logo.jpg"
			alt="Test image"
			width={400}
			height={300}
			operations={{ q: 100 }}
		/>,
	)

	await expect
		.element(screen.getByRole('img', { name: /test image/i }))
		.toBeVisible()

	expect(ImageMock).toHaveBeenCalledOnce()
	expect(ImageMock).toHaveBeenCalledWith(
		expect.objectContaining({
			operations: {
				netlify: expect.objectContaining({
					q: 100,
					fm: 'webp',
					w: 400,
					h: 300,
				}) as unknown,
			},
		}),
		undefined,
	)
})
