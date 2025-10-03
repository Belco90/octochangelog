import { createCallbackAuth } from '@octokit/auth-callback'
import { Octokit } from '@octokit/rest'

import { getGithubAccessToken } from '@/github-auth'

function getUserAgent(): string {
	const userAgent = 'Octochangelog'
	const isDeployed = [
		'production',
		'deploy-preview',
		'branch-deploy',
		'preview-server',
	].includes(String(process.env.CONTEXT))

	if (isDeployed) {
		return userAgent
	}

	return `Test ${userAgent}`
}

const octokit = new Octokit({
	authStrategy: createCallbackAuth,
	auth: { callback: getGithubAccessToken },
	retry: { enabled: false }, // React Query already retries
	userAgent: getUserAgent(),
})

export { octokit }
