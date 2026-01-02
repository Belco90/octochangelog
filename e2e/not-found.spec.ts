import { test, expect } from '@playwright/test'

test('should diplsay a custom "not found" page for non-existing page', async ({
	page,
}) => {
	await page.goto('/not-existing-page')

	await expect(page).toHaveTitle('Not Found | Octochangelog')

	await expect(
		page.getByRole('heading', { name: 'This page could not be found.' }),
	).toBeVisible()

	await expect(
		page.getByText('Octochangelog cannot divine the page you wanted.'),
	).toBeVisible()

	await expect(
		page.getByRole('link', { name: /go to compare/i }),
	).toHaveAttribute('href', '/compare')

	await expect(
		page.getByRole('link', { name: 'Or go to homepage' }),
	).toHaveAttribute('href', '/')
})
