import { expect } from '@playwright/test'
import { http, HttpResponse } from 'msw'

import { test } from './playwright-utils'

test('should show changelog results when filling the form', async ({
	page,
	happoScreenshot,
}) => {
	await page.goto('/compare')

	await expect(page).toHaveTitle('Compare | Octochangelog')

	await expect(page.locator('meta[name="description"]')).toHaveAttribute(
		'content',
		'Compare GitHub changelogs in a single view',
	)

	await page
		.getByRole('combobox', { name: /enter repository name/i })
		.fill('dom testing library')

	await page
		.getByRole('listbox', { name: /enter repository name/i })
		.getByText('testing-library/dom-testing-library')
		.click()

	await expect(page).toHaveURL(/.+repo=testing-library%2Fdom-testing-library.*/)
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
	await expect(
		page.getByRole('combobox', { name: /enter repository name/i }),
	).toHaveValue('testing-library/dom-testing-library')
	await expect(page.getByLabel(/select from release/i)).toHaveValue('v8.11.0')
	await expect(page.getByLabel(/select to release/i)).toHaveValue('latest')
	await expect(
		page.getByLabel(/select to release/i).locator('option:checked'),
	).toHaveText('Latest (v8.17.1)')

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
		page.getByRole('heading', { name: /changes from v8\.11\.0 to latest/i }),
	).toBeVisible()

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

		await expect(page).toHaveTitle('Compare | Octochangelog')

		await page
			.getByRole('combobox', { name: /enter repository name/i })
			.fill('yarn')

		await page
			.getByRole('listbox', { name: /enter repository name/i })
			.getByText('yarnpkg/berry')
			.click()

		await expect(page).toHaveURL(/.+repo=yarnpkg%2Fberry.*/)
		await expect(
			page.getByRole('heading', {
				name: 'berry',
			}),
		).toBeVisible()

		await page
			.getByLabel(/select from release/i)
			.selectOption('@yarnpkg/cli/4.10.3')
		await expect(page).toHaveURL(/.+from=%40yarnpkg%2Fcli%2F4\.10\.3.*/)
		await page
			.getByLabel(/select to release/i)
			.selectOption('@yarnpkg/cli/4.12.0')
		await expect(page).toHaveURL(/.+to=%40yarnpkg%2Fcli%2F4\.12\.0.*/)

		await expect(
			page.getByRole('heading', {
				name: /changes from 4\.10\.3 to 4\.12\.0/i,
			}),
		).toBeVisible()

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
	async ({ page, network }) => {
		test.slow(
			true,
			'The changelog takes a while to be processed, which makes this test slow',
		)

		network.use(
			http.get(
				'https://api.github.com/repos/renovatebot/renovate/releases',
				({ request }) => {
					const url = new URL(request.url)
					const paginationIndex = Number(url.searchParams.get('page') || 1)

					// Since all info is available when page 11 is requested, page 12 must not be requested.
					// Forcing an error after page 11 proves that the webapp requests the correct number of pages.
					if (paginationIndex > 11) {
						return HttpResponse.json(
							{ error: 'Should not request more than 11 pages' },
							{ status: 500 },
						)
					}

					return undefined
				},
			),
		)

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
			page.getByRole('combobox', { name: /enter repository name/i }),
		).toHaveValue('renovatebot/renovate')
		await expect(page.getByLabel(/select from release/i)).toHaveValue('26.9.0')
		await expect(page.getByLabel(/select to release/i)).toHaveValue('32.172.2')

		// Check changelog results
		const resultsHeading = page.getByRole('heading', {
			name: 'renovate',
		})
		await expect(resultsHeading).toBeVisible()
		await expect(
			resultsHeading.getByRole('link', { name: 'renovate' }),
		).toHaveAttribute('href', 'https://github.com/renovatebot/renovate')
		await expect(
			page.getByRole('heading', {
				name: /changes from 26\.9\.0 to 32\.172\.2/i,
			}),
		).toBeVisible()

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
