import { expect } from '@playwright/test'

import { test, waitForApiMock } from './playwright-utils'

test('should show changelog results when filling the form', async ({
	page,
	happoScreenshot,
}) => {
	await page.goto('/compare')
	await waitForApiMock(page)

	await expect(page).toHaveTitle('Compare | Octochangelog')

	await expect(page.locator('meta[name="description"]')).toHaveAttribute(
		'content',
		'Compare GitHub changelogs in a single view',
	)

	await page
		.getByRole('combobox', { name: /repository/i })
		.fill('dom testing library')

	await page
		.getByRole('listbox', { name: /repository/i })
		.getByText('testing-library/dom-testing-library')
		.click()

	await expect(page).toHaveURL(/.+repo=testing-library%2Fdom-testing-library.*/)

	await page.getByLabel(/from version/i).selectOption('v6.16.0')
	await expect(page).toHaveURL(/.+from=v6\.16\.0.*/)
	await page.getByLabel(/to version/i).selectOption('v8.1.0')
	await expect(page).toHaveURL(/.+to=v8\.1\.0.*/)

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

	await happoScreenshot(page.locator('body'), {
		component: 'Compare page: changelog from filled form',
		variant: 'default',
	})
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
		'Compare GitHub changelogs in a single view',
	)

	// Check that the form is pre-filled with the URL params
	await expect(page.getByRole('combobox', { name: /repository/i })).toHaveValue(
		'testing-library/dom-testing-library',
	)
	await expect(page.getByLabel(/from version/i)).toHaveValue('v6.16.0')
	await expect(page.getByLabel(/to version/i)).toHaveValue('v8.1.0')

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

test('should show changelog results when preloading from URL with "latest"', async ({
	page,
	happoScreenshot,
}) => {
	await page.goto(
		'compare?repo=testing-library%2Fdom-testing-library&from=v8.11.0&to=latest',
	)
	await expect(page).toHaveTitle('Compare | Octochangelog')
	await expect(page.locator('meta[name="description"]')).toHaveAttribute(
		'content',
		'Compare GitHub changelogs in a single view',
	)

	// Check that the form is pre-filled with the URL params
	await expect(page.getByRole('combobox', { name: /repository/i })).toHaveValue(
		'testing-library/dom-testing-library',
	)
	await expect(page.getByLabel(/from version/i)).toHaveValue('v8.11.0')
	await expect(page.getByLabel(/to version/i)).toHaveValue('latest')
	await expect(
		page.getByLabel(/to version/i).locator('option:checked'),
	).toHaveText('Latest (v8.17.1)')

	// Check semver headings
	await expect(
		page.getByRole('heading', { level: 3, name: /features/i }),
	).toBeVisible()
	await expect(
		page.getByRole('heading', { level: 3, name: /bug fixes/i }),
	).toBeVisible()

	// Check for specific changelog content
	await expect(
		page.getByText(/Don't queue microtasks after condition is met/),
	).toBeVisible() // description from v8.11.1 release

	await happoScreenshot(page.locator('body'), {
		component: 'Compare page: changelog from preloaded URL with "latest"',
		variant: 'default',
	})
})

test(
	'should show changelog results for repos with scoped versions',
	{
		annotation: {
			type: 'issue',
			description: 'https://github.com/Belco90/octochangelog/issues/3038',
		},
	},
	async ({ page }) => {
		await page.goto('compare')
		await waitForApiMock(page)

		await expect(page).toHaveTitle('Compare | Octochangelog')

		await page.getByRole('combobox', { name: /repository/i }).fill('yarn')

		await page
			.getByRole('listbox', { name: /repository/i })
			.getByText('yarnpkg/berry')
			.click()

		await expect(page).toHaveURL(/.+repo=yarnpkg%2Fberry.*/)

		await page.getByLabel(/from version/i).selectOption('@yarnpkg/cli/4.10.3')
		await expect(page).toHaveURL(/.+from=%40yarnpkg%2Fcli%2F4\.10\.3.*/)
		await page.getByLabel(/to version/i).selectOption('@yarnpkg/cli/4.12.0')
		await expect(page).toHaveURL(/.+to=%40yarnpkg%2Fcli%2F4\.12\.0.*/)

		// Check that releases with scoped tags are displayed correctly
		await expect(page.getByRole('link', { name: '4.11.0' })).toHaveCount(4)
		await expect(page.getByRole('link', { name: '4.12.0' })).toHaveCount(3)

		// Check for specific changelog content from the releases
		await expect(
			page.getByText(/Improves 'yarn workspaces focus' tests/),
		).toBeVisible() // from 4.11.0 release
		await expect(
			page.getByText(/Implements npm web login support/),
		).toBeVisible() // from 4.12.0 release
	},
)

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
test(
	'should show changelog results when preloading from URL with more than 10 release pages',
	{
		annotation: {
			type: 'issue',
			description: 'https://github.com/Belco90/octochangelog/issues/741',
		},
	},
	async ({ page }) => {
		test.slow(
			true,
			'The changelog takes a while to be processed, which makes this test slow',
		)

		// TODO: check only 11 requests were made to https://api.github.com/repos/renovatebot/renovate/releases

		await page.goto(
			'compare?repo=renovatebot%2Frenovate&from=26.9.0&to=32.172.2',
		)
		await expect(page).toHaveTitle('Compare | Octochangelog')
		await expect(page.locator('meta[name="description"]')).toHaveAttribute(
			'content',
			'Compare GitHub changelogs in a single view',
		)

		// Check that the form is pre-filled with the URL params
		await expect(
			page.getByRole('combobox', { name: /repository/i }),
		).toHaveValue('renovatebot/renovate')
		await expect(page.getByLabel(/from version/i)).toHaveValue('26.9.0')
		await expect(page.getByLabel(/to version/i)).toHaveValue('32.172.2')

		// Check semver headings
		await expect(
			page.getByRole('heading', { level: 3, name: /breaking changes/i }),
		).toBeVisible()
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
			page.getByRole('heading', { level: 3, name: /miscellaneous chores/i }),
		).toBeVisible()
		await expect(
			page.getByRole('heading', { level: 3, name: /build system/i }),
		).toBeVisible()

		// Check links to the lowest and greatest releases in the changelog
		const lowestReleaseLink = page.getByRole('link', { name: '26.9.1' })
		const greatestReleaseLink = page.getByRole('link', { name: '32.172.2' })
		await expect(lowestReleaseLink).toHaveCount(1)
		await expect(lowestReleaseLink).toHaveAttribute(
			'href',
			'https://github.com/renovatebot/renovate/releases/tag/26.9.1',
		)
		await expect(greatestReleaseLink).toHaveCount(3)
		await expect(greatestReleaseLink.first()).toHaveAttribute(
			'href',
			'https://github.com/renovatebot/renovate/releases/tag/32.172.2',
		)
	},
)
