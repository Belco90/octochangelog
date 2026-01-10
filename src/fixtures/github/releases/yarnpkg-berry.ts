import type { ReleaseFixture } from '@/models'

/**
 * Sample data for yarnpkg/berry repo:
 *
 * 3 releases: from v4.10.3 to v4.12.0
 */
const yarnpkgBerryReleases: Array<ReleaseFixture> = [
	{
		id: 264606583,
		tag_name: '@yarnpkg/cli/4.12.0',
		name: 'v4.12.0',
		html_url:
			'https://github.com/yarnpkg/berry/releases/tag/%40yarnpkg/cli/4.12.0',
		body: "## What's Changed\n* fix(git): split `-c` and `core.autocrlf=false` into separate args for `clone` by @mhassan1 in https://github.com/yarnpkg/berry/pull/6983\n* Implements npm web login support by @arcanis in https://github.com/yarnpkg/berry/pull/6981\n* Fix JSON Schema by @joshkel in https://github.com/yarnpkg/berry/pull/6973\n\n## New Contributors\n* @joshkel made their first contribution in https://github.com/yarnpkg/berry/pull/6973\n\n**Full Changelog**: https://github.com/yarnpkg/berry/compare/@yarnpkg/cli/4.11.0...@yarnpkg/cli/4.12.0",
	},
	{
		id: 260633141,
		tag_name: '@yarnpkg/cli/4.11.0',
		name: 'v4.11.0',
		html_url:
			'https://github.com/yarnpkg/berry/releases/tag/%40yarnpkg/cli/4.11.0',
		body: "## What's Changed\n* Improves 'yarn workspaces focus' tests by @arcanis in https://github.com/yarnpkg/berry/pull/6932\n* PnP: Allow `FileHandle#read` into `TypedArray`s and `DataView`s by @clemyan in https://github.com/yarnpkg/berry/pull/6950\n* Adds support for _resolveFilename's option 'conditions' by @arcanis in https://github.com/yarnpkg/berry/pull/6966\n* fix(publish): use correct workspace name in --json output by @florianloechle in https://github.com/yarnpkg/berry/pull/6949\n* Update README.md badge link by @Olexandr88 in https://github.com/yarnpkg/berry/pull/6947\n* fix: use correct env var to detect gitlab CI for OIDC by @smoores-dev in https://github.com/yarnpkg/berry/pull/6938\n* Core: Create DURATION settings type by @clemyan in https://github.com/yarnpkg/berry/pull/6942\n* Support escaping template variables in environment values by @parksb in https://github.com/yarnpkg/berry/pull/6935\n* Migrates the \"typescript\" dependencies to a catalog by @arcanis in https://github.com/yarnpkg/berry/pull/6969\n* docs: Clarify additional use-case of npmMinimalAgeGate by @IchordeDionysos in https://github.com/yarnpkg/berry/pull/6945\n* Allow catalogs to work with descriptors without resolvers by @parksb in https://github.com/yarnpkg/berry/pull/6930\n\n## New Contributors\n* @florianloechle made their first contribution in https://github.com/yarnpkg/berry/pull/6949\n* @Olexandr88 made their first contribution in https://github.com/yarnpkg/berry/pull/6947\n* @parksb made their first contribution in https://github.com/yarnpkg/berry/pull/6935\n* @IchordeDionysos made their first contribution in https://github.com/yarnpkg/berry/pull/6945\n\n**Full Changelog**: https://github.com/yarnpkg/berry/compare/@yarnpkg/cli/4.10.3...@yarnpkg/cli/4.11.0",
	},
	{
		id: 249288824,
		tag_name: '@yarnpkg/cli/4.10.3',
		name: 'v4.10.3',
		html_url:
			'https://github.com/yarnpkg/berry/releases/tag/%40yarnpkg/cli/4.10.3',
		body: "## What's Changed\n* Fix OIDC publishing for scoped packages by @cometkim in https://github.com/yarnpkg/berry/pull/6911\n* Fixes npmMinimalAgeGate with tags and prereleases by @arcanis in https://github.com/yarnpkg/berry/pull/6916\n* Removes the protocol when it matches the default one by @arcanis in https://github.com/yarnpkg/berry/pull/6917\n* Disables Prolog tests from new releases by @arcanis in https://github.com/yarnpkg/berry/pull/6918\n* Enables postinstall scripts for pnpm by @arcanis in https://github.com/yarnpkg/berry/pull/6902\n\n\n**Full Changelog**: https://github.com/yarnpkg/berry/compare/@yarnpkg/cli/4.10.2...@yarnpkg/cli/4.10.3",
	},
]

export { yarnpkgBerryReleases }
