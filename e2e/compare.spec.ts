import { expect } from '@playwright/test'

import { test } from './playwright.setup'

test('should show changelog results when filling the form', async ({
	page,
}) => {
	await page.goto('/compare')

	await expect(page).toHaveTitle('Compare | Octochangelog')

	const metaDescription = page.locator('meta[name="description"]')
	await expect(metaDescription).toHaveAttribute(
		'content',
		'Compare GitHub changelogs across multiple releases in a single view',
	)

	await page
		.getByRole('combobox', { name: /enter repository name/i })
		.fill('dom testing library')

	await page
		.getByRole('listbox', { name: /enter repository name/i })
		.getByText('testing-library/dom-testing-library')
		.click()
})
