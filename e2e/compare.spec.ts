import { expect } from '@playwright/test'

import { test } from './playwright.setup'

test('should show changelog results when filling the form', async ({
	page,
}) => {
	await page.goto('/compare')

	await expect(page).toHaveTitle('Compare | Octochangelog')

	await expect(page.locator('meta[name="description"]')).toHaveAttribute(
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

	await expect(page.getByRole('link', { name: 'v7.0.0' })).toHaveCount(2)

	await expect(
		page.getByRole('heading', { level: 5, name: /drop node 8/i }),
	).toBeVisible()

	await expect(
		page.getByText(/node 10 or greater is required\. node 8 is.+, closes/i),
	).toBeVisible()

	await expect(page.getByRole('link', { name: /out of lts/i })).toHaveAttribute(
		'href',
		'https://nodejs.org/en/about/releases/',
	)

	await expect(page.getByRole('link', { name: /#459/i })).toHaveAttribute(
		'href',
		'https://github.com/testing-library/dom-testing-library/issues/459',
	)

	// Check that GitHub references are rendered with proper links
	await expect(page.getByRole('link', { name: /c3ab843/i })).toHaveAttribute(
		'href',
		'https://github.com/testing-library/dom-testing-library/commit/c3ab843c292484428f045671ea22cbb30eb70559',
	)
	await expect(page.getByRole('link', { name: /#430/i })).toHaveAttribute(
		'href',
		'https://github.com/testing-library/dom-testing-library/issues/430',
	)

	// Check that the code block is rendered with the diff display
	await expect(
		page.getByText(/- \s+"test": "react-scripts test --env=dom"/i),
	).toBeVisible()
	await expect(
		page.getByText(
			/\+ \s+"test": "react-scripts test --env=jest-environment-jsdom-sixteen"/i,
		),
	).toBeVisible()

	// Check semver headings
	await expect(
		page.getByRole('heading', { level: 3, name: /features/i }),
	).toBeVisible()
	await expect(
		page.getByRole('heading', { level: 3, name: /bug fixes/i }),
	).toBeVisible()
	await expect(
		page.getByRole('heading', { level: 3, name: /reverts/i }),
	).toBeVisible()
	await expect(
		page.getByRole('heading', { level: 3, name: /recommendations/i }),
	).toBeVisible()
	await expect(
		page.getByRole('heading', { level: 3, name: /chore/i }),
	).toBeVisible()

	// TODO: add happo screenshot for "Comparator page: basic changelog from filled form"
})

test('should show changelog results when preloading from URL', async ({
	page,
}) => {
	await page.goto(
		'compare?repo=testing-library%2Fdom-testing-library&from=v6.16.0&to=v8.1.0',
	)

	await expect(page).toHaveTitle('Compare | Octochangelog')
	await expect(page.locator('meta[name="description"]')).toHaveAttribute(
		'content',
		'Compare GitHub changelogs across multiple releases in a single view',
	)

	// Check that the form is pre-filled with the URL params
	await expect(
		page.getByRole('combobox', { name: /enter repository name/i }),
	).toHaveValue('testing-library/dom-testing-library')
	await expect(page.getByLabel(/select from release/i)).toHaveValue('v6.16.0')
	await expect(page.getByLabel(/select to release/i)).toHaveValue('v8.1.0')

	// Check changelog results
	const resultsHeading = page.getByRole('heading', {
		name: 'dom-testing-library',
	})
	await expect(resultsHeading).toBeVisible()
	await expect(
		resultsHeading.getByRole('link', { name: 'dom-testing-library' }),
	).toHaveAttribute(
		'href',
		'https://github.com/testing-library/dom-testing-library',
	)
	await expect(
		page.getByRole('heading', { name: /changes from v6\.16\.0 to v8\.1\.0/i }),
	).toBeVisible()

	await expect(page.getByRole('link', { name: 'v7.0.0' })).toHaveCount(2)

	await expect(
		page.getByRole('heading', { level: 5, name: /drop node 8/i }),
	).toBeVisible()

	await expect(
		page.getByText(/node 10 or greater is required\. node 8 is.+, closes/i),
	).toBeVisible()

	await expect(page.getByRole('link', { name: /out of lts/i })).toHaveAttribute(
		'href',
		'https://nodejs.org/en/about/releases/',
	)

	await expect(page.getByRole('link', { name: /#459/i })).toHaveAttribute(
		'href',
		'https://github.com/testing-library/dom-testing-library/issues/459',
	)

	// Check that GitHub references are rendered with proper links
	await expect(page.getByRole('link', { name: /c3ab843/i })).toHaveAttribute(
		'href',
		'https://github.com/testing-library/dom-testing-library/commit/c3ab843c292484428f045671ea22cbb30eb70559',
	)
	await expect(page.getByRole('link', { name: /#430/i })).toHaveAttribute(
		'href',
		'https://github.com/testing-library/dom-testing-library/issues/430',
	)

	// Check that the code block is rendered with the diff display
	await expect(
		page.getByText(/- \s+"test": "react-scripts test --env=dom"/i),
	).toBeVisible()
	await expect(
		page.getByText(
			/\+ \s+"test": "react-scripts test --env=jest-environment-jsdom-sixteen"/i,
		),
	).toBeVisible()

	// Check semver headings
	await expect(
		page.getByRole('heading', { level: 3, name: /features/i }),
	).toBeVisible()
	await expect(
		page.getByRole('heading', { level: 3, name: /bug fixes/i }),
	).toBeVisible()
	await expect(
		page.getByRole('heading', { level: 3, name: /reverts/i }),
	).toBeVisible()
	await expect(
		page.getByRole('heading', { level: 3, name: /recommendations/i }),
	).toBeVisible()
	await expect(
		page.getByRole('heading', { level: 3, name: /chore/i }),
	).toBeVisible()

	// Check for specific changelog content
	await expect(page.getByText(/waitForElement was still in use/)).toBeVisible() // description from v7.0.1 release
})

test.skip('should show changelog results when preloading from URL with "latest"', async () => {
	// TODO
})

/**
 * Relates to #741
 *
 * By default, we only paginate releases up to 10. If any version preloaded from the URL
 * is located after that, we need to keep paginating releases until found.
 *
 * When both versions are found, the fetching must be stopped, so we avoid unnecessary requests.
 *
 * In this test, to get all releases from v26.9.0 to v32.172.2 we need to fetch 11 pages. We have 12 available, but the
 * last one must not be requested since all the info will be available by then.
 */
test.skip(
	'should show changelog results when preloading from URL with more than 10 release pages',
	{
		annotation: {
			type: 'issue',
			description: 'https://github.com/Belco90/octochangelog/issues/741',
		},
	},
	() => {
		test.slow(
			true,
			'The changelog takes a while to be processed, which makes this test slow',
		)
		// TODO
	},
)
