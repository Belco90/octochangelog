import { expect } from '@playwright/test'

import { test } from './playwright-utils'

test('should complete GitHub OAuth flow successfully', async ({ page }) => {
	await page.goto('/compare')
	await expect(page).toHaveTitle('Compare | Octochangelog')

	// Click the login button only to check it's redirected to the expected GitHub login URL
	await page.getByRole('button', { name: /login with github/i }).click()
	await expect(page, 'GitHub login URL is correct').toHaveURL(
		/github\.com\/login\?client_id=.+&return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id.+$/,
	)

	// Instead of continuing the auth on GitHub, we'll simulate the callback
	// by directly navigating to the callback URL with a mock code
	await page.goto('/auth/callback?code=mock-github-code')
	await expect(
		page.getByRole('heading', { name: /authorizing on github/i }),
		'Land on authorizing page after successful OAuth flow on GitHub',
	).toBeVisible()
	await expect(
		page.getByText(/authorized successfully!/i),
		'Temporary code exchanged by access token successfully',
	).toBeVisible()

	await page.getByRole('button', { name: /back to compare/i }).click()
	await expect(page, 'Redirected to compare page').toHaveURL('/compare')

	// Verify the access token cookie is set
	const cookies = await page.context().cookies()
	const authCookie = cookies.find(
		(c) => c.name === 'octochangelog-github-access-token',
	)

	expect(authCookie, 'Auth cookie should be set').toBeDefined()
	expect(authCookie?.value, 'Auth cookie value should match mock').toBe(
		'MOCK_ACCESS_TOKEN',
	)
	expect(authCookie?.sameSite, 'Auth cookie sameSite should be Lax').toBe('Lax')
})

test('should preserve query parameters during GitHub OAuth flow', async ({
	page,
}) => {
	// Start on compare page with query parameters
	const urlWithQueryParams =
		'/compare?repo=testing-library%2Fdom-testing-library&from=v6.16.0&to=v8.1.0'
	await page.goto(urlWithQueryParams)

	// Click the login button only to check it's redirected to the expected GitHub login URL
	// (this is where the redirect url with query params is preserved for later usage)
	await page.getByRole('button', { name: /login with github/i }).click()
	await expect(page, 'GitHub login URL is correct').toHaveURL(
		/github\.com\/login\?client_id=.+&return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id.+$/,
	)

	// Instead of continuing the auth on GitHub, we'll simulate the callback
	// by directly navigating to the callback URL with a mock code
	await page.goto('/auth/callback?code=mock-github-code')
	await expect(
		page.getByRole('heading', { name: /authorizing on github/i }),
		'Land on authorizing page after successful OAuth flow on GitHub',
	).toBeVisible()
	await expect(
		page.getByText(/authorized successfully!/i),
		'Temporary code exchanged by access token successfully',
	).toBeVisible()

	// Verify we're redirected back with the original query parameters
	await page.getByRole('button', { name: /back to compare/i }).click()
	await expect(
		page,
		'Redirected to compare page preserving query params',
	).toHaveURL(urlWithQueryParams)

	// Verify the access token cookie is set
	const cookies = await page.context().cookies()
	const authCookie = cookies.find(
		(c) => c.name === 'octochangelog-github-access-token',
	)

	expect(authCookie, 'Auth cookie should be set').toBeDefined()
	expect(authCookie?.value, 'Auth cookie value should match mock').toBe(
		'MOCK_ACCESS_TOKEN',
	)
	expect(authCookie?.sameSite, 'Auth cookie sameSite should be Lax').toBe('Lax')
})

test('should display error when OAuth callback fails due to missing code', async ({
	page,
}) => {
	// Navigate directly to the callback without a code parameter
	// This simulates a failed OAuth flow (e.g., user denied authorization or invalid callback)
	await page.goto('/auth/callback')

	await expect(
		page.getByRole('heading', { name: /authorizing on github/i }),
		'Should land on the auth callback page',
	).toBeVisible()
	await expect(
		page.getByText(/something went wrong/i),
		'Should display error message',
	).toBeVisible()

	await expect(
		page.getByText(/missing github code/i),
		'Should display specific error about missing code',
	).toBeVisible()

	// Verify the access token cookie is empty
	const cookies = await page.context().cookies()
	const authCookie = cookies.find(
		(c) => c.name === 'octochangelog-github-access-token',
	)
	expect(authCookie, 'Auth cookie should be empty').toBeUndefined()
})

test('should display error when OAuth callback fails due to invalid code', async ({
	page,
}) => {
	// Navigate to the callback with an invalid code parameter
	// This simulates GitHub rejecting the temporary code (expired, already used, etc.)
	await page.goto('/auth/callback?code=INVALID_CODE')

	// Verify we see the error state
	await expect(
		page.getByRole('heading', { name: /authorizing on github/i }),
		'Should land on the auth callback page',
	).toBeVisible()

	await expect(
		page.getByText(/something went wrong exchanging the code/i),
		'Should display error message',
	).toBeVisible()

	// Verify the access token cookie is empty
	const cookies = await page.context().cookies()
	const authCookie = cookies.find(
		(c) => c.name === 'octochangelog-github-access-token',
	)
	expect(authCookie, 'Auth cookie should be empty').toBeUndefined()
})
