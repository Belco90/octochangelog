const DEFAULT_COMMAND_TIMEOUT = Cypress.config('defaultCommandTimeout')
const LONGER_COMMAND_TIMEOUT = DEFAULT_COMMAND_TIMEOUT * 5

it('should show changelog results when preloading from URL with "latest"', () => {
	cy.visit(
		'/compare?repo=testing-library%2Fdom-testing-library&from=v8.11.0&to=latest',
	)
	cy.title().should('equal', 'Compare | Octochangelog')
	cy.metaDescriptionShouldEqual(
		'Compare GitHub changelogs across multiple releases in a single view',
	)

	cy.findByRole('combobox', { name: /select from release/i }).should(
		'have.value',
		'v8.11.0',
	)
	cy.findByRole('combobox', { name: /select to release/i }).should(
		'have.value',
		'latest',
	)
	cy.findByRole('link', { name: 'dom-testing-library' }).should(
		'have.attr',
		'href',
		'https://github.com/testing-library/dom-testing-library',
	)

	cy.findByRole('heading', { name: 'Changes from v8.11.0 to latest' })
	cy.findByText('Latest (v8.17.1)').should('be.selected')

	cy.findByRole('heading', { level: 3, name: /features/i })
	cy.findByRole('heading', { level: 3, name: /bug fixes/i })

	// description from v8.11.1 release
	cy.findByText(/Don't queue microtasks after condition is met/)

	cy.get('body').happoScreenshot({
		component:
			'Comparator page: basic changelog from preloaded URL with "latest"',
	})
})

/**
 * Relates to #741
 *
 * By default we only paginate releases up to 10. If any version preloaded from the URL
 * is located after that, we need to keep paginating releases until found.
 *
 * When both versions are found, the fetching must be stopped, so we avoid unnecessary requests.
 *
 * In this test, to get all releases from v26.9.0 to v32.172.2 we need to fetch 11 pages. We have 12 available, but the
 * last one must not be requested since all the info will be available by then.
 */
it('should show changelog results when preloading from URL with more than 10 release pages', () => {
	// Increase the command timeout since it takes a while for findBy queries
	// to find certain elements while the comparator is still processing the changelog.
	Cypress.config('defaultCommandTimeout', LONGER_COMMAND_TIMEOUT)

	cy.visit('/compare?repo=renovatebot%2Frenovate&from=26.9.0&to=32.172.2')
	cy.title().should('equal', 'Compare | Octochangelog')
	cy.metaDescriptionShouldEqual(
		'Compare GitHub changelogs across multiple releases in a single view',
	)

	// cy.window().then((appWindow) => {
	// 	if (appWindow.msw) {
	// 		const { worker, rest } = appWindow.msw
	//
	// 		worker.use(
	// 			rest.get(
	// 				`${getMockApiPath()}/repos/renovatebot/renovate/releases`,
	// 				(req, res) => {
	// 					const pageIndex = Number(req.url.searchParams.get('page') || 1)
	//
	// 					// Since all info is available when page 11 is retrieved, page 12 should not be requested.
	// 					// We are forcing an error on page 12 to make sure it's not requested.
	// 					if (pageIndex === 12) {
	// 						return res.networkError('Requested page not available.')
	// 					}
	//
	// 					return undefined
	// 				},
	// 			),
	// 		)
	// 	} else if (appWindow.isApiMockingEnabled) {
	// 		throw new Error('API mocking should be enabled but MSW was not found.')
	// 	}
	// })

	cy.findByRole('combobox', { name: /select from release/i }).should(
		'have.value',
		'26.9.0',
	)
	cy.findByRole('combobox', { name: /select to release/i }).should(
		'have.value',
		'32.172.2',
	)

	cy.findByRole('heading', { name: 'renovate' }).within(() => {
		cy.findByRole('link', { name: 'renovate' }).should(
			'have.attr',
			'href',
			'https://github.com/renovatebot/renovate',
		)
	})

	// Wait a bit before checking the rendered release changelog details
	// since this may take a while to appear due to the number of
	// changelogs being rendered.
	cy.wait(DEFAULT_COMMAND_TIMEOUT * 2)

	cy.findByRole('heading', {
		name: 'Changes from 26.9.0 to 32.172.2',
	})
	cy.findByRole('heading', { level: 3, name: /breaking changes/i })
	cy.findByRole('heading', { level: 3, name: /bug fixes/i })
	cy.findByRole('heading', { level: 3, name: /features/i })
	cy.findByRole('heading', { level: 3, name: /reverts/i })
	cy.findByRole('heading', { level: 3, name: /miscellaneous chores/i })
	cy.findByRole('heading', { level: 3, name: /build system/i })

	// link for 26.9.1 release (lowest one)
	cy.findByRole('link', {
		name: '26.9.1',
	}).should(
		'have.attr',
		'href',
		'https://github.com/renovatebot/renovate/releases/tag/26.9.1',
	)
	// link for 32.172.2 release (highest one)
	cy.findAllByRole('link', {
		name: '32.172.2',
	}).should(
		'have.attr',
		'href',
		'https://github.com/renovatebot/renovate/releases/tag/32.172.2',
	)
})
