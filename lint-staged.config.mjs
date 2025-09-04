import path from 'node:path'

const buildEslintCommand = async (filenames) => {
	const filenamesFlag = filenames
		.map((filename) => path.relative(process.cwd(), filename))
		.join(' ')

	return `eslint --fix ${filenamesFlag}`
}

const config = {
	'**/*.{js,jsx,ts,tsx,mjs,mts}': [buildEslintCommand],
	'*': 'prettier --write --ignore-unknown',
}

export default config
