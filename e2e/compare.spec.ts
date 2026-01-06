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

	await expect(
		page.getByRole('link', { name: 'dom-testing-library' }),
	).toBeVisible()
	await expect(
		page.getByRole('link', { name: 'dom-testing-library' }),
	).toHaveAttribute(
		'href',
		'https://github.com/testing-library/dom-testing-library',
	)

	await page.getByLabel(/select from release/i).selectOption('v6.16.0')
	await expect(page).toHaveURL(/.+from=v6\.16\.0.*/)
	await page.getByLabel(/select to release/i).selectOption('v8.1.0')
	await expect(page).toHaveURL(/.+to=v8\.1\.0.*/)

	await expect(
		page.getByRole('heading', { name: /changes from v6\.16\.0 to v8\.1\.0/i }),
	).toBeVisible()

	await expect(
		page.getByRole('heading', {
			level: 3,
			name: /breaking changes/i,
		}),
	).toBeVisible()
})
