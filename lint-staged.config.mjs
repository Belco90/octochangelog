import path from 'node:path'

import { ESLint } from 'eslint'

const buildEslintCommand = async (filenames) => {
	const eslint = new ESLint({ cwd: process.cwd() })
	const ignoredChecks = await Promise.all(
		filenames.map((f) => eslint.isPathIgnored(f)),
	)
	const filesToLint = filenames
		.filter((_, i) => !ignoredChecks[i])
		.map((f) => path.relative(process.cwd(), f))

	if (filesToLint.length === 0) {
		return 'echo "No ESLint files to lint"'
	}

	const filenamesFlag = filesToLint.join(' ')
	return `eslint --fix ${filenamesFlag}`
}

const config = {
	'**/*.{js,jsx,ts,tsx,mjs,mts}': [buildEslintCommand],
	'*': 'prettier --write --ignore-unknown',
}

export default config
