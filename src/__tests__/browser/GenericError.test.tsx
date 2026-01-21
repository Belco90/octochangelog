import { expect, it, vi } from 'vitest'

import { GenericError } from '@/components/GenericError'

import { render } from '../browser-testing'

const { captureExceptionMock } = vi.hoisted(() => ({
	captureExceptionMock: vi.fn(),
}))

vi.mock('@sentry/tanstackstart-react', () => ({
	captureException: captureExceptionMock,
}))

it('should display generic error message', async () => {
	const screen = await render(
		<GenericError error={new Error('Test error')} reset={vi.fn()} />,
	)

	await expect
		.element(
			screen.getByRole('heading', { level: 2, name: 'Something went wrong!' }),
		)
		.toBeVisible()
	await expect
		.element(
			screen.getByText('Octochangelog could not handle the workload properly'),
		)
		.toBeVisible()
})

it('should handle the error', async () => {
	const error = new Error('Test error')
	const resetMock = vi.fn()

	expect(resetMock).not.toHaveBeenCalled()
	expect(captureExceptionMock).not.toHaveBeenCalled()

	const screen = await render(<GenericError error={error} reset={resetMock} />)

	await screen.getByRole('button', { name: /try again/i }).click()

	expect(resetMock).toHaveBeenCalledOnce()
	expect(captureExceptionMock).toHaveBeenCalledExactlyOnceWith(error)
})
