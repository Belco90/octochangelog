import { expect } from '@playwright/test'

import { test } from './playwright-utils'

test('should display the corresponding information', async ({
	page,
	happoScreenshot,
}) => {
	await page.goto('/')

	await expect(page).toHaveTitle('Octochangelog')

	const metaDescription = page.locator('meta[name="description"]')
	await expect(metaDescription).toHaveAttribute(
		'content',
		'Compare GitHub changelogs across multiple releases in a single view',
	)

	await expect(
		page.getByRole('heading', { level: 1, name: 'Octochangelog' }),
	).toBeVisible()

	await expect(
		page.getByRole('heading', {
			level: 2,
			name: 'Compare GitHub changelogs in a single view.',
		}),
	).toBeVisible()

	const headings = [
		'Compare releases easily',
		'Share changelogs',
		"Don't miss breaking changes",
		'No manual sorting',
		'Changes per version',
	]

	for (const heading of headings) {
		await expect(
			page.getByRole('heading', { level: 3, name: heading }),
		).toBeVisible()
	}

	await expect(
		page.getByRole('contentinfo').getByText(/Created.+ by Mario/),
	).toBeVisible()

	await expect(page.getByRole('link', { name: /mario/i })).toHaveAttribute(
		'href',
		'https://mario.dev/',
	)

	await expect(
		page.getByRole('link', {
			name: /octochangelog repository on github/i,
		}),
	).toHaveAttribute('href', 'https://github.com/Belco90/octochangelog')

	await happoScreenshot(page.locator('body'), {
		component: 'Home page',
		variant: 'default',
	})

	await page.getByRole('link', { name: 'Try me now!' }).click()

	await expect(page).toHaveURL('/compare')
})
