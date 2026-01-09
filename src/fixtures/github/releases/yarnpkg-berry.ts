import type { Release } from '@/models'

/**
 * Sample data for yarnpkg/berry repo:
 *
 * 3 releases: from v4.10.3 to v4.12.0
 */
const yarnpkgBerryReleases: Array<Release> = [
	{
		url: 'https://api.github.com/repos/yarnpkg/berry/releases/264606583',
		assets_url:
			'https://api.github.com/repos/yarnpkg/berry/releases/264606583/assets',
		upload_url:
			'https://uploads.github.com/repos/yarnpkg/berry/releases/264606583/assets{?name,label}',
		html_url:
			'https://github.com/yarnpkg/berry/releases/tag/%40yarnpkg/cli/4.12.0',
		id: 264606583,
		author: {
			login: 'yarnbot',
			id: 50545563,
			node_id: 'MDQ6VXNlcjUwNTQ1NTYz',
			avatar_url: 'https://avatars.githubusercontent.com/u/50545563?v=4',
			gravatar_id: '',
			url: 'https://api.github.com/users/yarnbot',
			html_url: 'https://github.com/yarnbot',
			followers_url: 'https://api.github.com/users/yarnbot/followers',
			following_url:
				'https://api.github.com/users/yarnbot/following{/other_user}',
			gists_url: 'https://api.github.com/users/yarnbot/gists{/gist_id}',
			starred_url:
				'https://api.github.com/users/yarnbot/starred{/owner}{/repo}',
			subscriptions_url: 'https://api.github.com/users/yarnbot/subscriptions',
			organizations_url: 'https://api.github.com/users/yarnbot/orgs',
			repos_url: 'https://api.github.com/users/yarnbot/repos',
			events_url: 'https://api.github.com/users/yarnbot/events{/privacy}',
			received_events_url:
				'https://api.github.com/users/yarnbot/received_events',
			type: 'User',
			user_view_type: 'public',
			site_admin: false,
		},
		node_id: 'RE_kwDOCNXKfM4PxZN3',
		tag_name: '@yarnpkg/cli/4.12.0',
		target_commitish: 'master',
		name: 'v4.12.0',
		draft: false,
		prerelease: false,
		created_at: '2025-11-23T11:08:59Z',
		published_at: '2025-11-23T11:09:03Z',
		assets: [],
		tarball_url:
			'https://api.github.com/repos/yarnpkg/berry/tarball/@yarnpkg/cli/4.12.0',
		zipball_url:
			'https://api.github.com/repos/yarnpkg/berry/zipball/@yarnpkg/cli/4.12.0',
		body: "## What's Changed\n* fix(git): split `-c` and `core.autocrlf=false` into separate args for `clone` by @mhassan1 in https://github.com/yarnpkg/berry/pull/6983\n* Implements npm web login support by @arcanis in https://github.com/yarnpkg/berry/pull/6981\n* Fix JSON Schema by @joshkel in https://github.com/yarnpkg/berry/pull/6973\n\n## New Contributors\n* @joshkel made their first contribution in https://github.com/yarnpkg/berry/pull/6973\n\n**Full Changelog**: https://github.com/yarnpkg/berry/compare/@yarnpkg/cli/4.11.0...@yarnpkg/cli/4.12.0",
		mentions_count: 3,
	},
	{
		url: 'https://api.github.com/repos/yarnpkg/berry/releases/260633141',
		assets_url:
			'https://api.github.com/repos/yarnpkg/berry/releases/260633141/assets',
		upload_url:
			'https://uploads.github.com/repos/yarnpkg/berry/releases/260633141/assets{?name,label}',
		html_url:
			'https://github.com/yarnpkg/berry/releases/tag/%40yarnpkg/cli/4.11.0',
		id: 260633141,
		author: {
			login: 'yarnbot',
			id: 50545563,
			node_id: 'MDQ6VXNlcjUwNTQ1NTYz',
			avatar_url: 'https://avatars.githubusercontent.com/u/50545563?v=4',
			gravatar_id: '',
			url: 'https://api.github.com/users/yarnbot',
			html_url: 'https://github.com/yarnbot',
			followers_url: 'https://api.github.com/users/yarnbot/followers',
			following_url:
				'https://api.github.com/users/yarnbot/following{/other_user}',
			gists_url: 'https://api.github.com/users/yarnbot/gists{/gist_id}',
			starred_url:
				'https://api.github.com/users/yarnbot/starred{/owner}{/repo}',
			subscriptions_url: 'https://api.github.com/users/yarnbot/subscriptions',
			organizations_url: 'https://api.github.com/users/yarnbot/orgs',
			repos_url: 'https://api.github.com/users/yarnbot/repos',
			events_url: 'https://api.github.com/users/yarnbot/events{/privacy}',
			received_events_url:
				'https://api.github.com/users/yarnbot/received_events',
			type: 'User',
			user_view_type: 'public',
			site_admin: false,
		},
		node_id: 'RE_kwDOCNXKfM4PiPI1',
		tag_name: '@yarnpkg/cli/4.11.0',
		target_commitish: 'master',
		name: 'v4.11.0',
		draft: false,
		prerelease: false,
		created_at: '2025-11-07T13:52:39Z',
		published_at: '2025-11-07T13:52:43Z',
		assets: [],
		tarball_url:
			'https://api.github.com/repos/yarnpkg/berry/tarball/@yarnpkg/cli/4.11.0',
		zipball_url:
			'https://api.github.com/repos/yarnpkg/berry/zipball/@yarnpkg/cli/4.11.0',
		body: "## What's Changed\n* Improves 'yarn workspaces focus' tests by @arcanis in https://github.com/yarnpkg/berry/pull/6932\n* PnP: Allow `FileHandle#read` into `TypedArray`s and `DataView`s by @clemyan in https://github.com/yarnpkg/berry/pull/6950\n* Adds support for _resolveFilename's option 'conditions' by @arcanis in https://github.com/yarnpkg/berry/pull/6966\n* fix(publish): use correct workspace name in --json output by @florianloechle in https://github.com/yarnpkg/berry/pull/6949\n* Update README.md badge link by @Olexandr88 in https://github.com/yarnpkg/berry/pull/6947\n* fix: use correct env var to detect gitlab CI for OIDC by @smoores-dev in https://github.com/yarnpkg/berry/pull/6938\n* Core: Create DURATION settings type by @clemyan in https://github.com/yarnpkg/berry/pull/6942\n* Support escaping template variables in environment values by @parksb in https://github.com/yarnpkg/berry/pull/6935\n* Migrates the \"typescript\" dependencies to a catalog by @arcanis in https://github.com/yarnpkg/berry/pull/6969\n* docs: Clarify additional use-case of npmMinimalAgeGate by @IchordeDionysos in https://github.com/yarnpkg/berry/pull/6945\n* Allow catalogs to work with descriptors without resolvers by @parksb in https://github.com/yarnpkg/berry/pull/6930\n\n## New Contributors\n* @florianloechle made their first contribution in https://github.com/yarnpkg/berry/pull/6949\n* @Olexandr88 made their first contribution in https://github.com/yarnpkg/berry/pull/6947\n* @parksb made their first contribution in https://github.com/yarnpkg/berry/pull/6935\n* @IchordeDionysos made their first contribution in https://github.com/yarnpkg/berry/pull/6945\n\n**Full Changelog**: https://github.com/yarnpkg/berry/compare/@yarnpkg/cli/4.10.3...@yarnpkg/cli/4.11.0",
		reactions: {
			url: 'https://api.github.com/repos/yarnpkg/berry/releases/260633141/reactions',
			total_count: 4,
			'+1': 0,
			'-1': 0,
			laugh: 0,
			hooray: 4,
			confused: 0,
			heart: 0,
			rocket: 0,
			eyes: 0,
		},
		mentions_count: 7,
	},
	{
		url: 'https://api.github.com/repos/yarnpkg/berry/releases/249288824',
		assets_url:
			'https://api.github.com/repos/yarnpkg/berry/releases/249288824/assets',
		upload_url:
			'https://uploads.github.com/repos/yarnpkg/berry/releases/249288824/assets{?name,label}',
		html_url:
			'https://github.com/yarnpkg/berry/releases/tag/%40yarnpkg/cli/4.10.3',
		id: 249288824,
		author: {
			login: 'yarnbot',
			id: 50545563,
			node_id: 'MDQ6VXNlcjUwNTQ1NTYz',
			avatar_url: 'https://avatars.githubusercontent.com/u/50545563?v=4',
			gravatar_id: '',
			url: 'https://api.github.com/users/yarnbot',
			html_url: 'https://github.com/yarnbot',
			followers_url: 'https://api.github.com/users/yarnbot/followers',
			following_url:
				'https://api.github.com/users/yarnbot/following{/other_user}',
			gists_url: 'https://api.github.com/users/yarnbot/gists{/gist_id}',
			starred_url:
				'https://api.github.com/users/yarnbot/starred{/owner}{/repo}',
			subscriptions_url: 'https://api.github.com/users/yarnbot/subscriptions',
			organizations_url: 'https://api.github.com/users/yarnbot/orgs',
			repos_url: 'https://api.github.com/users/yarnbot/repos',
			events_url: 'https://api.github.com/users/yarnbot/events{/privacy}',
			received_events_url:
				'https://api.github.com/users/yarnbot/received_events',
			type: 'User',
			user_view_type: 'public',
			site_admin: false,
		},
		node_id: 'RE_kwDOCNXKfM4O29h4',
		tag_name: '@yarnpkg/cli/4.10.3',
		target_commitish: 'master',
		name: 'v4.10.3',
		draft: false,
		prerelease: false,
		created_at: '2025-09-23T09:41:56Z',
		published_at: '2025-09-23T09:42:00Z',
		assets: [],
		tarball_url:
			'https://api.github.com/repos/yarnpkg/berry/tarball/@yarnpkg/cli/4.10.3',
		zipball_url:
			'https://api.github.com/repos/yarnpkg/berry/zipball/@yarnpkg/cli/4.10.3',
		body: "## What's Changed\n* Fix OIDC publishing for scoped packages by @cometkim in https://github.com/yarnpkg/berry/pull/6911\n* Fixes npmMinimalAgeGate with tags and prereleases by @arcanis in https://github.com/yarnpkg/berry/pull/6916\n* Removes the protocol when it matches the default one by @arcanis in https://github.com/yarnpkg/berry/pull/6917\n* Disables Prolog tests from new releases by @arcanis in https://github.com/yarnpkg/berry/pull/6918\n* Enables postinstall scripts for pnpm by @arcanis in https://github.com/yarnpkg/berry/pull/6902\n\n\n**Full Changelog**: https://github.com/yarnpkg/berry/compare/@yarnpkg/cli/4.10.2...@yarnpkg/cli/4.10.3",
		mentions_count: 2,
	},
]

export { yarnpkgBerryReleases }
