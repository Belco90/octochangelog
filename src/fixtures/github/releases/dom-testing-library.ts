import type { ReleaseFixture } from '@/models'

/**
 * 286 releases: from v8.17.1 to v1.1.0
 *
 * This generates 3 pages of 100 items.
 */
const domTestingLibraryReleases: Array<ReleaseFixture> = [
	{
		id: 73997306,
		tag_name: 'v8.17.1',
		name: 'v8.17.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.17.1',
		body: '## [8.17.1](https://github.com/testing-library/dom-testing-library/compare/v8.17.0...v8.17.1) (2022-08-09)\n\n\n### Bug Fixes\n\n* log ignored selectors correctly on error ([#1141](https://github.com/testing-library/dom-testing-library/issues/1141)) ([d50a967](https://github.com/testing-library/dom-testing-library/commit/d50a9672af6adc80f1e79e4eeb4e0342f3d1e5de))\n\n\n\n',
	},
	{
		id: 73996067,
		tag_name: 'v8.17.0',
		name: 'v8.17.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.17.0',
		body: '# [8.17.0](https://github.com/testing-library/dom-testing-library/compare/v8.16.1...v8.17.0) (2022-08-09)\n\n\n### Features\n\n* **ByRole:** improved byRole query performance ([#1086](https://github.com/testing-library/dom-testing-library/issues/1086)) ([0226aea](https://github.com/testing-library/dom-testing-library/commit/0226aea74e873ba96dae414edc533c33b1e51867))\n\n\n\n',
	},
	{
		id: 73700189,
		tag_name: 'v8.16.1',
		name: 'v8.16.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.16.1',
		body: "## [8.16.1](https://github.com/testing-library/dom-testing-library/compare/v8.16.0...v8.16.1) (2022-08-04)\n\n\n### Bug Fixes\n\n* Don't assume named exports interop ([#1154](https://github.com/testing-library/dom-testing-library/issues/1154)) ([4f965e9](https://github.com/testing-library/dom-testing-library/commit/4f965e9e6f2c89b50b88f7f50273264a606542b5))\n\n\n\n",
	},
	{
		id: 71668294,
		tag_name: 'v8.16.0',
		name: 'v8.16.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.16.0',
		body: '# [8.16.0](https://github.com/testing-library/dom-testing-library/compare/v8.15.0...v8.16.0) (2022-07-11)\n\n\n### Features\n\n* add a return value from logTestingPlaygroundURL ([#1144](https://github.com/testing-library/dom-testing-library/issues/1144)) ([6d6312f](https://github.com/testing-library/dom-testing-library/commit/6d6312f7dc463820a6e248b99fbb61cb64aea822))\n\n\n\n',
	},
	{
		id: 71641265,
		tag_name: 'v8.15.0',
		name: 'v8.15.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.15.0',
		body: '# [8.15.0](https://github.com/testing-library/dom-testing-library/compare/v8.14.1...v8.15.0) (2022-07-10)\n\n\n### Features\n\n* add name hint to missing error in find by queries ([#1143](https://github.com/testing-library/dom-testing-library/issues/1143)) ([9b83f01](https://github.com/testing-library/dom-testing-library/commit/9b83f01c3fad10aa80e2f4bb74e54e5f503e1461))\n\n\n\n',
	},
	{
		id: 71619693,
		tag_name: 'v8.14.1',
		name: 'v8.14.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.14.1',
		body: '## [8.14.1](https://github.com/testing-library/dom-testing-library/compare/v8.14.0...v8.14.1) (2022-07-09)\n\n\n### Bug Fixes\n\n* load and error dispatch `Event` instead of `UIEvent` ([#1147](https://github.com/testing-library/dom-testing-library/issues/1147)) ([29a17cb](https://github.com/testing-library/dom-testing-library/commit/29a17cb5f14b0f30f08a29172e35e55c3e8ba529))\n\n\n\n',
	},
	{
		id: 69813492,
		tag_name: 'v8.14.0',
		name: 'v8.14.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.14.0',
		body: '# [8.14.0](https://github.com/testing-library/dom-testing-library/compare/v8.13.0...v8.14.0) (2022-06-20)\n\n\n### Features\n\n* add `defaultIgnore` config option ([#1138](https://github.com/testing-library/dom-testing-library/issues/1138)) ([4e9484a](https://github.com/testing-library/dom-testing-library/commit/4e9484ab91f379c95a2cbfb5a100f4dc96ec0143))\n\n\n\n',
	},
	{
		id: 63623058,
		tag_name: 'v8.13.0',
		name: 'v8.13.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.13.0',
		body: '# [8.13.0](https://github.com/testing-library/dom-testing-library/compare/v8.12.0...v8.13.0) (2022-04-05)\n\n\n### Features\n\n* **byRole:** Add description filter ([#1120](https://github.com/testing-library/dom-testing-library/issues/1120)) ([84c7290](https://github.com/testing-library/dom-testing-library/commit/84c72900c88ea3d14953ecafcb3c2620274ed57b))\n\n\n\n',
	},
	{
		id: 62843896,
		tag_name: 'v8.12.0',
		name: 'v8.12.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.12.0',
		body: '# [8.12.0](https://github.com/testing-library/dom-testing-library/compare/v8.11.4...v8.12.0) (2022-03-26)\n\n\n### Features\n\n* enhance `byText` missing error ([#1117](https://github.com/testing-library/dom-testing-library/issues/1117)) ([77125fd](https://github.com/testing-library/dom-testing-library/commit/77125fd96512cdc54e86990a069138428acc27ab))\n\n\n\n',
	},
	{
		id: 62629335,
		tag_name: 'v8.11.4',
		name: 'v8.11.4',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.11.4',
		body: '## [8.11.4](https://github.com/testing-library/dom-testing-library/compare/v8.11.3...v8.11.4) (2022-03-23)\n\n\n### Bug Fixes\n\n* reset regexg to prevent regexg with global flags to not match every element ([#1116](https://github.com/testing-library/dom-testing-library/issues/1116)) ([90d420d](https://github.com/testing-library/dom-testing-library/commit/90d420d12d21f4bab2ea2dc92ba1cc274f5bd1e4))\n\n\n\n',
	},
	{
		id: 57944894,
		tag_name: 'v8.11.3',
		name: 'v8.11.3',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.11.3',
		body: '## [8.11.3](https://github.com/testing-library/dom-testing-library/compare/v8.11.2...v8.11.3) (2022-01-25)\n\n\n### Bug Fixes\n\n* improve error message when no window found ([#1089](https://github.com/testing-library/dom-testing-library/issues/1089)) ([7f5d421](https://github.com/testing-library/dom-testing-library/commit/7f5d42122b4a3424a5ed431c7f923b15317a67ab))\n\n\n\n',
	},
	{
		id: 57200303,
		tag_name: 'v8.11.2',
		name: 'v8.11.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.11.2',
		body: '## [8.11.2](https://github.com/testing-library/dom-testing-library/compare/v8.11.1...v8.11.2) (2022-01-15)\n\n\n### Bug Fixes\n\n* **within:** Add extra type paramater to allow reassigning in TypeScript ([#1077](https://github.com/testing-library/dom-testing-library/issues/1077)) ([1f143e5](https://github.com/testing-library/dom-testing-library/commit/1f143e5ae70e4d8a230881d75b0bd1b47eb30da8))\n\n\n\n',
	},
	{
		id: 53112122,
		tag_name: 'v8.11.1',
		name: 'v8.11.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.11.1',
		body: "## [8.11.1](https://github.com/testing-library/dom-testing-library/compare/v8.11.0...v8.11.1) (2021-11-10)\n\n\n### Bug Fixes\n\n* **wait-for:** Don't queue microtasks after condition is met ([#1073](https://github.com/testing-library/dom-testing-library/issues/1073)) ([1fc17be](https://github.com/testing-library/dom-testing-library/commit/1fc17bec5d28e5b58fcdd325d6d2caaff02dfb47))\n\n\n\n",
	},
	{
		id: 52597389,
		tag_name: 'v8.11.0',
		name: 'v8.11.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.11.0',
		body: '# [8.11.0](https://github.com/testing-library/dom-testing-library/compare/v8.10.1...v8.11.0) (2021-11-03)\n\n\n### Features\n\n* Prioritize accessible names check higher than inaccessibility check in `byRole` queries ([#1068](https://github.com/testing-library/dom-testing-library/issues/1068)) ([2866544](https://github.com/testing-library/dom-testing-library/commit/286654462ec4ba404c157769751c618da7112c87))\n\n\n\n',
	},
	{
		id: 51543367,
		tag_name: 'v8.10.1',
		name: 'v8.10.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.10.1',
		body: '## [8.10.1](https://github.com/testing-library/dom-testing-library/compare/v8.10.0...v8.10.1) (2021-10-18)\n\n\n### Bug Fixes\n\n* Bump dom-accessibility-api ([#1063](https://github.com/testing-library/dom-testing-library/issues/1063)) ([b6b9b5b](https://github.com/testing-library/dom-testing-library/commit/b6b9b5b03811fd3c794e11a333f367f4ceba06d4))\n\n\n\n',
	},
	{
		id: 51527063,
		tag_name: 'v8.10.0',
		name: 'v8.10.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.10.0',
		body: '# [8.10.0](https://github.com/testing-library/dom-testing-library/compare/v8.9.1...v8.10.0) (2021-10-18)\n\n\n### Features\n\n* Use ARIA 1.2 for role queries ([#1058](https://github.com/testing-library/dom-testing-library/issues/1058)) ([1239182](https://github.com/testing-library/dom-testing-library/commit/12391821b187a9c0183a1d8ffbda76a566cf1ed6))\n\n\n\n',
	},
	{
		id: 51368257,
		tag_name: 'v8.9.1',
		name: 'v8.9.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.9.1',
		body: '## [8.9.1](https://github.com/testing-library/dom-testing-library/compare/v8.9.0...v8.9.1) (2021-10-14)\n\n\n### Bug Fixes\n\n* **ByRole:** Ensure valid query selectors in all transpilation targets ([#1055](https://github.com/testing-library/dom-testing-library/issues/1055)) ([b569a1b](https://github.com/testing-library/dom-testing-library/commit/b569a1b82aac5d400ee63309f0cba62738922a15))\n\n\n\n',
	},
	{
		id: 51264688,
		tag_name: 'v8.9.0',
		name: 'v8.9.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.9.0',
		body: '# [8.9.0](https://github.com/testing-library/dom-testing-library/compare/v8.8.0...v8.9.0) (2021-10-13)\n\n\n### Features\n\n* **ByRole:** Check only elements that could be a match ([#1046](https://github.com/testing-library/dom-testing-library/issues/1046)) ([8edfad0](https://github.com/testing-library/dom-testing-library/commit/8edfad010432f6b5878ba8505a7ff26065d5f405))\n\n\n\n',
	},
	{
		id: 50735741,
		tag_name: 'v8.7.2',
		name: 'v8.7.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.7.2',
		body: '## [8.7.2](https://github.com/testing-library/dom-testing-library/compare/v8.7.1...v8.7.2) (2021-10-04)\n\n\n### Bug Fixes\n\n* **within:** types should list custom and base queries ([#1045](https://github.com/testing-library/dom-testing-library/issues/1045)) ([b28586e](https://github.com/testing-library/dom-testing-library/commit/b28586e7c0ad2f23ed38d0e7557f4c2688e55f0b))\n\n\n\n',
	},
	{
		id: 50529148,
		tag_name: 'v8.7.1',
		name: 'v8.7.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.7.1',
		body: '## [8.7.1](https://github.com/testing-library/dom-testing-library/compare/v8.7.0...v8.7.1) (2021-09-30)\n\n\n### Bug Fixes\n\n* **buildQuery:** get*Error functions receive same Arguments type as queryAllBy parameter ([#1041](https://github.com/testing-library/dom-testing-library/issues/1041)) ([6171979](https://github.com/testing-library/dom-testing-library/commit/6171979da2cfbca624f18a0a51efe63a3a213827))\n\n\n\n',
	},
	{
		id: 50448909,
		tag_name: 'v8.7.0',
		name: 'v8.7.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.7.0',
		body: '# [8.7.0](https://github.com/testing-library/dom-testing-library/compare/v8.6.0...v8.7.0) (2021-09-29)\n\n\n### Features\n\n* add generics to screen queries ([#1034](https://github.com/testing-library/dom-testing-library/issues/1034)) ([99bc2c0](https://github.com/testing-library/dom-testing-library/commit/99bc2c0eaa5a53cd4cd8db1a05740e7c99505407)), closes [#1033](https://github.com/testing-library/dom-testing-library/issues/1033)\n\n\n\n',
	},
	{
		id: 50073028,
		tag_name: 'v8.6.0',
		name: 'v8.6.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.6.0',
		body: '# [8.6.0](https://github.com/testing-library/dom-testing-library/compare/v8.5.0...v8.6.0) (2021-09-22)\n\n\n### Features\n\n* Add support for firing all transition events ([#1036](https://github.com/testing-library/dom-testing-library/issues/1036)) ([669602c](https://github.com/testing-library/dom-testing-library/commit/669602c37c61c7ac56fde2e6e11cdabb9dae826a))\n\n\n\n',
	},
	{
		id: 49386519,
		tag_name: 'v8.5.0',
		name: 'v8.5.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.5.0',
		body: '# [8.5.0](https://github.com/testing-library/dom-testing-library/compare/v8.4.0...v8.5.0) (2021-09-11)\n\n\n### Features\n\n* **config:** Add `unstable_advanceTimersWrapper` ([#1022](https://github.com/testing-library/dom-testing-library/issues/1022)) ([45830f5](https://github.com/testing-library/dom-testing-library/commit/45830f580ced3ae5337af9ace4a9bd65067dfe5c))\n\n\n\n',
	},
	{
		id: 49386361,
		tag_name: 'v8.4.0',
		name: 'v8.4.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.4.0',
		body: '# [8.4.0](https://github.com/testing-library/dom-testing-library/compare/v8.3.0...v8.4.0) (2021-09-11)\n\n\n### Bug Fixes\n\n* Use syntax compatible with older TypeScript versions ([#1026](https://github.com/testing-library/dom-testing-library/issues/1026)) ([8311c8d](https://github.com/testing-library/dom-testing-library/commit/8311c8d29be4c206a35653c859f305d0081752a9))\n\n\n### Features\n\n* Add element type generic argument to queries ([#1023](https://github.com/testing-library/dom-testing-library/issues/1023)) ([f55f19b](https://github.com/testing-library/dom-testing-library/commit/f55f19bdc8b297afa6ad06fdf1983f2b2eafa15d))\n\n\n\n',
	},
	{
		id: 49161394,
		tag_name: 'v8.3.0',
		name: 'v8.3.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.3.0',
		body: '# [8.3.0](https://github.com/testing-library/dom-testing-library/compare/v8.2.0...v8.3.0) (2021-09-07)\n\n\n### Features\n\n* restore prettyDOM logging for Cypress ([#1018](https://github.com/testing-library/dom-testing-library/issues/1018)) ([460115a](https://github.com/testing-library/dom-testing-library/commit/460115a471bcbd7e963f2751f7544bfe6f10f828))\n\n\n\n',
	},
	{
		id: 48430726,
		tag_name: 'v8.2.0',
		name: 'v8.2.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.2.0',
		body: '# [8.2.0](https://github.com/testing-library/dom-testing-library/compare/v8.1.1...v8.2.0) (2021-08-25)\n\n\n### Features\n\n* **ByRole:** Allow filter by `aria-current` state ([#943](https://github.com/testing-library/dom-testing-library/issues/943)) ([fbbb29a](https://github.com/testing-library/dom-testing-library/commit/fbbb29a6d9655d41bc8f91d49dc64326f588c0d6))\n\n\n\n',
	},
	{
		id: 48410432,
		tag_name: 'v8.1.1',
		name: 'v8.1.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.1.1',
		body: '## [8.1.1](https://github.com/testing-library/dom-testing-library/compare/v8.1.0...v8.1.1) (2021-08-25)\n\n\n### Bug Fixes\n\n* support getting text of inputs of type `reset` ([#1011](https://github.com/testing-library/dom-testing-library/issues/1011)) ([54b9a5f](https://github.com/testing-library/dom-testing-library/commit/54b9a5fd9c88018f042f6d1e9d7ae55c6257de98))\n\n\n\n',
	},
	{
		id: 45563567,
		tag_name: 'v8.1.0',
		name: 'v8.1.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.1.0',
		body: '# [8.1.0](https://github.com/testing-library/dom-testing-library/compare/v8.0.0...v8.1.0) (2021-07-01)\n\n\n### Features\n\n* **fireEvent:** Add resize event ([#990](https://github.com/testing-library/dom-testing-library/issues/990)) ([75197fe](https://github.com/testing-library/dom-testing-library/commit/75197fe09a85646a6ca1d877f5dde21da60e6b76))\n\n\n\n',
	},
	{
		id: 45075142,
		tag_name: 'v8.0.0',
		name: 'v8.0.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.0.0',
		body: '# [8.0.0](https://github.com/testing-library/dom-testing-library/compare/v7.31.2...v8.0.0) (2021-06-23)\r\n\r\n### Recommendations\r\n1. If you\'re using `jest` fake timers make sure you use modern timers\r\n  jest 27:\r\n   ```diff\r\n   -jest.useFakeTimers(\'legacy\')\r\n   +jest.useFakeTimers(\'modern\')\r\n    // jest.config.js\r\n   -"timers": "legacy",\r\n   +"timers": "modern",\r\n   ```\r\n   jest 26:\r\n   ```diff\r\n   -jest.useFakeTimers()\r\n   +jest.useFakeTimers(\'modern\')\r\n    // jest.config.js\r\n   -"timers": "legacy",\r\n   +"timers": "modern",\r\n   ```\r\n\r\n\r\n### chore\r\n\r\n* Release v8 as stable ([#979](https://github.com/testing-library/dom-testing-library/issues/979)) ([d347302](https://github.com/testing-library/dom-testing-library/commit/d347302d6b17280b71505d55d0cb9cda376b95cc))\r\n\r\n### BREAKING CHANGES\r\n\r\n* Remove deprecated `waitFormDOMChange`\r\n* Remove deprecated `waitForElement`\r\n* The `timeout` in `waitFor(callback, { interval, timeout } )` now uses the same clock as `interval`. Previously `timeout` was always using the real clock while `interval` was using the global clock which could\'ve been mocked out. For the old behavior I\'d recommend `waitFor(callback, { interval, timeout: Number.POSITIVE_INFINITY })` and rely on your test runner to timeout considering real timers.\r\n* `<script />`, `<style />` and comment nodes are now ignored by default in `prettyDOM` .If you whish to return to the old behavior, use a custom `filterNode` function. In this case `prettyDOM(element, { filterNode: () => true })`.\r\n* node 10 is no longer supported. It reached its end-of-life on 30.04.2021.\r\n\r\n\r\n\r\n\r\n',
	},
	{
		id: 44917392,
		tag_name: 'v8.0.0-alpha.7',
		name: 'v8.0.0-alpha.7',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.0.0-alpha.7',
		body: '# [8.0.0-alpha.7](https://github.com/testing-library/dom-testing-library/compare/v8.0.0-alpha.6...v8.0.0-alpha.7) (2021-06-20)\n\n\n### Bug Fixes\n\n* Consider `<output />` labelable ([#968](https://github.com/testing-library/dom-testing-library/issues/968)) ([56a4c75](https://github.com/testing-library/dom-testing-library/commit/56a4c759a0237b6ca9dcec3cffcd71832c00e736))\n\n\n\n',
	},
	{
		id: 44516523,
		tag_name: 'v8.0.0-alpha.6',
		name: 'v8.0.0-alpha.6',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.0.0-alpha.6',
		body: '# [8.0.0-alpha.6](https://github.com/testing-library/dom-testing-library/compare/v8.0.0-alpha.5...v8.0.0-alpha.6) (2021-06-12)\n\n\n### Features\n\n* Drop support for node 10 ([#976](https://github.com/testing-library/dom-testing-library/issues/976)) ([fa3b91c](https://github.com/testing-library/dom-testing-library/commit/fa3b91cbd47d3351ca3e9da75eb02ea14778b860))\n\n\n### BREAKING CHANGES\n\n* node 10 is no longer supported. It reached its end-of-life on 30.04.2021.\n\n\n\n',
	},
	{
		id: 44504379,
		tag_name: 'v8.0.0-alpha.5',
		name: 'v8.0.0-alpha.5',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.0.0-alpha.5',
		body: '# [8.0.0-alpha.5](https://github.com/testing-library/dom-testing-library/compare/v8.0.0-alpha.4...v8.0.0-alpha.5) (2021-06-11)\n\n\n### Features\n\n* Add `filterNode` option to `prettyDOM` ([#907](https://github.com/testing-library/dom-testing-library/issues/907)) ([9410e11](https://github.com/testing-library/dom-testing-library/commit/9410e1155307e3051884fcc093e26ccd688c7547))\n\n\n\n',
	},
	{
		id: 44264906,
		tag_name: 'v8.0.0-alpha.4',
		name: 'v8.0.0-alpha.4',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.0.0-alpha.4',
		body: '# [8.0.0-alpha.4](https://github.com/testing-library/dom-testing-library/compare/v8.0.0-alpha.3...v8.0.0-alpha.4) (2021-06-08)\n\n\n### Features\n\n* Remove waitForElement ([#969](https://github.com/testing-library/dom-testing-library/issues/969)) ([532106b](https://github.com/testing-library/dom-testing-library/commit/532106b8c58f3af2320132e1ac9cfa5f26f441f7))\n\n\n### BREAKING CHANGES\n\n* Remove deprecated `waitForElement`\n\n\n\n',
	},
	{
		id: 44257540,
		tag_name: 'v8.0.0-alpha.3',
		name: 'v8.0.0-alpha.3',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.0.0-alpha.3',
		body: '# [8.0.0-alpha.3](https://github.com/testing-library/dom-testing-library/compare/v8.0.0-alpha.2...v8.0.0-alpha.3) (2021-06-08)\n\n\n### Bug Fixes\n\n* **types:** remove wait types ([#971](https://github.com/testing-library/dom-testing-library/issues/971)) ([0f8d912](https://github.com/testing-library/dom-testing-library/commit/0f8d912f8a15d65f238ca0d9e0a3fbb4c7c3f64a))\n\n\n\n',
	},
	{
		id: 44045588,
		tag_name: 'v8.0.0-alpha.2',
		name: 'v8.0.0-alpha.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.0.0-alpha.2',
		body: '# [8.0.0-alpha.2](https://github.com/testing-library/dom-testing-library/compare/v8.0.0-alpha.1...v8.0.0-alpha.2) (2021-06-03)\n\n\n### Bug Fixes\n\n* Consider `<output />` labelable ([#968](https://github.com/testing-library/dom-testing-library/issues/968)) ([ce06299](https://github.com/testing-library/dom-testing-library/commit/ce06299c10653614f375b43fb47b16c06d01ad35))\n\n\n\n',
	},
	{
		id: 44039635,
		tag_name: 'v8.0.0-alpha.1',
		name: 'v8.0.0-alpha.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v8.0.0-alpha.1',
		body: "# [8.0.0-alpha.1](https://github.com/testing-library/dom-testing-library/compare/v7.31.1...v8.0.0-alpha.1) (2021-06-03)\n\n\n### Bug Fixes\n\n* Only use a single clock ([#966](https://github.com/testing-library/dom-testing-library/issues/966)) ([3ae2702](https://github.com/testing-library/dom-testing-library/commit/3ae270237425a2bd8a865f727537f5633f3653cd))\n\n\n### BREAKING CHANGES\n\n* Remove deprecated `waitFormDOMChange`\n* The `timeout` in `waitFor(callback, { interval, timeout } )` now uses the same clock as `interval`. Previously `timeout` was always using the real clock while `interval` was using the global clock which could've been mocked out. For the old behavior I'd recommend `waitFor(callback, { interval, timeout: Number.PositiveInfinity })` and rely on your test runner to timeout considering real timers.\n\n\n\n",
	},
	{
		id: 44030234,
		tag_name: 'v7.31.2',
		name: 'v7.31.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.31.2',
		body: '## [7.31.2](https://github.com/testing-library/dom-testing-library/compare/v7.31.1...v7.31.2) (2021-06-03)\n\n\n### Bug Fixes\n\n* Consider `<output />` labelable ([#968](https://github.com/testing-library/dom-testing-library/issues/968)) ([56a4c75](https://github.com/testing-library/dom-testing-library/commit/56a4c759a0237b6ca9dcec3cffcd71832c00e736))\n\n\n\n',
	},
	{
		id: 44029994,
		tag_name: 'v7.31.1',
		name: 'v7.31.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.31.1',
		body: '## [7.31.1](https://github.com/testing-library/dom-testing-library/compare/v7.31.0...v7.31.1) (2021-06-03)\n\n\n### Bug Fixes\n\n* Bump dom-accessibility-api ([#965](https://github.com/testing-library/dom-testing-library/issues/965)) ([86fb094](https://github.com/testing-library/dom-testing-library/commit/86fb0948f7c4c00b1dec45ff9161cb2d7df13688))\n\n\n\n',
	},
	{
		id: 43917276,
		tag_name: 'v7.31.1-alpha.1',
		name: 'v7.31.1-alpha.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.31.1-alpha.1',
		body: '## [7.31.1-alpha.1](https://github.com/testing-library/dom-testing-library/compare/v7.31.0...v7.31.1-alpha.1) (2021-06-01)\n\n\n### Bug Fixes\n\n* Bump dom-accessibility-api ([#965](https://github.com/testing-library/dom-testing-library/issues/965)) ([86fb094](https://github.com/testing-library/dom-testing-library/commit/86fb0948f7c4c00b1dec45ff9161cb2d7df13688))\n\n\n\n',
	},
	{
		id: 42688044,
		tag_name: 'v7.31.0',
		name: 'v7.31.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.31.0',
		body: '# [7.31.0](https://github.com/testing-library/dom-testing-library/compare/v7.30.4...v7.31.0) (2021-05-10)\n\n\n### Features\n\n* Add extra error messages when `screen` was passed instead of a DOM element ([#949](https://github.com/testing-library/dom-testing-library/issues/949)) ([c273ed5](https://github.com/testing-library/dom-testing-library/commit/c273ed518cf783591692be8c0c5e5a34feafd4bb))\n\n\n\n',
	},
	{
		id: 41838119,
		tag_name: 'v7.30.4',
		name: 'v7.30.4',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.30.4',
		body: '## [7.30.4](https://github.com/testing-library/dom-testing-library/compare/v7.30.3...v7.30.4) (2021-04-22)\n\n\n### Bug Fixes\n\n* Guard against `jest.useRealTimers` not existing ([#934](https://github.com/testing-library/dom-testing-library/issues/934)) ([1b19094](https://github.com/testing-library/dom-testing-library/commit/1b19094d6531f365c4bb317043267df75bdd5bbc))\n\n\n\n',
	},
	{
		id: 40743625,
		tag_name: 'v7.30.3',
		name: 'v7.30.3',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.30.3',
		body: '## [7.30.3](https://github.com/testing-library/dom-testing-library/compare/v7.30.2...v7.30.3) (2021-03-31)\n\n\n### Bug Fixes\n\n* **types:** missing ignore parameter for SelectorMatcherOptions ([7edd2bd](https://github.com/testing-library/dom-testing-library/commit/7edd2bd734f93b79e50059b65dd9beb61bdfae26))\n\n\n\n',
	},
	{
		id: 40687473,
		tag_name: 'v7.30.2',
		name: 'v7.30.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.30.2',
		body: '## [7.30.2](https://github.com/testing-library/dom-testing-library/compare/v7.30.1...v7.30.2) (2021-03-30)\n\n\n### Bug Fixes\n\n* **types:** exclude tsconfig from types folder in publish flow ([#923](https://github.com/testing-library/dom-testing-library/issues/923)) ([bb83d8c](https://github.com/testing-library/dom-testing-library/commit/bb83d8c540e95701826e31897374227b1e1cc33a))\n\n\n\n',
	},
	{
		id: 40434057,
		tag_name: 'v7.30.1',
		name: 'v7.30.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.30.1',
		body: '## [7.30.1](https://github.com/testing-library/dom-testing-library/compare/v7.30.0...v7.30.1) (2021-03-25)\n\n\n### Bug Fixes\n\n* **timers:** safe check for setImmediate and clearImmediate ([#916](https://github.com/testing-library/dom-testing-library/issues/916)) ([14788b6](https://github.com/testing-library/dom-testing-library/commit/14788b6098242ce62037ba748f4402042d170b41))\n\n\n\n',
	},
	{
		id: 39393472,
		tag_name: 'v7.30.0',
		name: 'v7.30.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.30.0',
		body: '# [7.30.0](https://github.com/testing-library/dom-testing-library/compare/v7.29.6...v7.30.0) (2021-03-07)\n\n\n### Features\n\n* Improve error message when passing an Array while a single Element is expected ([#906](https://github.com/testing-library/dom-testing-library/issues/906)) ([300bfe2](https://github.com/testing-library/dom-testing-library/commit/300bfe26f253b8f045da24bf3c75a83d1cc0f49c))\n\n\n\n',
	},
	{
		id: 38335936,
		tag_name: 'v7.29.6',
		name: 'v7.29.6',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.29.6',
		body: "## [7.29.6](https://github.com/testing-library/dom-testing-library/compare/v7.29.5...v7.29.6) (2021-02-19)\n\n\n### Bug Fixes\n\n* Don't assume mocked timers imply jest fake timers ([#900](https://github.com/testing-library/dom-testing-library/issues/900)) ([f7b5c33](https://github.com/testing-library/dom-testing-library/commit/f7b5c33c44632fba1579cb44f9f175be1ec46087))\n\n\n\n",
	},
	{
		id: 38318154,
		tag_name: 'v7.29.5',
		name: 'v7.29.5',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.29.5',
		body: '## [7.29.5](https://github.com/testing-library/dom-testing-library/compare/v7.29.4...v7.29.5) (2021-02-19)\n\n\n### Bug Fixes\n\n* remove side-effect from runWithRealTimers ([#887](https://github.com/testing-library/dom-testing-library/issues/887)) ([ac9a6b7](https://github.com/testing-library/dom-testing-library/commit/ac9a6b78968e39547d1383e51f74752259fbe2f2))\n\n\n\n',
	},
	{
		id: 36282226,
		tag_name: 'v7.29.4',
		name: 'v7.29.4',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.29.4',
		body: '## [7.29.4](https://github.com/testing-library/dom-testing-library/compare/v7.29.3...v7.29.4) (2021-01-12)\n\n\n### Bug Fixes\n\n* Pass container from findBy through to waitFor ([#868](https://github.com/testing-library/dom-testing-library/issues/868)) ([b4f1d45](https://github.com/testing-library/dom-testing-library/commit/b4f1d458dde88ad78317f63e418d7400eacd1d39))\n\n\n\n',
	},
	{
		id: 36281143,
		tag_name: 'v7.29.3',
		name: 'v7.29.3',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.29.3',
		body: '## [7.29.3](https://github.com/testing-library/dom-testing-library/compare/v7.29.2...v7.29.3) (2021-01-12)\n\n\n### Bug Fixes\n\n* prevent crashing on elements without parentElement ([#871](https://github.com/testing-library/dom-testing-library/issues/871)) ([6d32457](https://github.com/testing-library/dom-testing-library/commit/6d324572ec148b0a0897177e00180024c23b4612))\n\n\n\n',
	},
	{
		id: 36087983,
		tag_name: 'v7.29.2',
		name: 'v7.29.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.29.2',
		body: '## [7.29.2](https://github.com/testing-library/dom-testing-library/compare/v7.29.1...v7.29.2) (2021-01-07)\n\n\n### Bug Fixes\n\n* add normalizer for matching aria-label ([#855](https://github.com/testing-library/dom-testing-library/issues/855)) ([5831f60](https://github.com/testing-library/dom-testing-library/commit/5831f608bb0225233f1d8c5aa555328ca0c72b0b))\n\n\n\n',
	},
	{
		id: 35940820,
		tag_name: 'v7.29.1',
		name: 'v7.29.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.29.1',
		body: '## [7.29.1](https://github.com/testing-library/dom-testing-library/compare/v7.29.0...v7.29.1) (2021-01-04)\n\n\n### Bug Fixes\n\n* add number support for matches ([#856](https://github.com/testing-library/dom-testing-library/issues/856)) ([ec1b642](https://github.com/testing-library/dom-testing-library/commit/ec1b642ba6069cbe5a85db649a939ff00d434343))\n\n\n\n',
	},
	{
		id: 35155837,
		tag_name: 'v7.29.0',
		name: 'v7.29.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.29.0',
		body: '# [7.29.0](https://github.com/testing-library/dom-testing-library/compare/v7.28.1...v7.29.0) (2020-12-11)\n\n\n### Features\n\n* migrate some files to typescript ([#848](https://github.com/testing-library/dom-testing-library/issues/848)) ([accb6cc](https://github.com/testing-library/dom-testing-library/commit/accb6cc60628cb6b5bd4d9be2ead41724995e5ae))\n\n\n\n',
	},
	{
		id: 34252998,
		tag_name: 'v7.28.1',
		name: 'v7.28.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.28.1',
		body: "## [7.28.1](https://github.com/testing-library/dom-testing-library/compare/v7.28.0...v7.28.1) (2020-11-20)\n\n\n### Bug Fixes\n\n* **suggestions:** don't suggest byLabelText when using byLabelText ([53f29f7](https://github.com/testing-library/dom-testing-library/commit/53f29f70c8861d6ed7f9071654360d57a58ca95b))\n\n\n\n",
	},
	{
		id: 34178602,
		tag_name: 'v7.28.0',
		name: 'v7.28.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.28.0',
		body: '# [7.28.0](https://github.com/testing-library/dom-testing-library/compare/v7.27.1...v7.28.0) (2020-11-19)\n\n\n### Features\n\n* warn when the test environment fake timers change unexpectedly ([#832](https://github.com/testing-library/dom-testing-library/issues/832)) ([e3fc7f3](https://github.com/testing-library/dom-testing-library/commit/e3fc7f3a0d29921a5821d361394446968d77eca5)), closes [#830](https://github.com/testing-library/dom-testing-library/issues/830)\n\n\n\n',
	},
	{
		id: 34120416,
		tag_name: 'v7.27.1',
		name: 'v7.27.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.27.1',
		body: '## [7.27.1](https://github.com/testing-library/dom-testing-library/compare/v7.27.0...v7.27.1) (2020-11-18)\n\n\n### Bug Fixes\n\n* **suggestions:** only warn about inaccessible elements when actually showing the suggestion ([#827](https://github.com/testing-library/dom-testing-library/issues/827)) ([9494fdc](https://github.com/testing-library/dom-testing-library/commit/9494fdc690af8b257010b2cff61b2515017b4f67))\n\n\n\n',
	},
	{
		id: 34098153,
		tag_name: 'v7.27.0',
		name: 'v7.27.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.27.0',
		body: '# [7.27.0](https://github.com/testing-library/dom-testing-library/compare/v7.26.7...v7.27.0) (2020-11-18)\n\n\n### Features\n\n* allow TextMatch to be any non-nullable type ([#829](https://github.com/testing-library/dom-testing-library/issues/829)) ([9b688f8](https://github.com/testing-library/dom-testing-library/commit/9b688f8600dc8d0c2feb2590a14e5e9588dde45c))\n\n\n\n',
	},
	{
		id: 34068727,
		tag_name: 'v7.26.7',
		name: 'v7.26.7',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.26.7',
		body: '## [7.26.7](https://github.com/testing-library/dom-testing-library/compare/v7.26.6...v7.26.7) (2020-11-17)\n\n\n### Bug Fixes\n\n* use node property instead of selector for type=text input ([#823](https://github.com/testing-library/dom-testing-library/issues/823)) ([7e5da11](https://github.com/testing-library/dom-testing-library/commit/7e5da11655ed2bc58afaffaa89489ea49df2729a))\n\n\n\n',
	},
	{
		id: 33734431,
		tag_name: 'v7.26.6',
		name: 'v7.26.6',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.26.6',
		body: '## [7.26.6](https://github.com/testing-library/dom-testing-library/compare/v7.26.5...v7.26.6) (2020-11-10)\n\n\n### Bug Fixes\n\n* export pretty format ([#818](https://github.com/testing-library/dom-testing-library/issues/818)) ([e32937c](https://github.com/testing-library/dom-testing-library/commit/e32937ce4eb5b5f26ffdac5eeb82d62e0ac05476))\n\n\n\n',
	},
	{
		id: 33434552,
		tag_name: 'v7.26.5',
		name: 'v7.26.5',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.26.5',
		body: '## [7.26.5](https://github.com/testing-library/dom-testing-library/compare/v7.26.4...v7.26.5) (2020-11-04)\n\n\n### Bug Fixes\n\n* null labels on hidden inputs ([#804](https://github.com/testing-library/dom-testing-library/issues/804)) ([6ef63b7](https://github.com/testing-library/dom-testing-library/commit/6ef63b762b861323033e20f8cef0f77c53ca9990)), closes [/github.com/testing-library/dom-testing-library/blob/62f4e5e09a4b81ef66679560b540523edccdef98/src/queries/label-text.js#L52](https://github.com//github.com/testing-library/dom-testing-library/blob/62f4e5e09a4b81ef66679560b540523edccdef98/src/queries/label-text.js/issues/L52)\n\n\n\n',
	},
	{
		id: 33384430,
		tag_name: 'v7.26.4',
		name: 'v7.26.4',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.26.4',
		body: '## [7.26.4](https://github.com/testing-library/dom-testing-library/compare/v7.26.3...v7.26.4) (2020-11-03)\n\n\n### Bug Fixes\n\n* Disconnect MutationObserver synchronously in wait-for ([#801](https://github.com/testing-library/dom-testing-library/issues/801)) ([2cb8405](https://github.com/testing-library/dom-testing-library/commit/2cb8405736ca2a88954b0575a9df627fff72a1cc))\n\n\n\n',
	},
	{
		id: 32801660,
		tag_name: 'v7.26.3',
		name: 'v7.26.3',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.26.3',
		body: '## [7.26.3](https://github.com/testing-library/dom-testing-library/compare/v7.26.2...v7.26.3) (2020-10-20)\n\n\n### Bug Fixes\n\n* Use import instead of require ([#796](https://github.com/testing-library/dom-testing-library/issues/796)) ([a386d87](https://github.com/testing-library/dom-testing-library/commit/a386d8733594ec96b472b50aef09ac62ba7ccd75))\n\n\n\n',
	},
	{
		id: 32790151,
		tag_name: 'v7.26.2',
		name: 'v7.26.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.26.2',
		body: '## [7.26.2](https://github.com/testing-library/dom-testing-library/compare/v7.26.1...v7.26.2) (2020-10-20)\n\n\n### Bug Fixes\n\n* **types:** make third and fourth params optional for findAllBy and findBy built queries ([#794](https://github.com/testing-library/dom-testing-library/issues/794)) ([9387b08](https://github.com/testing-library/dom-testing-library/commit/9387b0877ab0c5c83413204cc4f1af555e70c38b))\n\n\n\n',
	},
	{
		id: 32780719,
		tag_name: 'v7.26.1',
		name: 'v7.26.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.26.1',
		body: '## [7.26.1](https://github.com/testing-library/dom-testing-library/compare/v7.26.0...v7.26.1) (2020-10-19)\n\n\n### Bug Fixes\n\n* getByLabelText for output ([#789](https://github.com/testing-library/dom-testing-library/issues/789)) ([bc65b91](https://github.com/testing-library/dom-testing-library/commit/bc65b91fed81d900e8eb2aff1813752a4f487869))\n\n\n\n',
	},
	{
		id: 32516635,
		tag_name: 'v7.26.0',
		name: 'v7.26.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.26.0',
		body: '# [7.26.0](https://github.com/testing-library/dom-testing-library/compare/v7.25.0...v7.26.0) (2020-10-13)\n\n\n### Features\n\n* add logPlaygroundUrl in screen ([#781](https://github.com/testing-library/dom-testing-library/issues/781)) ([f627ade](https://github.com/testing-library/dom-testing-library/commit/f627ade1d8169db6113181a3893c847c10fa3ee2))\n\n\n\n',
	},
	{
		id: 32475052,
		tag_name: 'v7.25.0',
		name: 'v7.25.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.25.0',
		body: '# [7.25.0](https://github.com/testing-library/dom-testing-library/compare/v7.24.5...v7.25.0) (2020-10-12)\n\n\n### Features\n\n* **waitFor:** allow returning a promise ([#782](https://github.com/testing-library/dom-testing-library/issues/782)) ([4e5e533](https://github.com/testing-library/dom-testing-library/commit/4e5e533e7922099bc0f95a0c492cb0a5705c7ee7))\n\n\n\n',
	},
	{
		id: 32236370,
		tag_name: 'v7.24.5',
		name: 'v7.24.5',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.24.5',
		body: '## [7.24.5](https://github.com/testing-library/dom-testing-library/compare/v7.24.4...v7.24.5) (2020-10-06)\n\n\n### Bug Fixes\n\n* element error delegation ([#777](https://github.com/testing-library/dom-testing-library/issues/777)) ([0d7294f](https://github.com/testing-library/dom-testing-library/commit/0d7294f4e1b6da5e3d3593abf77ecbfbb976f1be))\n\n\n\n',
	},
	{
		id: 32181089,
		tag_name: 'v7.24.4',
		name: 'v7.24.4',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.24.4',
		body: '## [7.24.4](https://github.com/testing-library/dom-testing-library/compare/v7.24.3...v7.24.4) (2020-10-05)\n\n\n### Bug Fixes\n\n* createEvent type ([#776](https://github.com/testing-library/dom-testing-library/issues/776)) ([9b08b70](https://github.com/testing-library/dom-testing-library/commit/9b08b705c1f9135e64eb628397af3bbb51482cdc))\n\n\n\n',
	},
	{
		id: 31802009,
		tag_name: 'v7.24.3',
		name: 'v7.24.3',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.24.3',
		body: '## [7.24.3](https://github.com/testing-library/dom-testing-library/compare/v7.24.2...v7.24.3) (2020-09-25)\n\n\n### Bug Fixes\n\n* Mark deprecated methods as `[@deprecated](https://github.com/deprecated)` ([#771](https://github.com/testing-library/dom-testing-library/issues/771)) ([68f8f81](https://github.com/testing-library/dom-testing-library/commit/68f8f81d433d7c647a1daf5797feb8384c539358))\n\n\n\n',
	},
	{
		id: 31215657,
		tag_name: 'v7.24.2',
		name: 'v7.24.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.24.2',
		body: '## [7.24.2](https://github.com/testing-library/dom-testing-library/compare/v7.24.1...v7.24.2) (2020-09-13)\n\n\n### Bug Fixes\n\n* **events:** got-/lostpointercapture bubble ([#767](https://github.com/testing-library/dom-testing-library/issues/767)) ([3154dc4](https://github.com/testing-library/dom-testing-library/commit/3154dc421c8837bd3453eae574244b602dd5b78d))\n\n\n\n',
	},
	{
		id: 30641685,
		tag_name: 'v7.24.1',
		name: 'v7.24.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.24.1',
		body: '## [7.24.1](https://github.com/testing-library/dom-testing-library/compare/v7.24.0...v7.24.1) (2020-09-03)\n\n\n### Bug Fixes\n\n* fix typo in config type properties ([#762](https://github.com/testing-library/dom-testing-library/issues/762)) ([15c01d8](https://github.com/testing-library/dom-testing-library/commit/15c01d812844bb2557283ff3efcf2c3727b6c3cc))\n\n\n\n',
	},
	{
		id: 30602334,
		tag_name: 'v7.24.0',
		name: 'v7.24.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.24.0',
		body: '# [7.24.0](https://github.com/testing-library/dom-testing-library/compare/v7.23.0...v7.24.0) (2020-09-02)\n\n\n### Features\n\n* **debug:** show line and codeframe when using debug ([#733](https://github.com/testing-library/dom-testing-library/issues/733)) ([dfb4aa1](https://github.com/testing-library/dom-testing-library/commit/dfb4aa1fece6d5334ddf170a3b4e4a8e520ea2f2)), closes [#440](https://github.com/testing-library/dom-testing-library/issues/440)\n\n\n\n',
	},
	{
		id: 30236203,
		tag_name: 'v7.23.0',
		name: 'v7.23.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.23.0',
		body: "# [7.23.0](https://github.com/testing-library/dom-testing-library/compare/v7.22.6...v7.23.0) (2020-08-27)\n\n\n### Features\n\n* **ByRole:** Add 'level' option for *ByRole('heading') ([#757](https://github.com/testing-library/dom-testing-library/issues/757)) ([ea52c91](https://github.com/testing-library/dom-testing-library/commit/ea52c91610e6894c2fbfb7c6a94b1dffd3e78af1))\n\n\n\n",
	},
	{
		id: 30065576,
		tag_name: 'v7.22.6',
		name: 'v7.22.6',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.22.6',
		body: '## [7.22.6](https://github.com/testing-library/dom-testing-library/compare/v7.22.5...v7.22.6) (2020-08-24)\n\n\n### Bug Fixes\n\n* getByTitle returning element matching textContent instead of title ([#753](https://github.com/testing-library/dom-testing-library/issues/753)) ([388db21](https://github.com/testing-library/dom-testing-library/commit/388db210f5099d967db8aad8c28b5bf748ae3144)), closes [#741](https://github.com/testing-library/dom-testing-library/issues/741)\n\n\n\n',
	},
	{
		id: 30018532,
		tag_name: 'v7.22.5',
		name: 'v7.22.5',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.22.5',
		body: '## [7.22.5](https://github.com/testing-library/dom-testing-library/compare/v7.22.4...v7.22.5) (2020-08-22)\n\n\n### Bug Fixes\n\n* suggest hidden:true with getByRole if element is inaccessible  ([#745](https://github.com/testing-library/dom-testing-library/issues/745)) ([6d6641d](https://github.com/testing-library/dom-testing-library/commit/6d6641d17ad808ba068e58b4119b2f1b64c0f4ac))\n\n\n\n',
	},
	{
		id: 30015640,
		tag_name: 'v7.22.4',
		name: 'v7.22.4',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.22.4',
		body: '## [7.22.4](https://github.com/testing-library/dom-testing-library/compare/v7.22.3...v7.22.4) (2020-08-22)\n\n\n### Bug Fixes\n\n* bump pretty-format ([#751](https://github.com/testing-library/dom-testing-library/issues/751)) ([9cbc428](https://github.com/testing-library/dom-testing-library/commit/9cbc4280d4eceddc5511c21114455f73cd31d196))\n\n\n\n',
	},
	{
		id: 29943679,
		tag_name: 'v7.22.3',
		name: 'v7.22.3',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.22.3',
		body: '## [7.22.3](https://github.com/testing-library/dom-testing-library/compare/v7.22.2...v7.22.3) (2020-08-20)\n\n\n### Bug Fixes\n\n* update dom-accessibility-api ([#748](https://github.com/testing-library/dom-testing-library/issues/748)) ([1bcf60e](https://github.com/testing-library/dom-testing-library/commit/1bcf60effbfc8e8c50924fa099fb94b84e6b8335))\n\n\n\n',
	},
	{
		id: 29652999,
		tag_name: 'v7.22.2',
		name: 'v7.22.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.22.2',
		body: '## [7.22.2](https://github.com/testing-library/dom-testing-library/compare/v7.22.1...v7.22.2) (2020-08-13)\n\n\n### Bug Fixes\n\n* **fireEvent:** copy non-enumerable data transfer props ([#734](https://github.com/testing-library/dom-testing-library/issues/734)) ([b1659cf](https://github.com/testing-library/dom-testing-library/commit/b1659cfabe63a01497820868fadf4baf126fc0f6)), closes [#727](https://github.com/testing-library/dom-testing-library/issues/727)\n\n\n\n',
	},
	{
		id: 29535201,
		tag_name: 'v7.22.1',
		name: 'v7.22.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.22.1',
		body: '## [7.22.1](https://github.com/testing-library/dom-testing-library/compare/v7.22.0...v7.22.1) (2020-08-10)\n\n\n### Bug Fixes\n\n* Ignore pseudo elements for accessible name by default ([#736](https://github.com/testing-library/dom-testing-library/issues/736)) ([01e0242](https://github.com/testing-library/dom-testing-library/commit/01e0242b856363ea0fd48179918ecb25ff17166b))\n\n\n\n',
	},
	{
		id: 29410443,
		tag_name: 'v7.22.0',
		name: 'v7.22.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.22.0',
		body: '# [7.22.0](https://github.com/testing-library/dom-testing-library/compare/v7.21.8...v7.22.0) (2020-08-06)\n\n\n### Features\n\n* **role:** support `{pressed: true}` for buttons ([#729](https://github.com/testing-library/dom-testing-library/issues/729)) ([372ac60](https://github.com/testing-library/dom-testing-library/commit/372ac60bc5cb74d42b527ebe1df17773537c68d7)), closes [#692](https://github.com/testing-library/dom-testing-library/issues/692)\n\n\n\n',
	},
	{
		id: 29347091,
		tag_name: 'v7.21.8',
		name: 'v7.21.8',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.21.8',
		body: '## [7.21.8](https://github.com/testing-library/dom-testing-library/compare/v7.21.7...v7.21.8) (2020-08-05)\n\n\n### Bug Fixes\n\n* **ByLabelText:** support IE and other legacy browsers ([#726](https://github.com/testing-library/dom-testing-library/issues/726)) ([f83f8e9](https://github.com/testing-library/dom-testing-library/commit/f83f8e96e9db7a3b67305baefb7972191625034a)), closes [#723](https://github.com/testing-library/dom-testing-library/issues/723)\n\n\n\n',
	},
	{
		id: 29143346,
		tag_name: 'v7.21.7',
		name: 'v7.21.7',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.21.7',
		body: '## [7.21.7](https://github.com/testing-library/dom-testing-library/compare/v7.21.6...v7.21.7) (2020-07-30)\n\n\n### Bug Fixes\n\n* **TS:** add missing config fields to type ([#724](https://github.com/testing-library/dom-testing-library/issues/724)) ([54aebf7](https://github.com/testing-library/dom-testing-library/commit/54aebf7ae2d70b8b4a187e44a31360bc8a130826))\n\n\n\n',
	},
	{
		id: 29070907,
		tag_name: 'v7.21.6',
		name: 'v7.21.6',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.21.6',
		body: '## [7.21.6](https://github.com/testing-library/dom-testing-library/compare/v7.21.5...v7.21.6) (2020-07-29)\n\n\n### Bug Fixes\n\n* **ByLabelText:** improve error message for invalid labels ([#720](https://github.com/testing-library/dom-testing-library/issues/720)) ([92f03c5](https://github.com/testing-library/dom-testing-library/commit/92f03c51fe0f2e9490f8278db3b2769e1bb122e6)), closes [#716](https://github.com/testing-library/dom-testing-library/issues/716) [#716](https://github.com/testing-library/dom-testing-library/issues/716)\n\n\n\n',
	},
	{
		id: 28942370,
		tag_name: 'v7.21.5',
		name: 'v7.21.5',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.21.5',
		body: '## [7.21.5](https://github.com/testing-library/dom-testing-library/compare/v7.21.4...v7.21.5) (2020-07-25)\n\n\n### Bug Fixes\n\n* add explicit error message for null or undefined matchers ([#718](https://github.com/testing-library/dom-testing-library/issues/718)) ([22988a6](https://github.com/testing-library/dom-testing-library/commit/22988a6b148d5a380cf8bb8cb78c2f7984950d68))\n\n\n\n',
	},
	{
		id: 28781259,
		tag_name: 'v7.21.4',
		name: 'v7.21.4',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.21.4',
		body: '## [7.21.4](https://github.com/testing-library/dom-testing-library/compare/v7.21.3...v7.21.4) (2020-07-21)\n\n\n### Bug Fixes\n\n* aria-labelledby with not found id ([#710](https://github.com/testing-library/dom-testing-library/issues/710)) ([#711](https://github.com/testing-library/dom-testing-library/issues/711)) ([f854cde](https://github.com/testing-library/dom-testing-library/commit/f854cde7cef103c939c40f3b56c11543604ce627))\n\n\n\n',
	},
	{
		id: 28759769,
		tag_name: 'v7.21.3',
		name: 'v7.21.3',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.21.3',
		body: '## [7.21.3](https://github.com/testing-library/dom-testing-library/compare/v7.21.2...v7.21.3) (2020-07-20)\n\n\n### Bug Fixes\n\n* **ByLabelText:** aria-labelledby query selector ([#708](https://github.com/testing-library/dom-testing-library/issues/708)) ([395d5c5](https://github.com/testing-library/dom-testing-library/commit/395d5c520b18383ab178c93819dcf54e550603ee))\n\n\n\n',
	},
	{
		id: 28753374,
		tag_name: 'v7.21.2',
		name: 'v7.21.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.21.2',
		body: '## [7.21.2](https://github.com/testing-library/dom-testing-library/compare/v7.21.1...v7.21.2) (2020-07-20)\n\n\n### Bug Fixes\n\n* **ByLabelText:** get by label concat values ([#681](https://github.com/testing-library/dom-testing-library/issues/681)) ([53e0d18](https://github.com/testing-library/dom-testing-library/commit/53e0d18d1d31688c3b1c9a7ee15e1159c02d47f1)), closes [#545](https://github.com/testing-library/dom-testing-library/issues/545)\n\n\n\n',
	},
	{
		id: 28678553,
		tag_name: 'v7.21.1',
		name: 'v7.21.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.21.1',
		body: '## [7.21.1](https://github.com/testing-library/dom-testing-library/compare/v7.21.0...v7.21.1) (2020-07-17)\n\n\n### Bug Fixes\n\n* **types:** allow bound function to accept string and regex matcher ([1582c73](https://github.com/testing-library/dom-testing-library/commit/1582c7327961e2db4c2c72d30bcce49a2c9d1f2f))\n* by role types ([ea7a71d](https://github.com/testing-library/dom-testing-library/commit/ea7a71db45aa8e6ea7f5bdcad17777c9c994e2fb))\n\n\n### Reverts\n\n* revert "fix: by role types" ([8391d49](https://github.com/testing-library/dom-testing-library/commit/8391d49ae09e35b9c5093b0941465afaf121e798))\n\n\n\n',
	},
	{
		id: 28585947,
		tag_name: 'v7.21.0',
		name: 'v7.21.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.21.0',
		body: '# [7.21.0](https://github.com/testing-library/dom-testing-library/compare/v7.20.2...v7.21.0) (2020-07-15)\n\n\n### Features\n\n* **role:** support `{checked: true}` for checkbox / radio ([#692](https://github.com/testing-library/dom-testing-library/issues/692)) ([fcdeb31](https://github.com/testing-library/dom-testing-library/commit/fcdeb3169eae47a11171472a49abc4fa29a129d4))\n\n\n\n',
	},
	{
		id: 28520700,
		tag_name: 'v7.20.2',
		name: 'v7.20.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.20.2',
		body: '## [7.20.2](https://github.com/testing-library/dom-testing-library/compare/v7.20.1...v7.20.2) (2020-07-13)\n\n\n### Bug Fixes\n\n* Consider title for name of svg element ([#695](https://github.com/testing-library/dom-testing-library/issues/695)) ([2215770](https://github.com/testing-library/dom-testing-library/commit/2215770f6d3c5c9666f88f53106a13bdd9513c8f))\n\n\n\n',
	},
	{
		id: 28482015,
		tag_name: 'v7.20.1',
		name: 'v7.20.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.20.1',
		body: '## [7.20.1](https://github.com/testing-library/dom-testing-library/compare/v7.20.0...v7.20.1) (2020-07-12)\n\n\n### Bug Fixes\n\n* escape regexps that are used as query suggestion arguments ([#694](https://github.com/testing-library/dom-testing-library/issues/694)) ([aaceea2](https://github.com/testing-library/dom-testing-library/commit/aaceea28ed85032c084d853ea6522a530647e517))\n\n\n\n',
	},
	{
		id: 28151321,
		tag_name: 'v7.20.0',
		name: 'v7.20.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.20.0',
		body: '# [7.20.0](https://github.com/testing-library/dom-testing-library/compare/v7.19.0...v7.20.0) (2020-07-02)\n\n\n### Features\n\n* add allowed roles to role query types ([#670](https://github.com/testing-library/dom-testing-library/issues/670)) ([9ae9244](https://github.com/testing-library/dom-testing-library/commit/9ae92446762c15259e18ea3a398ddd8cb7afbc97))\n\n\n\n',
	},
	{
		id: 28003456,
		tag_name: 'v7.19.0',
		name: 'v7.19.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.19.0',
		body: '# [7.19.0](https://github.com/testing-library/dom-testing-library/compare/v7.18.2...v7.19.0) (2020-06-28)\n\n\n### Features\n\n* lists elements that matched multiple error ([#678](https://github.com/testing-library/dom-testing-library/issues/678)) ([639294c](https://github.com/testing-library/dom-testing-library/commit/639294c6e24ee9f06f214c57383e202b4c3b14b4))\n\n\n\n',
	},
	{
		id: 28001232,
		tag_name: 'v7.18.2',
		name: 'v7.18.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.18.2',
		body: '## [7.18.2](https://github.com/testing-library/dom-testing-library/compare/v7.18.1...v7.18.2) (2020-06-28)\n\n\n### Bug Fixes\n\n* add matcher name to multiple elements error ([#677](https://github.com/testing-library/dom-testing-library/issues/677)) ([aefebfb](https://github.com/testing-library/dom-testing-library/commit/aefebfbc6a6f91e063baf5ac8fc3dc3471c866e8))\n\n\n\n',
	},
	{
		id: 27921361,
		tag_name: 'v7.18.1',
		name: 'v7.18.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.18.1',
		body: '## [7.18.1](https://github.com/testing-library/dom-testing-library/compare/v7.18.0...v7.18.1) (2020-06-25)\n\n\n### Bug Fixes\n\n* use the first label for LabelText query suggestions ([#672](https://github.com/testing-library/dom-testing-library/issues/672)) ([373dbc4](https://github.com/testing-library/dom-testing-library/commit/373dbc400689f4c9c987192b6ecf85b0f7de2e31))\n\n\n\n',
	},
	{
		id: 27892449,
		tag_name: 'v7.18.0',
		name: 'v7.18.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.18.0',
		body: '# [7.18.0](https://github.com/testing-library/dom-testing-library/compare/v7.17.2...v7.18.0) (2020-06-24)\n\n\n### Features\n\n* **waitFor:** add onTimeout which adds DOM output to timeout errors ([#671](https://github.com/testing-library/dom-testing-library/issues/671)) ([6bc8e2e](https://github.com/testing-library/dom-testing-library/commit/6bc8e2e7e5c63bed174cffbfeed8318aa2cd5a4d)), closes [#559](https://github.com/testing-library/dom-testing-library/issues/559)\n\n\n\n',
	},
	{
		id: 27874519,
		tag_name: 'v7.17.2',
		name: 'v7.17.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.17.2',
		body: '## [7.17.2](https://github.com/testing-library/dom-testing-library/compare/v7.17.1...v7.17.2) (2020-06-24)\n\n\n### Bug Fixes\n\n* add getConfig to types ([#668](https://github.com/testing-library/dom-testing-library/issues/668)) ([86205e5](https://github.com/testing-library/dom-testing-library/commit/86205e5ba38451e81f96ed021f53be9f3b716a3e))\n\n\n\n',
	},
	{
		id: 27848413,
		tag_name: 'v7.17.1',
		name: 'v7.17.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.17.1',
		body: '## [7.17.1](https://github.com/testing-library/dom-testing-library/compare/v7.17.0...v7.17.1) (2020-06-23)\n\n\n### Bug Fixes\n\n* **waitFor:** handle odd timing issue with fake timers ([#667](https://github.com/testing-library/dom-testing-library/issues/667)) ([4ad3673](https://github.com/testing-library/dom-testing-library/commit/4ad36733bbd5d821b4e5878a76d9d9da9ce55dde))\n\n\n\n',
	},
	{
		id: 27837048,
		tag_name: 'v7.17.0',
		name: 'v7.17.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.17.0',
		body: "# [7.17.0](https://github.com/testing-library/dom-testing-library/compare/v7.16.3...v7.17.0) (2020-06-23)\r\n\r\n\r\n### Features\r\n\r\n* **waitFor:** add complete support for fake timers ([#662](https://github.com/testing-library/dom-testing-library/issues/662)) ([5b2640a](https://github.com/testing-library/dom-testing-library/commit/5b2640aca66b9ccf611baa88188e0807df3a73c7)), closes [#661](https://github.com/testing-library/dom-testing-library/issues/661)\r\n\r\n🚨 It's possible this will break your tests if you were working around our limitations before. Fixing the issue should be straightforward. Here's an example from my (Kent's) own workaround:\r\n\r\n```diff\r\n  // using fake timers to skip debounce time\r\n  jest.useFakeTimers()\r\n  userEvent.clear(notesTextarea)\r\n  userEvent.type(notesTextarea, newNotes)\r\n- act(() => jest.runAllTimers())\r\n\r\n  await screen.findByLabelText(/loading/i)\r\n  // wait for the loading spinner to go away\r\n  await waitForLoadingToFinish()\r\n\r\n  jest.useRealTimers()\r\n```\r\n\r\nNotice that all I needed to change was removing manually advancing timers because now we handle things automatically for you 🎉",
	},
	{
		id: 27816858,
		tag_name: 'v7.16.3',
		name: 'v7.16.3',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.16.3',
		body: "## [7.16.3](https://github.com/testing-library/dom-testing-library/compare/v7.16.2...v7.16.3) (2020-06-23)\n\n\n### Bug Fixes\n\n* Don't recommend ByRole if role is `generic` ([#664](https://github.com/testing-library/dom-testing-library/issues/664)) ([a2a3212](https://github.com/testing-library/dom-testing-library/commit/a2a3212f97fac0aae25ae352fcef19b5f3144147))\n* improve suggested message, can't await getBy ([#655](https://github.com/testing-library/dom-testing-library/issues/655)) ([18b1623](https://github.com/testing-library/dom-testing-library/commit/18b16237fc3c6c462bce4b9e2bd8447d9e6da220))\n* Treat header as banner role ([#656](https://github.com/testing-library/dom-testing-library/issues/656)) ([79142fb](https://github.com/testing-library/dom-testing-library/commit/79142fb563a2ea19e5e8a6f008c67747a5bfbb4b)), closes [#578](https://github.com/testing-library/dom-testing-library/issues/578)\n\n\n\n",
	},
	{
		id: 27657466,
		tag_name: 'v7.16.2',
		name: 'v7.16.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.16.2',
		body: '## [7.16.2](https://github.com/testing-library/dom-testing-library/compare/v7.16.1...v7.16.2) (2020-06-17)\n\n\n### Bug Fixes\n\n* use realTimers when using fakeTimers ([#652](https://github.com/testing-library/dom-testing-library/issues/652)) ([ea22d73](https://github.com/testing-library/dom-testing-library/commit/ea22d73c832b53649124a3123ce7aac535b58224)), closes [#612](https://github.com/testing-library/dom-testing-library/issues/612)\n\n\n\n',
	},
	{
		id: 27580827,
		tag_name: 'v7.16.1',
		name: 'v7.16.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.16.1',
		body: '## [7.16.1](https://github.com/testing-library/dom-testing-library/compare/v7.16.0...v7.16.1) (2020-06-16)\n\n\n### Bug Fixes\n\n* use custom testIdAttribute in getSuggestedQuery ([#651](https://github.com/testing-library/dom-testing-library/issues/651)) ([2c19f4f](https://github.com/testing-library/dom-testing-library/commit/2c19f4fdd09434d68ef445ed6dd252fd141708ca))\n\n\n\n',
	},
	{
		id: 27571697,
		tag_name: 'v7.16.0',
		name: 'v7.16.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.16.0',
		body: '# [7.16.0](https://github.com/testing-library/dom-testing-library/compare/v7.15.1...v7.16.0) (2020-06-15)\n\n\n### Features\n\n* **createEvent:** allow creating  generic events ([#650](https://github.com/testing-library/dom-testing-library/issues/650)) ([df57d7b](https://github.com/testing-library/dom-testing-library/commit/df57d7b86c7523f49b5b2d0909baa2b2ca9000d0))\n\n\n\n',
	},
	{
		id: 27568930,
		tag_name: 'v7.15.1',
		name: 'v7.15.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.15.1',
		body: '## [7.15.1](https://github.com/testing-library/dom-testing-library/compare/v7.15.0...v7.15.1) (2020-06-15)\n\n\n### Bug Fixes\n\n* runWithRealTimers to be compatible with new version of jest ([#649](https://github.com/testing-library/dom-testing-library/issues/649)) ([167b4ac](https://github.com/testing-library/dom-testing-library/commit/167b4acc304b554f03cd16456b63001e9aa4adf1)), closes [#612](https://github.com/testing-library/dom-testing-library/issues/612)\n\n\n\n',
	},
	{
		id: 27541871,
		tag_name: 'v7.15.0',
		name: 'v7.15.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.15.0',
		body: '# [7.15.0](https://github.com/testing-library/dom-testing-library/compare/v7.14.3...v7.15.0) (2020-06-15)\n\n\n### Features\n\n* add explicit error message for Promises passed to getWindowFromNode ([#646](https://github.com/testing-library/dom-testing-library/issues/646)) ([2a51345](https://github.com/testing-library/dom-testing-library/commit/2a513454b5be8d60f125743ba71b28d09b09ebb7)), closes [#609](https://github.com/testing-library/dom-testing-library/issues/609)\n\n\n\n',
	},
	{
		id: 27535580,
		tag_name: 'v7.14.3',
		name: 'v7.14.3',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.14.3',
		body: '## [7.14.3](https://github.com/testing-library/dom-testing-library/compare/v7.14.2...v7.14.3) (2020-06-14)\n\n\n### Bug Fixes\n\n* **TS:** fix typo in type definition for suggestions ([#642](https://github.com/testing-library/dom-testing-library/issues/642)) ([d5e17bd](https://github.com/testing-library/dom-testing-library/commit/d5e17bd63c5c339d4ae29e0090f449b2c8364755))\n\n\n\n',
	},
	{
		id: 27526070,
		tag_name: 'v7.14.2',
		name: 'v7.14.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.14.2',
		body: '## [7.14.2](https://github.com/testing-library/dom-testing-library/compare/v7.14.1...v7.14.2) (2020-06-14)\n\n\n### Bug Fixes\n\n* **TS:** waitForElementToBeRemoved: fix return type ([#631](https://github.com/testing-library/dom-testing-library/issues/631)) ([418581f](https://github.com/testing-library/dom-testing-library/commit/418581fe6a2bb3ad5d569e5721583246c712fcff)), closes [#610](https://github.com/testing-library/dom-testing-library/issues/610)\n* typescript definitions for suggestions ([#630](https://github.com/testing-library/dom-testing-library/issues/630)) ([7f8a15e](https://github.com/testing-library/dom-testing-library/commit/7f8a15e2c7e4753f4b5dfb29d2405db726823a6b))\n\n\n\n',
	},
	{
		id: 27522833,
		tag_name: 'v7.14.1',
		name: 'v7.14.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.14.1',
		body: '## [7.14.1](https://github.com/testing-library/dom-testing-library/compare/v7.14.0...v7.14.1) (2020-06-13)\n\n\n### Bug Fixes\n\n* canSuggest should not be case sensitive  ([#628](https://github.com/testing-library/dom-testing-library/issues/628)) ([d6f6d3a](https://github.com/testing-library/dom-testing-library/commit/d6f6d3ad79d24eeeb4e15b7408fec1465c8e8fe2))\n\n\n\n',
	},
	{
		id: 27520083,
		tag_name: 'v7.14.0',
		name: 'v7.14.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.14.0',
		body: '# [7.14.0](https://github.com/testing-library/dom-testing-library/compare/v7.13.0...v7.14.0) (2020-06-13)\n\n\n### Features\n\n* **suggestions:** add option to get specific query suggestions ([#627](https://github.com/testing-library/dom-testing-library/issues/627)) ([30a1ee8](https://github.com/testing-library/dom-testing-library/commit/30a1ee84459f330327c98c4c71c5e47b1cd32e1e))\n\n\n\n',
	},
	{
		id: 27511641,
		tag_name: 'v7.13.0',
		name: 'v7.13.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.13.0',
		body: '# [7.13.0](https://github.com/testing-library/dom-testing-library/compare/v7.12.0...v7.13.0) (2020-06-12)\n\n\n### Bug Fixes\n\n* **TS:** Install TypeScript in development ([#620](https://github.com/testing-library/dom-testing-library/issues/620)) ([084b53f](https://github.com/testing-library/dom-testing-library/commit/084b53ff2297619748586a60522acc15f56f9298))\n\n\n### Features\n\n* support `clipboardData` like `dataTransfer`. ([#585](https://github.com/testing-library/dom-testing-library/issues/585)) ([9592583](https://github.com/testing-library/dom-testing-library/commit/95925838db823049260596bfceeaac68efd16503))\n\n\n\n',
	},
	{
		id: 27460315,
		tag_name: 'v7.12.0',
		name: 'v7.12.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.12.0',
		body: '# [7.12.0](https://github.com/testing-library/dom-testing-library/compare/v7.11.0...v7.12.0) (2020-06-11)\n\n\n### Features\n\n* use regex based TextMatch for suggestions ([#617](https://github.com/testing-library/dom-testing-library/issues/617)) ([b23a2bc](https://github.com/testing-library/dom-testing-library/commit/b23a2bc8a2c570d8faaa76694e05bf781bbe36a0))\n\n\n\n',
	},
	{
		id: 27326938,
		tag_name: 'v7.11.0',
		name: 'v7.11.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.11.0',
		body: '# [7.11.0](https://github.com/testing-library/dom-testing-library/compare/v7.10.1...v7.11.0) (2020-06-08)\n\n\n### Features\n\n* return more data from getSuggestedQuery to support tooling ([#608](https://github.com/testing-library/dom-testing-library/issues/608)) ([a029772](https://github.com/testing-library/dom-testing-library/commit/a029772c8211c26a1b7018979d49c325d5fee03d))\n\n\n\n',
	},
	{
		id: 27274446,
		tag_name: 'v7.10.1',
		name: 'v7.10.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.10.1',
		body: '## [7.10.1](https://github.com/testing-library/dom-testing-library/compare/v7.10.0...v7.10.1) (2020-06-05)\n\n\n### Bug Fixes\n\n* Bump dom-accessibility-api ([#606](https://github.com/testing-library/dom-testing-library/issues/606)) ([fb012de](https://github.com/testing-library/dom-testing-library/commit/fb012debae776f0cfa0f598466e67c1ff254ce4a))\n\n\n\n',
	},
	{
		id: 27244821,
		tag_name: 'v7.10.0',
		name: 'v7.10.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.10.0',
		body: '# [7.10.0](https://github.com/testing-library/dom-testing-library/compare/v7.9.0...v7.10.0) (2020-06-05)\n\n\n### Features\n\n* Add check for container type on queries ([#604](https://github.com/testing-library/dom-testing-library/issues/604)) ([16e41ac](https://github.com/testing-library/dom-testing-library/commit/16e41acf4c738a1566cd9222d9684f75ef8dbffa)), closes [testing-library/dom-testing-library#537](https://github.com/testing-library/dom-testing-library/issues/537)\n\n\n\n',
	},
	{
		id: 27148894,
		tag_name: 'v7.9.0',
		name: 'v7.9.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.9.0',
		body: '# [7.9.0](https://github.com/testing-library/dom-testing-library/compare/v7.8.0...v7.9.0) (2020-06-02)\n\n\n### Features\n\n* **getConfig:** export the getConfig function ([#602](https://github.com/testing-library/dom-testing-library/issues/602)) ([af7392f](https://github.com/testing-library/dom-testing-library/commit/af7392fefbf18ffa189635da53bf63777881755e))\n\n\n\n',
	},
	{
		id: 27114371,
		tag_name: 'v7.8.0',
		name: 'v7.8.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.8.0',
		body: '# [7.8.0](https://github.com/testing-library/dom-testing-library/compare/v7.7.3...v7.8.0) (2020-06-01)\n\n\n### Features\n\n* **config:** add `eventWrapper` config for wrapping fireEvent ([#600](https://github.com/testing-library/dom-testing-library/issues/600)) ([de9dd82](https://github.com/testing-library/dom-testing-library/commit/de9dd82f23bdd7214503847d57c12f69fa9abbee))\n\n\n\n',
	},
	{
		id: 27082017,
		tag_name: 'v7.7.3',
		name: 'v7.7.3',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.7.3',
		body: '## [7.7.3](https://github.com/testing-library/dom-testing-library/compare/v7.7.2...v7.7.3) (2020-06-01)\n\n\n### Bug Fixes\n\n* update config type ([#598](https://github.com/testing-library/dom-testing-library/issues/598)) ([eeb11ec](https://github.com/testing-library/dom-testing-library/commit/eeb11ecd27574ce86d089b54c88742fe49640c67))\n\n\n\n',
	},
	{
		id: 27081520,
		tag_name: 'v7.7.2',
		name: 'v7.7.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.7.2',
		body: '## [7.7.2](https://github.com/testing-library/dom-testing-library/compare/v7.7.1...v7.7.2) (2020-06-01)\n\n\n### Bug Fixes\n\n* more improvements to suggestions ([#599](https://github.com/testing-library/dom-testing-library/issues/599)) ([caf76e3](https://github.com/testing-library/dom-testing-library/commit/caf76e37a0673b56c95df2b4ad17fa122207d475))\n\n\n\n',
	},
	{
		id: 27068910,
		tag_name: 'v7.7.1',
		name: 'v7.7.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.7.1',
		body: '## [7.7.1](https://github.com/testing-library/dom-testing-library/compare/v7.7.0...v7.7.1) (2020-05-31)\n\n\n### Bug Fixes\n\n* handle ignores for ByText in suggestions ([#597](https://github.com/testing-library/dom-testing-library/issues/597)) ([bec190b](https://github.com/testing-library/dom-testing-library/commit/bec190b8ba0b59a70da7a7814e45cfa53fc54b7c))\n\n\n\n',
	},
	{
		id: 27044240,
		tag_name: 'v7.7.0',
		name: 'v7.7.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.7.0',
		body: '# [7.7.0](https://github.com/testing-library/dom-testing-library/compare/v7.6.0...v7.7.0) (2020-05-29)\n\n\n### Features\n\n* suggestions for which query to use ([#586](https://github.com/testing-library/dom-testing-library/issues/586)) ([839dca3](https://github.com/testing-library/dom-testing-library/commit/839dca3989fa35da7ff1bc6c71079f2d82575903))\n\n\n\n',
	},
	{
		id: 27012812,
		tag_name: 'v7.6.0',
		name: 'v7.6.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.6.0',
		body: '# [7.6.0](https://github.com/testing-library/dom-testing-library/compare/v7.5.9...v7.6.0) (2020-05-28)\n\n\n### Features\n\n* Improve performance of ByRole in waitFor* ([#590](https://github.com/testing-library/dom-testing-library/issues/590)) ([709044b](https://github.com/testing-library/dom-testing-library/commit/709044baa1c4ba5e44d104126de7308fc5d9e482))\n\n\n\n',
	},
	{
		id: 26947709,
		tag_name: 'v7.5.9',
		name: 'v7.5.9',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.5.9',
		body: '## [7.5.9](https://github.com/testing-library/dom-testing-library/compare/v7.5.8...v7.5.9) (2020-05-27)\n\n\n### Bug Fixes\n\n* misleading advice in waitForElement deprecation warning ([#588](https://github.com/testing-library/dom-testing-library/issues/588)) ([b641e8d](https://github.com/testing-library/dom-testing-library/commit/b641e8dc1c6c3cbdc62b833dc57056d1f84f82ed))\n\n\n\n',
	},
	{
		id: 26864803,
		tag_name: 'v7.5.8',
		name: 'v7.5.8',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.5.8',
		body: '## [7.5.8](https://github.com/testing-library/dom-testing-library/compare/v7.5.7...v7.5.8) (2020-05-25)\n\n\n### Bug Fixes\n\n* **TS:** Forbid async function as callback argument for waitFor ([#572](https://github.com/testing-library/dom-testing-library/issues/572)) ([c1bf047](https://github.com/testing-library/dom-testing-library/commit/c1bf04789821f3d0cf59df3eefa85a5b337e193d))\n\n\n\n',
	},
	{
		id: 26626719,
		tag_name: 'v7.5.7',
		name: 'v7.5.7',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.5.7',
		body: '## [7.5.7](https://github.com/testing-library/dom-testing-library/compare/v7.5.6...v7.5.7) (2020-05-18)\n\n\n### Bug Fixes\n\n* Consider <caption> and <legend> ([#580](https://github.com/testing-library/dom-testing-library/issues/580)) ([9776d3d](https://github.com/testing-library/dom-testing-library/commit/9776d3d315d7019e6b69827b509a3eb7989e64c3))\n\n\n\n',
	},
	{
		id: 26553541,
		tag_name: 'v7.5.6',
		name: 'v7.5.6',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.5.6',
		body: '## [7.5.6](https://github.com/testing-library/dom-testing-library/compare/v7.5.5...v7.5.6) (2020-05-15)\n\n\n### Bug Fixes\n\n* **types:** add fourth param to build findAllBy and findBy queries ([#574](https://github.com/testing-library/dom-testing-library/issues/574)) ([6491ef1](https://github.com/testing-library/dom-testing-library/commit/6491ef14ca01d7beb529796dc07fbeafbdeb48f4))\n\n\n\n',
	},
	{
		id: 26519401,
		tag_name: 'v7.5.5',
		name: 'v7.5.5',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.5.5',
		body: '## [7.5.5](https://github.com/testing-library/dom-testing-library/compare/v7.5.4...v7.5.5) (2020-05-14)\n\n\n### Bug Fixes\n\n* **TS:** declare first parameter of screen.debug as optional ([#573](https://github.com/testing-library/dom-testing-library/issues/573)) ([dcad11b](https://github.com/testing-library/dom-testing-library/commit/dcad11bbc849897c863b210876f0788f6161cb07))\n\n\n\n',
	},
	{
		id: 26488135,
		tag_name: 'v7.5.4',
		name: 'v7.5.4',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.5.4',
		body: '## [7.5.4](https://github.com/testing-library/dom-testing-library/compare/v7.5.3...v7.5.4) (2020-05-13)\n\n\n### Bug Fixes\n\n* revert pretty-format dependency upgrade ([#571](https://github.com/testing-library/dom-testing-library/issues/571)) ([eb4e0d7](https://github.com/testing-library/dom-testing-library/commit/eb4e0d7db6c74a9f806fa37ba8dac92f8ed73421))\n\n\n\n',
	},
	{
		id: 26487648,
		tag_name: 'v7.5.3',
		name: 'v7.5.3',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.5.3',
		body: '## [7.5.3](https://github.com/testing-library/dom-testing-library/compare/v7.5.2...v7.5.3) (2020-05-13)\n\n\n### Bug Fixes\n\n* Consider explicit role when pretty printing roles ([#568](https://github.com/testing-library/dom-testing-library/issues/568)) ([04b027c](https://github.com/testing-library/dom-testing-library/commit/04b027c4a321c0608bf401328197b4e3993adf99)), closes [#553](https://github.com/testing-library/dom-testing-library/issues/553)\n\n\n\n',
	},
	{
		id: 26406249,
		tag_name: 'v7.5.2',
		name: 'v7.5.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.5.2',
		body: '## [7.5.2](https://github.com/testing-library/dom-testing-library/compare/v7.5.1...v7.5.2) (2020-05-12)\n\n\n### Bug Fixes\n\n* **TS:** add `selected` to `ByRoleOptions` ([#561](https://github.com/testing-library/dom-testing-library/issues/561)) ([32a7bbb](https://github.com/testing-library/dom-testing-library/commit/32a7bbb37c99834b3ce72333f4c8f41a34b2bb77))\n\n\n\n',
	},
	{
		id: 26286068,
		tag_name: 'v7.5.1',
		name: 'v7.5.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.5.1',
		body: '## [7.5.1](https://github.com/testing-library/dom-testing-library/compare/v7.5.0...v7.5.1) (2020-05-07)\n\n\n### Bug Fixes\n\n* **TS:** incorrect imports in types ([#556](https://github.com/testing-library/dom-testing-library/issues/556)) ([af15dd9](https://github.com/testing-library/dom-testing-library/commit/af15dd933d6be7684760400eaedd11ade573afe8))\n\n\n\n',
	},
	{
		id: 26282897,
		tag_name: 'v7.5.0',
		name: 'v7.5.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.5.0',
		body: '# [7.5.0](https://github.com/testing-library/dom-testing-library/compare/v7.4.0...v7.5.0) (2020-05-07)\n\n\n### Features\n\n* **events:** Add dataTransfer event property option ([#554](https://github.com/testing-library/dom-testing-library/issues/554)) ([13bfce3](https://github.com/testing-library/dom-testing-library/commit/13bfce39b7c6f05c95eeb647af63fae61ca99e06))\n* **TS:** move types from DefinitelyTyped ([#530](https://github.com/testing-library/dom-testing-library/issues/530)) ([678f4da](https://github.com/testing-library/dom-testing-library/commit/678f4dabfb17b09e8e7648307a4cee5fb580ab5e))\n\n\n\n',
	},
	{
		id: 26246320,
		tag_name: 'v7.4.0',
		name: 'v7.4.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.4.0',
		body: '# [7.4.0](https://github.com/testing-library/dom-testing-library/compare/v7.3.0...v7.4.0) (2020-05-06)\n\n\n### Bug Fixes\n\n* Exclude container in the list of queryable roles ([#550](https://github.com/testing-library/dom-testing-library/issues/550)) ([7b3ca97](https://github.com/testing-library/dom-testing-library/commit/7b3ca9722d295dc663eda93fb43bdf9ff9307d15))\n\n\n### Features\n\n* **ByRole:** Allow filter by selected state ([#540](https://github.com/testing-library/dom-testing-library/issues/540)) ([752ff66](https://github.com/testing-library/dom-testing-library/commit/752ff667d52efd452273232a6a48319a207c66c2))\n\n\n\n',
	},
	{
		id: 26192996,
		tag_name: 'v7.3.0',
		name: 'v7.3.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.3.0',
		body: '# [7.3.0](https://github.com/testing-library/dom-testing-library/compare/v7.2.2...v7.3.0) (2020-05-05)\n\n\n### Features\n\n* **waitFor:** improve error stack traces for async errors ([#542](https://github.com/testing-library/dom-testing-library/issues/542)) ([d3287a1](https://github.com/testing-library/dom-testing-library/commit/d3287a1ebcff39f267ee59cfc55205c08fbd1c88))\n\n\n\n',
	},
	{
		id: 25867892,
		tag_name: 'v7.2.2',
		name: 'v7.2.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.2.2',
		body: '## [7.2.2](https://github.com/testing-library/dom-testing-library/compare/v7.2.1...v7.2.2) (2020-04-24)\n\n\n### Bug Fixes\n\n* update deprecation warning for waitForElement ([#535](https://github.com/testing-library/dom-testing-library/issues/535)) ([6f0085d](https://github.com/testing-library/dom-testing-library/commit/6f0085dea0c702ad46c2ecf2120e09ae587eef36))\n\n\n\n',
	},
	{
		id: 25253951,
		tag_name: 'v7.2.1',
		name: 'v7.2.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.2.1',
		body: '## [7.2.1](https://github.com/testing-library/dom-testing-library/compare/v7.2.0...v7.2.1) (2020-04-06)\n\n\n### Bug Fixes\n\n* Only return first child element in label query ([#520](https://github.com/testing-library/dom-testing-library/issues/520)) ([402288f](https://github.com/testing-library/dom-testing-library/commit/402288f506fc0a807b063a76f79292629c5d028a))\n\n\n\n',
	},
	{
		id: 25040266,
		tag_name: 'v7.2.0',
		name: 'v7.2.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.2.0',
		body: '# [7.2.0](https://github.com/testing-library/dom-testing-library/compare/v7.1.4...v7.2.0) (2020-03-31)\n\n\n### Features\n\n* **waitFor:** improve error message for non-function callbacks ([#515](https://github.com/testing-library/dom-testing-library/issues/515)) ([672f231](https://github.com/testing-library/dom-testing-library/commit/672f2316d49609572857e7de80251eb052c9cbd1))\n\n\n\n',
	},
	{
		id: 25010913,
		tag_name: 'v7.1.4',
		name: 'v7.1.4',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.1.4',
		body: '## [7.1.4](https://github.com/testing-library/dom-testing-library/compare/v7.1.3...v7.1.4) (2020-03-30)\n\n\n### Bug Fixes\n\n* queryHelpers.getElementError is not a function ([#510](https://github.com/testing-library/dom-testing-library/issues/510)) ([67370d0](https://github.com/testing-library/dom-testing-library/commit/67370d0a25b702cd8504b0efdd82b591d4f06fd8))\n\n\n\n',
	},
	{
		id: 24944337,
		tag_name: 'v7.1.3',
		name: 'v7.1.3',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.1.3',
		body: '## [7.1.3](https://github.com/testing-library/dom-testing-library/compare/v7.1.2...v7.1.3) (2020-03-27)\n\n\n### Bug Fixes\n\n* **fireEvent:** Set composed property on relevant synthetic events ([#496](https://github.com/testing-library/dom-testing-library/issues/496)) ([39dc929](https://github.com/testing-library/dom-testing-library/commit/39dc9290e252379e7e7797a30a17ad1ef36e81fb))\n\n\n\n',
	},
	{
		id: 24915954,
		tag_name: 'v7.1.2',
		name: 'v7.1.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.1.2',
		body: '## [7.1.2](https://github.com/testing-library/dom-testing-library/compare/v7.1.1...v7.1.2) (2020-03-27)\n\n\n### Bug Fixes\n\n* docs referenced old npm package ([#504](https://github.com/testing-library/dom-testing-library/issues/504)) ([105ce65](https://github.com/testing-library/dom-testing-library/commit/105ce65e85c2801a88eaa689fdbfe5ce98fa4969))\n\n\n\n',
	},
	{
		id: 24775581,
		tag_name: 'v7.1.1',
		name: 'v7.1.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.1.1',
		body: '## [7.1.1](https://github.com/testing-library/dom-testing-library/compare/v7.1.0...v7.1.1) (2020-03-23)\n\n\n### Bug Fixes\n\n* Bump types ([#495](https://github.com/testing-library/dom-testing-library/issues/495)) ([e75ae01](https://github.com/testing-library/dom-testing-library/commit/e75ae01df425921390e5d212745229f2311729b2))\n\n\n\n',
	},
	{
		id: 24728158,
		tag_name: 'v7.1.0',
		name: 'v7.1.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.1.0',
		body: '# [7.1.0](https://github.com/testing-library/dom-testing-library/compare/v7.0.4...v7.1.0) (2020-03-20)\n\n\n### Features\n\n* **waitFor*:** improve stacktrace for timeout errors ([#492](https://github.com/testing-library/dom-testing-library/issues/492)) ([02a5b82](https://github.com/testing-library/dom-testing-library/commit/02a5b82da3ff85e9b386fbc251f18aef1438b009)), closes [#491](https://github.com/testing-library/dom-testing-library/issues/491)\n\n\n\n',
	},
	{
		id: 24538891,
		tag_name: 'v7.0.4',
		name: 'v7.0.4',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.0.4',
		body: '## [7.0.4](https://github.com/testing-library/dom-testing-library/compare/v7.0.3...v7.0.4) (2020-03-15)\n\n\n### Bug Fixes\n\n* **allByLabelText:** forEach on NodeList is not supported in edge ([#487](https://github.com/testing-library/dom-testing-library/issues/487)) ([976675b](https://github.com/testing-library/dom-testing-library/commit/976675b2529ed947cb945d58ac07f75323a4599c))\n\n\n\n',
	},
	{
		id: 24502704,
		tag_name: 'v7.0.3',
		name: 'v7.0.3',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.0.3',
		body: '## [7.0.3](https://github.com/testing-library/dom-testing-library/compare/v7.0.2...v7.0.3) (2020-03-13)\n\n\n### Bug Fixes\n\n* corrects deprecation warning for waitForDomChange ([#478](https://github.com/testing-library/dom-testing-library/issues/478)) ([9768a2b](https://github.com/testing-library/dom-testing-library/commit/9768a2b59cc86ef9d77581f1ed9da441f63299e4))\n* support Node >=10 ([#480](https://github.com/testing-library/dom-testing-library/issues/480)) ([d2885c9](https://github.com/testing-library/dom-testing-library/commit/d2885c98ce72bc8c50378778892e7b4d17be1c3f)), closes [#479](https://github.com/testing-library/dom-testing-library/issues/479)\n\n\n\n',
	},
	{
		id: 24482638,
		tag_name: 'v7.0.2',
		name: 'v7.0.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.0.2',
		body: '## [7.0.2](https://github.com/testing-library/dom-testing-library/compare/v7.0.1...v7.0.2) (2020-03-12)\n\n\n### Bug Fixes\n\n* remove very old deprecated method ([98e5bb3](https://github.com/testing-library/dom-testing-library/commit/98e5bb320d8c9d3532ef9d8f8f1e1152fee38acb))\n\n\n\n',
	},
	{
		id: 24482529,
		tag_name: 'v7.0.1',
		name: 'v7.0.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.0.1',
		body: '## [7.0.1](https://github.com/testing-library/dom-testing-library/compare/v7.0.0...v7.0.1) (2020-03-12)\n\n\n### Bug Fixes\n\n* **find*:** waitForElement was still in use ([#476](https://github.com/testing-library/dom-testing-library/issues/476)) ([c0a4eb2](https://github.com/testing-library/dom-testing-library/commit/c0a4eb2c301fcf11a786a18b3008f7cad3a14692))\n\n\n\n',
	},
	{
		id: 24481556,
		tag_name: 'v7.0.0',
		name: 'v7.0.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.0.0',
		body: '# [7.0.0](https://github.com/testing-library/dom-testing-library/compare/v6.15.0...v7.0.0) (2020-03-12)\r\n\r\n### Features\r\n\r\n* **waitFor:** replace `wait` with `waitFor` (read more in the Breaking changes list below) ([2b641e1](https://github.com/testing-library/dom-testing-library/commit/2b641e10ac16eb87fbe6d130be03fcb59c1ad67f)), closes [#376](https://github.com/testing-library/dom-testing-library/issues/376) [#416](https://github.com/testing-library/dom-testing-library/issues/416)\r\n* **waitForElementToBeRemoved:** support passing an element directly ([#460](https://github.com/testing-library/dom-testing-library/issues/460)) ([1b711a4](https://github.com/testing-library/dom-testing-library/commit/1b711a4a0143b532dc8258f9ceac1a1b36557ce0))\r\n\r\nThe new feature in `waitForElementToBeRemoved` is pretty cool. Here\'s what you had to do before:\r\n\r\n```javascript\r\nconst submitButton = screen.getByText(/submit/i)\r\nfireEvent.click(submitButton)\r\nawait waitForElementToBeRemoved(() => screen.getByText(/submit/i))\r\n// submit is now gone\r\n```\r\n\r\nThat still works, but you can now do this too:\r\n\r\n```javascript\r\nconst submitButton = screen.getByText(/submit/i)\r\nfireEvent.click(submitButton)\r\nawait waitForElementToBeRemoved(submitButton)\r\n// submit is now gone\r\n```\r\n\r\nCool right!?\r\n\r\n### BREAKING CHANGES\r\n\r\n#### Drop Node 8\r\n\r\nNode 10 or greater is required. Node 8 is [out of LTS](https://nodejs.org/en/about/releases/) ([#459](https://github.com/testing-library/dom-testing-library/issues/459)) ([c3ab843](https://github.com/testing-library/dom-testing-library/commit/c3ab843c292484428f045671ea22cbb30eb70559)), closes [#430](https://github.com/testing-library/dom-testing-library/issues/430)\r\n\r\n#### MutationObserver shim removed.\r\n\r\nMutationObserver is supported by all major browsers and recent versions of JSDOM. If you need, you can create your own shim (using [`@sheerun/mutationobserver-shim`](https://www.npmjs.com/package/@sheerun/mutationobserver-shim)) and attach it to the `window`. If you\'re on an old version of Jest, either update your version of Jest or use [`jest-environment-jsdom-sixteen`](https://www.npmjs.com/package/jest-environment-jsdom-sixteen) ([#457](https://github.com/testing-library/dom-testing-library/pull/457)) ([e3fdb8e9](https://github.com/testing-library/dom-testing-library/commit/e3fdb8e90c6dafb7d0ea5a2cf8fcf493d5047559))\r\n\r\nIf you\'re using the latest version of `react-scripts` (Create React App), here are your options:\r\n\r\n**Option 1:**\r\n\r\nWait until the `react-scripts` updates to the latest version of Jest (subscribe to [this PR](https://github.com/facebook/create-react-app/pull/8362))\r\n\r\n**Option 2 (recommended):**\r\n\r\nInstall [`jest-environment-jsdom-sixteen`](https://www.npmjs.com/package/jest-environment-jsdom-sixteen) and then update your `test` script:\r\n\r\n```diff\r\n  ...\r\n  "scripts": {\r\n    ...\r\n-   "test": "react-scripts test --env=dom"\r\n+   "test": "react-scripts test --env=jest-environment-jsdom-sixteen"\r\n    ...\r\n  },\r\n  ...\r\n  "devDependencies": {\r\n    ...\r\n    "jest-environment-jsdom-sixteen": "^1.0.3",\r\n    ...\r\n  },\r\n  ...\r\n```\r\n\r\n**Option 3:**\r\n\r\nAdd the MutationObserver constructor to `window` via [`@sheerun/mutationobserver-shim`](https://www.npmjs.com/package/@sheerun/mutationobserver-shim):\r\n\r\n```\r\nnpm install --save-dev @sheerun/mutationobserver-shim\r\n# yarn add --dev @sheerun/mutationobserver-shim\r\n```\r\n\r\n```javascript\r\n// src/setupTests.js\r\nimport MutationObserver from \'@sheerun/mutationobserver-shim\'\r\nwindow.MutationObserver = MutationObserver\r\n```\r\n\r\n#### **waitFor:** `wait` is now deprecated in favor of `waitFor`\r\n\r\n`waitFor` satisfies the use cases of `wait`, `waitForElement`, and `waitForDomChange`, so those have been deprecated (will be removed in the next major version). Here are some examples of how you can change those:\r\n\r\n```diff\r\n- await wait()\r\n+ await waitFor(() => {})\r\n```\r\n\r\nThis should get you going on the upgrade, but it\'s recommended to avoid an empty callback and instead insert an assertion in that callback function. This is because otherwise your test is relying on the "next tick of the event loop" before proceeding, and that\'s not consistent with the philosophy of the library:\r\n\r\n> [The more your tests resemble the way your software is used, the more confidence they can give you.](https://twitter.com/kentcdodds/status/977018512689455106)\r\n\r\nSo it would be better to move the assertion that followed `await wait()` into the callback you provide to `await waitFor(() => { /* assertion here */ })`\r\n\r\nAs for `waitForElement`, that should normally be accomplished with one of the [`find*` queries](https://testing-library.com/docs/dom-testing-library/api-queries#findby):\r\n\r\n```diff\r\n- const element = await waitForElement(() => screen.getByText(/loading/i))\r\n+ const element = await screen.findByText(/loading/i)\r\n```\r\n\r\nHowever, if for some reason you cannot use a `find` query, then `waitFor` should be a find/replace for `waitForElement`:\r\n\r\n```diff\r\n- const element = await waitForElement(() => container.querySelector(\'.loading\'))\r\n+ const element = await waitFor(() => container.querySelector(\'.loading\'))\r\n```\r\n\r\n`waitForDomChange` encouraged testing implementation details because the user doesn\'t care about when the DOM changes, they care about when something appears or disappears from the page, so it\'s better to use `waitFor` with a specific assertion or `waitForElementToBeRemoved` (if that\'s what you\'re actually trying to do):\r\n\r\n```diff\r\n- await waitForDomChange()\r\n+ await waitFor(() => {})\r\n// remember, this is not recommended, provide a specific assertion\r\n\r\n- await waitForDomChange(mutationObserverOptions)\r\n+ await waitFor(() => {}, mutationObserverOptions)\r\n// if you provided mutationObserverOptions, you can provide those as a second argument\r\n```\r\n\r\nNote that `wait` called your callback function on an interval and `waitFor` also does this, but it also calls your callback with the mutation observer as well, which is why it supports the use cases of the deprecated methods so well.\r\n\r\nAnd to be clear, `waitForElementToBeRemoved`, is *not* getting deprecated or removed, in fact, it got a really neat new feature which you can read about above.\r\n\r\n#### default timeout for async utilities is now 1000ms rather than 4500ms\r\n\r\nMost of the time in the kinds of tests that people are writing with DOM Testing Library, if something doesn\'t happen within 1 second, then it probably won\'t happen at all and waiting a full 4.5 seconds is a frustrating amount of time. So that\'s why the default has been changed, however this can be configured when calling the async utility via the `timeout` option and it can also be globally configured: https://testing-library.com/docs/dom-testing-library/api-configuration\r\n\r\n* **ByLabelText:** If you used the `selector` option in `ByLabelText` queries, then you will probably need to update that code to be able to find the label you\'re looking for:\r\n\r\n```diff\r\n // <label for="example-input" class="example">Example</label><input id="example-input" />\r\n- screen.getByLabelText(/example/i, {selector: \'.example\'})\r\n+ screen.getByLabelText(/example/i)\r\n+ // or: screen.getByLabelText(/example/i, {selector: \'#example-input})\r\n```\r\n\r\n#### Changed the `selector` option in `ByLabelText` queries.\r\n\r\nIf you used the `selector` option in `ByLabelText` queries, then you will probably need to update that code to be able to find the label you\'re looking for as a result of [#373](https://github.com/testing-library/dom-testing-library/pull/373).\r\n\r\n',
	},
	{
		id: 24226256,
		tag_name: 'v7.0.0-beta.4',
		name: 'v7.0.0-beta.4',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.0.0-beta.4',
		body: '# [7.0.0-beta.4](https://github.com/testing-library/dom-testing-library/compare/v7.0.0-beta.3...v7.0.0-beta.4) (2020-03-04)\n\n\n### Bug Fixes\n\n* Drop Node 8 ([#459](https://github.com/testing-library/dom-testing-library/issues/459)) ([a3c15bf](https://github.com/testing-library/dom-testing-library/commit/a3c15bfc3932d119230c5b8468622e82c9522a0f))\n\n\n### Features\n\n* **wait:** remove default no-op callback ([#461](https://github.com/testing-library/dom-testing-library/issues/461)) ([734ec39](https://github.com/testing-library/dom-testing-library/commit/734ec3973ee8cb993134bbd6a3590a978cc76488))\n* **waitForElementToBeRemoved:** support passing an element directly ([#460](https://github.com/testing-library/dom-testing-library/issues/460)) ([aef3df1](https://github.com/testing-library/dom-testing-library/commit/aef3df10b74bf8a3accc336e4caac770f03473c7))\n\n\n### BREAKING CHANGES\n\n* **wait:** If you used `wait()` in the past, you now have to supply a callback. Relying on the "next tick" is an implementation detail and should be avoided in favor of explicit expecations within your wait callback.\n* This drops support for Node 8. Node 10 or greater is now required.\n\n\n\n',
	},
	{
		id: 24222253,
		tag_name: 'v7.0.0-beta.3',
		name: 'v7.0.0-beta.3',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.0.0-beta.3',
		body: '# [7.0.0-beta.3](https://github.com/testing-library/dom-testing-library/compare/v7.0.0-beta.2...v7.0.0-beta.3) (2020-03-04)\n\n\n### Features\n\n* remove mutationobserver shim ([#457](https://github.com/testing-library/dom-testing-library/issues/457)) ([5fae126](https://github.com/testing-library/dom-testing-library/commit/5fae126c7fc40c07c5baa923b7023b1d174c2c91)), closes [#413](https://github.com/testing-library/dom-testing-library/issues/413)\n\n\n### BREAKING CHANGES\n\n* MutationObserver is supported by all major browsers and recent versions of JSDOM. If you need, you can create your own shim (using @sheerun/mutationobserver-shim) and attach it to the window.\n\n\n\n',
	},
	{
		id: 24221244,
		tag_name: 'v7.0.0-beta.2',
		name: 'v7.0.0-beta.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.0.0-beta.2',
		body: '# [7.0.0-beta.2](https://github.com/testing-library/dom-testing-library/compare/v7.0.0-beta.1...v7.0.0-beta.2) (2020-03-04)\n\n\n### Features\n\n* **wait:** wait will now also run your callback on DOM changes ([#415](https://github.com/testing-library/dom-testing-library/issues/415)) ([5aa6386](https://github.com/testing-library/dom-testing-library/commit/5aa63866f1f77b1f8d8e9d3bbd95adbb53b38037)), closes [#376](https://github.com/testing-library/dom-testing-library/issues/376)\n\n\n### BREAKING CHANGES\n\n* **wait:** `waitForElement` is deprecated in favor of `find*` queries or `wait`.\n* **wait:** `waitForDomChange` is deprecated in favor of `wait` \n* **wait:** default timeout for async utilities is now 1000ms rather than 4500ms. This can be configured: https://testing-library.com/docs/dom-testing-library/api-configuration\n\n\n\n',
	},
	{
		id: 24221084,
		tag_name: 'v7.0.0-beta.1',
		name: 'v7.0.0-beta.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v7.0.0-beta.1',
		body: "# [7.0.0-beta.1](https://github.com/testing-library/dom-testing-library/compare/v6.15.0...v7.0.0-beta.1) (2020-03-04)\n\n\n### Features\n\n* **ByLabelText:** change selector to match target (not label) ([#373](https://github.com/testing-library/dom-testing-library/issues/373)) ([9526427](https://github.com/testing-library/dom-testing-library/commit/9526427bc1e0edbf3e0700951b60de04bd563b07)), closes [#372](https://github.com/testing-library/dom-testing-library/issues/372)\n\n\n### BREAKING CHANGES\n\n* **ByLabelText:** If you used the `selector` option in `ByLabelText` queries, then you will probably need to update that code to be able to find the label you're looking for.\n\n\n\n",
	},
	{
		id: 24220378,
		tag_name: 'v6.16.0',
		name: 'v6.16.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.16.0',
		body: '# [6.16.0](https://github.com/testing-library/dom-testing-library/compare/v6.15.0...v6.16.0) (2020-03-04)\n\n\n### Features\n\n* **ByLabelText:** change selector to match target (not label) ([#373](https://github.com/testing-library/dom-testing-library/issues/373)) ([9fd422a](https://github.com/testing-library/dom-testing-library/commit/9fd422a4b1eea041432fe0aed4f02f93dc63aa84)), closes [#372](https://github.com/testing-library/dom-testing-library/issues/372)\n\n\n\n',
	},
	{
		id: 24219082,
		tag_name: 'v6.15.0',
		name: 'v6.15.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.15.0',
		body: '# [6.15.0](https://github.com/testing-library/dom-testing-library/compare/v6.14.1...v6.15.0) (2020-03-04)\n\n\n### Features\n\n* update all dependencies ([6084f53](https://github.com/testing-library/dom-testing-library/commit/6084f532bdfa98d840b44f399750679d6a8666dc))\n\n\n\n',
	},
	{
		id: 24218878,
		tag_name: 'v6.14.1',
		name: 'v6.14.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.14.1',
		body: '## [6.14.1](https://github.com/testing-library/dom-testing-library/compare/v6.14.0...v6.14.1) (2020-03-04)\n\n\n### Bug Fixes\n\n* **ByLabel:** make it work with selects in labels ([#451](https://github.com/testing-library/dom-testing-library/issues/451)) ([a3c5699](https://github.com/testing-library/dom-testing-library/commit/a3c5699f7eb8e97f50ddc70d6326e93204d0c06f))\n* **ByRole:** various implicit roles ([#446](https://github.com/testing-library/dom-testing-library/issues/446)) ([4b7996c](https://github.com/testing-library/dom-testing-library/commit/4b7996c346bbde503f8f408e1df819b8f23ea983))\n\n\n\n',
	},
	{
		id: 24217026,
		tag_name: 'v6.14.0',
		name: 'v6.14.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.14.0',
		body: '# [6.14.0](https://github.com/testing-library/dom-testing-library/compare/v6.13.0...v6.14.0) (2020-03-04)\n\n\n### Features\n\n* **byRole:** Add `name` filter ([#408](https://github.com/testing-library/dom-testing-library/issues/408)) ([a98dc9f](https://github.com/testing-library/dom-testing-library/commit/a98dc9f2052bcaa36932a16e27698b047af761fd))\n\n\n\n',
	},
	{
		id: 24194634,
		tag_name: 'v6.13.0',
		name: 'v6.13.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.13.0',
		body: '# [6.13.0](https://github.com/testing-library/dom-testing-library/compare/v6.12.2...v6.13.0) (2020-03-04)\n\n\n### Features\n\n* **config:** add getElementError config option ([#452](https://github.com/testing-library/dom-testing-library/issues/452)) ([d6d41f9](https://github.com/testing-library/dom-testing-library/commit/d6d41f9cba3ac3b9dc839b5050f212cc0cae1bea)), closes [#360](https://github.com/testing-library/dom-testing-library/issues/360)\n\n\n\n',
	},
	{
		id: 23315895,
		tag_name: 'v6.12.2',
		name: 'v6.12.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.12.2',
		body: '## [6.12.2](https://github.com/testing-library/dom-testing-library/compare/v6.12.1...v6.12.2) (2020-02-02)\n\n\n### Bug Fixes\n\n* fireEvent in IE11 ([#445](https://github.com/testing-library/dom-testing-library/issues/445)) ([1ee3e7a](https://github.com/testing-library/dom-testing-library/commit/1ee3e7a8bf93c99d366276a822c13e3470e10f65))\n\n\n\n',
	},
	{
		id: 23312617,
		tag_name: 'v6.12.1',
		name: 'v6.12.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.12.1',
		body: '## [6.12.1](https://github.com/testing-library/dom-testing-library/compare/v6.12.0...v6.12.1) (2020-02-01)\n\n\n### Bug Fixes\n\n* **ByDisplayValue:** improve warning message ([#443](https://github.com/testing-library/dom-testing-library/issues/443)) ([686175a](https://github.com/testing-library/dom-testing-library/commit/686175a0e7aff7845e31dca526cb2d9a5b9d1505))\n\n\n\n',
	},
	{
		id: 23207448,
		tag_name: 'v6.12.0',
		name: 'v6.12.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.12.0',
		body: '# [6.12.0](https://github.com/testing-library/dom-testing-library/compare/v6.11.1...v6.12.0) (2020-01-29)\n\n\n### Features\n\n* **ByRole:** Add support for fallback roles ([#418](https://github.com/testing-library/dom-testing-library/issues/418)) ([91d05c1](https://github.com/testing-library/dom-testing-library/commit/91d05c1ac10fabe0f249f0ef7839278c2e6d6c65))\n* **event:** add new history popstate event ([#433](https://github.com/testing-library/dom-testing-library/issues/433)) ([90f79ac](https://github.com/testing-library/dom-testing-library/commit/90f79ac01a8adcad9d535dcba9a2f62ccd87c0fc)), closes [#427](https://github.com/testing-library/dom-testing-library/issues/427)\n* add a debug method to screen. ([#429](https://github.com/testing-library/dom-testing-library/issues/429)) ([3805b27](https://github.com/testing-library/dom-testing-library/commit/3805b2772f93d2e5a16858d50231eeafb6c6e484))\n\n\n\n',
	},
	{
		id: 23201647,
		tag_name: 'v6.11.1',
		name: 'v6.11.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.11.1',
		body: "## [6.11.1](https://github.com/testing-library/dom-testing-library/compare/v6.11.0...v6.11.1) (2020-01-28)\n\n\n### Bug Fixes\n\n* ensure 'process' is available before using ([#431](https://github.com/testing-library/dom-testing-library/issues/431)) ([905f4b3](https://github.com/testing-library/dom-testing-library/commit/905f4b3aa701ebffeb1359157cd8408a343c5b37)), closes [#413](https://github.com/testing-library/dom-testing-library/issues/413) [#161](https://github.com/testing-library/dom-testing-library/issues/161)\n\n\n\n",
	},
	{
		id: 22213728,
		tag_name: 'v6.11.0',
		name: 'v6.11.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.11.0',
		body: '# [6.11.0](https://github.com/testing-library/dom-testing-library/compare/v6.10.1...v6.11.0) (2019-12-13)\n\n\n### Features\n\n* **screen:** Add screen export which has all queries bound to the body ([#412](https://github.com/testing-library/dom-testing-library/issues/412)) ([4fed5ae](https://github.com/testing-library/dom-testing-library/commit/4fed5aeab5334e871c71bd53e2da61907119d0f3))\n\n\n\n',
	},
	{
		id: 21243310,
		tag_name: 'v6.10.1',
		name: 'v6.10.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.10.1',
		body: '## [6.10.1](https://github.com/testing-library/dom-testing-library/compare/v6.10.0...v6.10.1) (2019-11-06)\n\n\n### Bug Fixes\n\n* make sure setTimeout exists on global ([#400](https://github.com/testing-library/dom-testing-library/issues/400)) ([04455cd](https://github.com/testing-library/dom-testing-library/commit/04455cdff33a582c436f8f06f626f6841fa6cce7))\n\n\n\n',
	},
	{
		id: 21077950,
		tag_name: 'v6.10.0',
		name: 'v6.10.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.10.0',
		body: '# [6.10.0](https://github.com/testing-library/dom-testing-library/compare/v6.9.0...v6.10.0) (2019-10-30)\n\n\n### Features\n\n* make default of hidden in ByRole configurable ([#398](https://github.com/testing-library/dom-testing-library/issues/398)) ([7ffb941](https://github.com/testing-library/dom-testing-library/commit/7ffb94180557a717cbb6849187888bbe6ebb8282))\n\n\n\n',
	},
	{
		id: 21036200,
		tag_name: 'v6.9.0',
		name: 'v6.9.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.9.0',
		body: '# [6.9.0](https://github.com/testing-library/dom-testing-library/compare/v6.8.1...v6.9.0) (2019-10-28)\n\n\n### Features\n\n* **ByRole:** Improve perf if multiple elements are found ([#395](https://github.com/testing-library/dom-testing-library/issues/395)) ([ea2fc64](https://github.com/testing-library/dom-testing-library/commit/ea2fc64b112b24de4b8eb73a10fd62e1ab2db880))\n\n\n\n',
	},
	{
		id: 20667155,
		tag_name: 'v6.8.1',
		name: 'v6.8.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.8.1',
		body: '## [6.8.1](https://github.com/testing-library/dom-testing-library/compare/v6.8.0...v6.8.1) (2019-10-13)\n\n\n### Bug Fixes\n\n* **perf:** improve byRole performance ([#381](https://github.com/testing-library/dom-testing-library/issues/381)) ([b5cb4c5](https://github.com/testing-library/dom-testing-library/commit/b5cb4c52af3c0ded4f39606dfb4ba49f0be88aec)), closes [#379](https://github.com/testing-library/dom-testing-library/issues/379)\n\n\n\n',
	},
	{
		id: 20648013,
		tag_name: 'v6.8.0',
		name: 'v6.8.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.8.0',
		body: '# [6.8.0](https://github.com/testing-library/dom-testing-library/compare/v6.7.1...v6.8.0) (2019-10-11)\n\n\n### Features\n\n* Export isInaccessible ([#364](https://github.com/testing-library/dom-testing-library/issues/364)) ([5783c12](https://github.com/testing-library/dom-testing-library/commit/5783c1266dfe4f1c499ca4f6244562c866b5098a))\n\n\n\n',
	},
	{
		id: 20615771,
		tag_name: 'v6.7.1',
		name: 'v6.7.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.7.1',
		body: "## [6.7.1](https://github.com/testing-library/dom-testing-library/compare/v6.7.0...v6.7.1) (2019-10-10)\n\n\n### Bug Fixes\n\n* **byRole:** Don't assume window context ([#378](https://github.com/testing-library/dom-testing-library/issues/378)) ([bb3c145](https://github.com/testing-library/dom-testing-library/commit/bb3c145efb5db5b5213c4f0bcab9fb5c1f589d26))\n\n\n\n",
	},
	{
		id: 20597321,
		tag_name: 'v6.7.0',
		name: 'v6.7.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.7.0',
		body: '# [6.7.0](https://github.com/testing-library/dom-testing-library/compare/v6.6.0...v6.7.0) (2019-10-10)\n\n\n### Features\n\n* update wait-for-expect which always uses real timers ([#361](https://github.com/testing-library/dom-testing-library/issues/361)) ([13543a9](https://github.com/testing-library/dom-testing-library/commit/13543a9762dff7e8f0cad8d57c1c02dc66052df6))\n\n\n\n',
	},
	{
		id: 20528909,
		tag_name: 'v6.6.0',
		name: 'v6.6.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.6.0',
		body: '# [6.6.0](https://github.com/testing-library/dom-testing-library/compare/v6.5.1...v6.6.0) (2019-10-07)\n\n\n### Features\n\n* **prettyDOM:** add helpful error message ([#367](https://github.com/testing-library/dom-testing-library/issues/367)) ([99760f0](https://github.com/testing-library/dom-testing-library/commit/99760f0))\n\n\n\n',
	},
	{
		id: 20517936,
		tag_name: 'v6.5.1',
		name: 'v6.5.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.5.1',
		body: '## [6.5.1](https://github.com/testing-library/dom-testing-library/compare/v6.5.0...v6.5.1) (2019-10-07)\n\n\n### Bug Fixes\n\n* shouldExcludeFromA11yTree runs in IE11 ([#365](https://github.com/testing-library/dom-testing-library/issues/365)) ([7f8de89](https://github.com/testing-library/dom-testing-library/commit/7f8de89))\n\n\n\n',
	},
	{
		id: 20422923,
		tag_name: 'v6.5.0',
		name: 'v6.5.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.5.0',
		body: '# [6.5.0](https://github.com/testing-library/dom-testing-library/compare/v6.4.1...v6.5.0) (2019-10-02)\n\n\n### Features\n\n* **events:** add form reset event ([#368](https://github.com/testing-library/dom-testing-library/issues/368)) ([eadf8b6](https://github.com/testing-library/dom-testing-library/commit/eadf8b6))\n\n\n\n',
	},
	{
		id: 20293445,
		tag_name: 'v6.4.1',
		name: 'v6.4.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.4.1',
		body: '## [6.4.1](https://github.com/testing-library/dom-testing-library/compare/v6.4.0...v6.4.1) (2019-09-26)\n\n\n### Bug Fixes\n\n* byLabel crashing in IE 11 ([#363](https://github.com/testing-library/dom-testing-library/issues/363)) ([a401bb5](https://github.com/testing-library/dom-testing-library/commit/a401bb5))\n\n\n\n',
	},
	{
		id: 20189819,
		tag_name: 'v6.4.0',
		name: 'v6.4.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.4.0',
		body: '# [6.4.0](https://github.com/testing-library/dom-testing-library/compare/v6.3.0...v6.4.0) (2019-09-23)\n\n\n### Features\n\n* **byRole:** Exclude inaccessible elements ([#352](https://github.com/testing-library/dom-testing-library/issues/352)) ([dbbea6e](https://github.com/testing-library/dom-testing-library/commit/dbbea6e))\n\n\n\n',
	},
	{
		id: 20145774,
		tag_name: 'v6.3.0',
		name: 'v6.3.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.3.0',
		body: '# [6.3.0](https://github.com/testing-library/dom-testing-library/compare/v6.2.0...v6.3.0) (2019-09-20)\n\n\n### Bug Fixes\n\n* make async utilities work with fake timers ([#342](https://github.com/testing-library/dom-testing-library/issues/342)) ([debe7b2](https://github.com/testing-library/dom-testing-library/commit/debe7b2))\n\n\n### Features\n\n* provide human error messages for missing fireEvent() params ([#355](https://github.com/testing-library/dom-testing-library/issues/355)) ([d58cf8d](https://github.com/testing-library/dom-testing-library/commit/d58cf8d))\n\n\n\n',
	},
	{
		id: 19783790,
		tag_name: 'v6.2.0',
		name: 'v6.2.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.2.0',
		body: '# [6.2.0](https://github.com/testing-library/dom-testing-library/compare/v6.1.0...v6.2.0) (2019-09-05)\n\n\n### Features\n\n* support textareas with children. ([#344](https://github.com/testing-library/dom-testing-library/issues/344)) ([f9714ed](https://github.com/testing-library/dom-testing-library/commit/f9714ed))\n\n\n\n',
	},
	{
		id: 19350459,
		tag_name: 'v6.1.0',
		name: 'v6.1.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.1.0',
		body: '# [6.1.0](https://github.com/testing-library/dom-testing-library/compare/v6.0.1...v6.1.0) (2019-08-16)\n\n\n### Features\n\n* add asyncUtilTimeout to config ([#339](https://github.com/testing-library/dom-testing-library/issues/339)) ([1bd90b1](https://github.com/testing-library/dom-testing-library/commit/1bd90b1))\n\n\n\n',
	},
	{
		id: 19321698,
		tag_name: 'v6.0.1',
		name: 'v6.0.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.0.1',
		body: '## [6.0.1](https://github.com/testing-library/dom-testing-library/compare/v6.0.0...v6.0.1) (2019-08-15)\n\n\n### Bug Fixes\n\n* **TS:** move typings to DefinitelyTyped ([#337](https://github.com/testing-library/dom-testing-library/issues/337)) ([1682f5a](https://github.com/testing-library/dom-testing-library/commit/1682f5a))\n\n\n\n',
	},
	{
		id: 19201050,
		tag_name: 'v6.0.0',
		name: 'v6.0.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v6.0.0',
		body: '# [6.0.0](https://github.com/testing-library/dom-testing-library/compare/v5.6.1...v6.0.0) (2019-08-09)\r\n\r\n### Features\r\n\r\n* **logDOM:** add logDOM export ([#336](https://github.com/testing-library/dom-testing-library/issues/336)) ([5bcd1a7](https://github.com/testing-library/dom-testing-library/commit/5bcd1a7))\r\n\r\n\r\n### BREAKING CHANGES\r\n\r\n* **debugDOM:** If you were using `debugDOM` before, use `prettyDOM` instead.\r\n\r\n\r\n\r\n',
	},
	{
		id: 18999786,
		tag_name: 'v5.6.1',
		name: 'v5.6.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v5.6.1',
		body: '## [5.6.1](https://github.com/testing-library/dom-testing-library/compare/v5.6.0...v5.6.1) (2019-07-31)\n\n\n### Bug Fixes\n\n* getByRole error message, when there are no available roles ([#330](https://github.com/testing-library/dom-testing-library/issues/330)) ([d966008](https://github.com/testing-library/dom-testing-library/commit/d966008))\n\n\n\n',
	},
	{
		id: 18585707,
		tag_name: 'v5.6.0',
		name: 'v5.6.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v5.6.0',
		body: '# [5.6.0](https://github.com/testing-library/dom-testing-library/compare/v5.5.6...v5.6.0) (2019-07-12)\n\n\n### Features\n\n* log available roles when a roles query fails ([#321](https://github.com/testing-library/dom-testing-library/issues/321)) ([8c99171](https://github.com/testing-library/dom-testing-library/commit/8c99171)), closes [#286](https://github.com/testing-library/dom-testing-library/issues/286)\n\n\n\n',
	},
	{
		id: 18585115,
		tag_name: 'v5.5.6',
		name: 'v5.5.6',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v5.5.6',
		body: '## [5.5.6](https://github.com/testing-library/dom-testing-library/compare/v5.5.5...v5.5.6) (2019-07-12)\n\n\n### Bug Fixes\n\n* value-less element selectors ([#319](https://github.com/testing-library/dom-testing-library/issues/319)) ([6418536](https://github.com/testing-library/dom-testing-library/commit/6418536))\n\n\n\n',
	},
	{
		id: 18583261,
		tag_name: 'v5.5.5',
		name: 'v5.5.5',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v5.5.5',
		body: '## [5.5.5](https://github.com/testing-library/dom-testing-library/compare/v5.5.4...v5.5.5) (2019-07-12)\n\n\n### Bug Fixes\n\n* **build output:** ensure we exclude tests from the build output ([1e31055](https://github.com/testing-library/dom-testing-library/commit/1e31055))\n\n\n\n',
	},
	{
		id: 18580806,
		tag_name: 'v5.5.4',
		name: 'v5.5.4',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v5.5.4',
		body: '## [5.5.4](https://github.com/testing-library/dom-testing-library/compare/v5.5.3...v5.5.4) (2019-07-12)\n\n\n### Bug Fixes\n\n* resolve setImmediate issue when using with Cypress. ([#316](https://github.com/testing-library/dom-testing-library/issues/316)) ([f5b84e3](https://github.com/testing-library/dom-testing-library/commit/f5b84e3))\n\n\n\n',
	},
	{
		id: 18566210,
		tag_name: 'v5.5.3',
		name: 'v5.5.3',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v5.5.3',
		body: '## [5.5.3](https://github.com/testing-library/dom-testing-library/compare/v5.5.2...v5.5.3) (2019-07-11)\n\n\n### Bug Fixes\n\n* ensure timing things are not mocked ([#305](https://github.com/testing-library/dom-testing-library/issues/305)) ([dae25d5](https://github.com/testing-library/dom-testing-library/commit/dae25d5))\n\n\n\n',
	},
	{
		id: 18529841,
		tag_name: 'v5.5.2',
		name: 'v5.5.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v5.5.2',
		body: '## [5.5.2](https://github.com/testing-library/dom-testing-library/compare/v5.5.1...v5.5.2) (2019-07-10)\n\n\n### Bug Fixes\n\n* logRoles now actually logs its output to console. ([#312](https://github.com/testing-library/dom-testing-library/issues/312)) ([170978b](https://github.com/testing-library/dom-testing-library/commit/170978b))\n\n\n\n',
	},
	{
		id: 18475208,
		tag_name: 'v5.5.1',
		name: 'v5.5.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v5.5.1',
		body: '## [5.5.1](https://github.com/testing-library/dom-testing-library/compare/v5.5.0...v5.5.1) (2019-07-08)\n\n\n### Bug Fixes\n\n* **TS:** add options type of prettyDOM ([#309](https://github.com/testing-library/dom-testing-library/issues/309)) ([2846a8e](https://github.com/testing-library/dom-testing-library/commit/2846a8e))\n\n\n\n',
	},
	{
		id: 18338361,
		tag_name: 'v5.5.0',
		name: 'v5.5.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v5.5.0',
		body: '# [5.5.0](https://github.com/testing-library/dom-testing-library/compare/v5.4.0...v5.5.0) (2019-07-01)\n\n\n### Features\n\n* Add buildQueries types ([#301](https://github.com/testing-library/dom-testing-library/issues/301)) ([aa60afe](https://github.com/testing-library/dom-testing-library/commit/aa60afe))\n\n\n\n',
	},
	{
		id: 18185610,
		tag_name: 'v5.4.0',
		name: 'v5.4.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v5.4.0',
		body: '# [5.4.0](https://github.com/testing-library/dom-testing-library/compare/v5.3.1...v5.4.0) (2019-06-24)\n\n\n### Features\n\n* add pointer events ([#295](https://github.com/testing-library/dom-testing-library/issues/295)) ([12e0f4f](https://github.com/testing-library/dom-testing-library/commit/12e0f4f))\n\n\n\n',
	},
	{
		id: 18185213,
		tag_name: 'v5.3.1',
		name: 'v5.3.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v5.3.1',
		body: '## [5.3.1](https://github.com/testing-library/dom-testing-library/compare/v5.3.0...v5.3.1) (2019-06-24)\n\n\n### Bug Fixes\n\n* **fireEvent:** various event defaults ([#296](https://github.com/testing-library/dom-testing-library/issues/296)) ([40c041c](https://github.com/testing-library/dom-testing-library/commit/40c041c))\n\n\n\n',
	},
	{
		id: 18184205,
		tag_name: 'v5.3.0',
		name: 'v5.3.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v5.3.0',
		body: '# [5.3.0](https://github.com/testing-library/dom-testing-library/compare/v5.2.1...v5.3.0) (2019-06-24)\n\n\n### Features\n\n* add getRoles and logRoles utilities ([#285](https://github.com/testing-library/dom-testing-library/issues/285)) ([1a5251c](https://github.com/testing-library/dom-testing-library/commit/1a5251c)), closes [#282](https://github.com/testing-library/dom-testing-library/issues/282) [#282](https://github.com/testing-library/dom-testing-library/issues/282)\n\n\n\n',
	},
	{
		id: 18106090,
		tag_name: 'v5.2.1',
		name: 'v5.2.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v5.2.1',
		body: '## [5.2.1](https://github.com/testing-library/dom-testing-library/compare/v5.2.0...v5.2.1) (2019-06-19)\n\n\n### Bug Fixes\n\n* support jsdom detached fragments ([#288](https://github.com/testing-library/dom-testing-library/issues/288)) ([792c5b7](https://github.com/testing-library/dom-testing-library/commit/792c5b7))\n\n\n\n',
	},
	{
		id: 17869723,
		tag_name: 'v5.2.0',
		name: 'v5.2.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v5.2.0',
		body: '# [5.2.0](https://github.com/testing-library/dom-testing-library/compare/v5.1.1...v5.2.0) (2019-06-08)\n\n\n### Features\n\n* add semantic html elements implicit role support to queryByRole/getByRole selectors ([#262](https://github.com/testing-library/dom-testing-library/issues/262)) ([#280](https://github.com/testing-library/dom-testing-library/issues/280)) ([4b2e8a5](https://github.com/testing-library/dom-testing-library/commit/4b2e8a5))\n\n\n\n',
	},
	{
		id: 17725059,
		tag_name: 'v5.1.1',
		name: 'v5.1.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v5.1.1',
		body: '## [5.1.1](https://github.com/testing-library/dom-testing-library/compare/v5.1.0...v5.1.1) (2019-06-01)\n\n\n### Bug Fixes\n\n* allow any element as valid for aria-labelledby ([#274](https://github.com/testing-library/dom-testing-library/issues/274)) ([e7f492c](https://github.com/testing-library/dom-testing-library/commit/e7f492c))\n\n\n\n',
	},
	{
		id: 17722156,
		tag_name: 'v5.1.0',
		name: 'v5.1.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v5.1.0',
		body: '# [5.1.0](https://github.com/testing-library/dom-testing-library/compare/v5.0.1...v5.1.0) (2019-06-01)\n\n\n### Features\n\n* **typings:** allow document to be used in fireEvent ([#272](https://github.com/testing-library/dom-testing-library/issues/272)) ([43d32f5](https://github.com/testing-library/dom-testing-library/commit/43d32f5))\n\n\n\n',
	},
	{
		id: 17687404,
		tag_name: 'v5.0.1',
		name: 'v5.0.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v5.0.1',
		body: '## [5.0.1](https://github.com/testing-library/dom-testing-library/compare/v5.0.0...v5.0.1) (2019-05-30)\n\n\n### Bug Fixes\n\n* docs referenced old npm package ([8c64eec](https://github.com/testing-library/dom-testing-library/commit/8c64eec))\n\n\n\n',
	},
	{
		id: 17686881,
		tag_name: 'v5.0.0',
		name: 'v5.0.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v5.0.0',
		body: "# [5.0.0](https://github.com/testing-library/dom-testing-library/compare/v4.2.0...v5.0.0) (2019-05-30)\r\n\r\n\r\n### Bug Fixes\r\n\r\n* **release:** manually release a major version ([a646246](https://github.com/testing-library/dom-testing-library/commit/a646246)), closes [#260](https://github.com/testing-library/dom-testing-library/issues/260)\r\n\r\n\r\n### BREAKING CHANGES\r\n\r\n* **release:** You must switch from `dom-testing-library` to `@testing-library/dom`\r\n\r\n\r\n🚨🚨🚨🚨\r\n\r\nFind/replace `dom-testing-library` for `@testing-library/dom` and upgrade to v5\r\n\r\nAlso, if you're using the UMD file, the file has changed to `dist/@testing-library/dom.umd.js` and the global variable is now on `window.TestingLibraryDom`.\r\n\r\n🚨🚨🚨🚨\r\n",
	},
	{
		id: 17686691,
		tag_name: 'v4.2.0',
		name: 'v4.2.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v4.2.0',
		body: '# [4.2.0](https://github.com/testing-library/dom-testing-library/compare/v4.1.1...v4.2.0) (2019-05-30)\n\n\n### Features\n\n* initial release of the scoped package ([7639e74](https://github.com/testing-library/dom-testing-library/commit/7639e74)), closes [#260](https://github.com/testing-library/dom-testing-library/issues/260)\n\n\n\n',
	},
	{
		id: 17530605,
		tag_name: 'v4.1.1',
		name: 'v4.1.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v4.1.1',
		body: '## [4.1.1](https://github.com/testing-library/dom-testing-library/compare/v4.1.0...v4.1.1) (2019-05-23)\n\n\n### Bug Fixes\n\n* **events:** add selection-related properties to target ([#264](https://github.com/testing-library/dom-testing-library/issues/264)) ([075e682](https://github.com/testing-library/dom-testing-library/commit/075e682))\n\n\n\n',
	},
	{
		id: 17300699,
		tag_name: 'v4.1.0',
		name: 'v4.1.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v4.1.0',
		body: '# [4.1.0](https://github.com/testing-library/dom-testing-library/compare/v4.0.1...v4.1.0) (2019-05-12)\n\n\n### Features\n\n* add createEvent that returns the created Event ([#258](https://github.com/testing-library/dom-testing-library/issues/258)) ([0e7d99e](https://github.com/testing-library/dom-testing-library/commit/0e7d99e))\n\n\n\n',
	},
	{
		id: 17066420,
		tag_name: 'v4.0.1',
		name: 'v4.0.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v4.0.1',
		body: '## [4.0.1](https://github.com/testing-library/dom-testing-library/compare/v4.0.0...v4.0.1) (2019-04-30)\n\n\n### Bug Fixes\n\n* **TS:** add waitForElementToBeRemoved to index typings ([#254](https://github.com/testing-library/dom-testing-library/issues/254)) ([dbc3c9b](https://github.com/testing-library/dom-testing-library/commit/dbc3c9b))\n\n\n\n',
	},
	{
		id: 16987050,
		tag_name: 'v4.0.0',
		name: 'v4.0.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v4.0.0',
		body: "# [4.0.0](https://github.com/testing-library/dom-testing-library/compare/v3.19.4...v4.0.0) (2019-04-25)\r\n\r\n\r\n### Bug Fixes\r\n\r\n* remove deprecated queries ([#228](https://github.com/testing-library/dom-testing-library/issues/228)) ([253d677](https://github.com/testing-library/dom-testing-library/commit/253d677)), closes [#223](https://github.com/testing-library/dom-testing-library/issues/223)\r\n* **getBy*:** throw an error if more than one element is found ([#229](https://github.com/testing-library/dom-testing-library/issues/229)) ([7f8c100](https://github.com/testing-library/dom-testing-library/commit/7f8c100)), closes [#202](https://github.com/testing-library/dom-testing-library/issues/202)\r\n\r\n\r\n### BREAKING CHANGES\r\n\r\nWe try to keep breaking changes to a minimum. This release only has two breaking changes. One is removal of deprecated methods you probably weren't using anyway, and the other reveals potential bugs in your tests. So you should be able to upgrade to this version with little-to-no effort.\r\n\r\n* **getBy*:** All `getBy` and `findBy` query variants now will throw an error if more than one element is returned. If this is expected, then use `getAllBy` (or `findAllBy`) instead.\r\n* This removes the deprecated queries `ByValue` and `BySelectText`. Use `ByDisplayValue` instead.\r\n\r\n\r\n\r\n",
	},
	{
		id: 16964434,
		tag_name: 'v3.19.4',
		name: 'v3.19.4',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.19.4',
		body: '## [3.19.4](https://github.com/kentcdodds/dom-testing-library/compare/v3.19.3...v3.19.4) (2019-04-25)\n\n\n### Bug Fixes\n\n* **build:** upgrade all packages. ([#252](https://github.com/kentcdodds/dom-testing-library/issues/252)) ([dea7b7b](https://github.com/kentcdodds/dom-testing-library/commit/dea7b7b)), closes [#234](https://github.com/kentcdodds/dom-testing-library/issues/234) [#251](https://github.com/kentcdodds/dom-testing-library/issues/251)\n\n\n\n',
	},
	{
		id: 16831150,
		tag_name: 'v3.19.3',
		name: 'v3.19.3',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.19.3',
		body: '## [3.19.3](https://github.com/kentcdodds/dom-testing-library/compare/v3.19.2...v3.19.3) (2019-04-17)\n\n\n### Bug Fixes\n\n* **TS:** make type parameter more specific ([#247](https://github.com/kentcdodds/dom-testing-library/issues/247)) ([02865f1](https://github.com/kentcdodds/dom-testing-library/commit/02865f1))\n\n\n\n',
	},
	{
		id: 16825996,
		tag_name: 'v3.19.2',
		name: 'v3.19.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.19.2',
		body: '## [3.19.2](https://github.com/kentcdodds/dom-testing-library/compare/v3.19.1...v3.19.2) (2019-04-17)\n\n\n### Bug Fixes\n\n* **fireEvent:** accept window for fireEvent shortcuts ([caffc56](https://github.com/kentcdodds/dom-testing-library/commit/caffc56)), closes [#165](https://github.com/kentcdodds/dom-testing-library/issues/165)\n* **TS:** fix typings of getQueriesForElement ([#246](https://github.com/kentcdodds/dom-testing-library/issues/246)) ([8b3f767](https://github.com/kentcdodds/dom-testing-library/commit/8b3f767))\n\n\n\n',
	},
	{
		id: 16738500,
		tag_name: 'v3.19.1',
		name: 'v3.19.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.19.1',
		body: '## [3.19.1](https://github.com/kentcdodds/dom-testing-library/compare/v3.19.0...v3.19.1) (2019-04-12)\n\n\n### Bug Fixes\n\n* **TS:** findBy* typings: Remove Error as a possible return value ([#239](https://github.com/kentcdodds/dom-testing-library/issues/239)) ([e37d1f4](https://github.com/kentcdodds/dom-testing-library/commit/e37d1f4))\n\n\n\n',
	},
	{
		id: 16583454,
		tag_name: 'v3.19.0',
		name: 'v3.19.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.19.0',
		body: '# [3.19.0](https://github.com/kentcdodds/dom-testing-library/compare/v3.18.2...v3.19.0) (2019-04-05)\n\n\n### Features\n\n* add asyncWrapper config ([#236](https://github.com/kentcdodds/dom-testing-library/issues/236)) ([ba251ed](https://github.com/kentcdodds/dom-testing-library/commit/ba251ed))\n\n\n\n',
	},
	{
		id: 16246507,
		tag_name: 'v3.18.2',
		name: 'v3.18.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.18.2',
		body: '## [3.18.2](https://github.com/kentcdodds/dom-testing-library/compare/v3.18.1...v3.18.2) (2019-03-20)\n\n\n### Bug Fixes\n\n* **ByLabel:** revert v3.18.1 behavior. It was wrong ([0137a17](https://github.com/kentcdodds/dom-testing-library/commit/0137a17)), closes [#230](https://github.com/kentcdodds/dom-testing-library/issues/230)\n* **TS:** add findby type definitions ([#231](https://github.com/kentcdodds/dom-testing-library/issues/231)) ([e97e51c](https://github.com/kentcdodds/dom-testing-library/commit/e97e51c))\n\n\n\n',
	},
	{
		id: 16217597,
		tag_name: 'v3.18.1',
		name: 'v3.18.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.18.1',
		body: '## [3.18.1](https://github.com/kentcdodds/dom-testing-library/compare/v3.18.0...v3.18.1) (2019-03-19)\n\n\n### Bug Fixes\n\n* **ByLabel:** use getNodeText abstraction instead of textContent ([#227](https://github.com/kentcdodds/dom-testing-library/issues/227)) ([96f21a5](https://github.com/kentcdodds/dom-testing-library/commit/96f21a5)), closes [#190](https://github.com/kentcdodds/dom-testing-library/issues/190)\n\n\n\n',
	},
	{
		id: 16216908,
		tag_name: 'v3.18.0',
		name: 'v3.18.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.18.0',
		body: '# [3.18.0](https://github.com/kentcdodds/dom-testing-library/compare/v3.17.1...v3.18.0) (2019-03-19)\n\n\n### Features\n\n* **findBy*:** adds findBy* query type allowing for async element queries ([#224](https://github.com/kentcdodds/dom-testing-library/issues/224)) ([8b29d43](https://github.com/kentcdodds/dom-testing-library/commit/8b29d43)), closes [#203](https://github.com/kentcdodds/dom-testing-library/issues/203)\n\n\n\n',
	},
	{
		id: 16067118,
		tag_name: 'v3.17.1',
		name: 'v3.17.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.17.1',
		body: '## [3.17.1](https://github.com/kentcdodds/dom-testing-library/compare/v3.17.0...v3.17.1) (2019-03-12)\n\n\n### Bug Fixes\n\n* **events:** fix firing events in document ([#222](https://github.com/kentcdodds/dom-testing-library/issues/222)) ([7ed2bcb](https://github.com/kentcdodds/dom-testing-library/commit/7ed2bcb))\n\n\n\n',
	},
	{
		id: 16014498,
		tag_name: 'v3.17.0',
		name: 'v3.17.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.17.0',
		body: '# [3.17.0](https://github.com/kentcdodds/dom-testing-library/compare/v3.16.8...v3.17.0) (2019-03-09)\n\n\n### Features\n\n* **waitForElementToBeRemoved:** add the new utility function ([#218](https://github.com/kentcdodds/dom-testing-library/issues/218)) ([1727a49](https://github.com/kentcdodds/dom-testing-library/commit/1727a49))\n\n\n\n',
	},
	{
		id: 15592414,
		tag_name: 'v3.16.8',
		name: 'v3.16.8',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.16.8',
		body: '## [3.16.8](https://github.com/kentcdodds/dom-testing-library/compare/v3.16.7...v3.16.8) (2019-02-15)\n\n\n### Bug Fixes\n\n* node.matches is not a function ([#216](https://github.com/kentcdodds/dom-testing-library/issues/216)) ([4c17512](https://github.com/kentcdodds/dom-testing-library/commit/4c17512))\n\n\n\n',
	},
	{
		id: 15563619,
		tag_name: 'v3.16.7',
		name: 'v3.16.7',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.16.7',
		body: '## [3.16.7](https://github.com/kentcdodds/dom-testing-library/compare/v3.16.6...v3.16.7) (2019-02-14)\n\n\n### Bug Fixes\n\n* regression "X.matches is not a function" in v3.16.6 ([#213](https://github.com/kentcdodds/dom-testing-library/issues/213)) ([2cda6a7](https://github.com/kentcdodds/dom-testing-library/commit/2cda6a7))\n\n\n\n',
	},
	{
		id: 15523307,
		tag_name: 'v3.16.6',
		name: 'v3.16.6',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.16.6',
		body: '## [3.16.6](https://github.com/kentcdodds/dom-testing-library/compare/v3.16.5...v3.16.6) (2019-02-13)\n\n\n### Bug Fixes\n\n* allow queryAllByText to select text nodes text content ([#209](https://github.com/kentcdodds/dom-testing-library/issues/209)) ([677f4e9](https://github.com/kentcdodds/dom-testing-library/commit/677f4e9))\n\n\n\n',
	},
	{
		id: 15197342,
		tag_name: 'v3.16.5',
		name: 'v3.16.5',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.16.5',
		body: '## [3.16.5](https://github.com/kentcdodds/dom-testing-library/compare/v3.16.4...v3.16.5) (2019-01-26)\n\n\n### Bug Fixes\n\n* upgrade pretty-format to v24 ([#195](https://github.com/kentcdodds/dom-testing-library/issues/195)) ([369d17e](https://github.com/kentcdodds/dom-testing-library/commit/369d17e))\n\n\n\n',
	},
	{
		id: 15076204,
		tag_name: 'v3.16.4',
		name: 'v3.16.4',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.16.4',
		body: '## [3.16.4](https://github.com/kentcdodds/dom-testing-library/compare/v3.16.3...v3.16.4) (2019-01-20)\n\n\n### Bug Fixes\n\n* add charcode to keyboard events defaults ([#193](https://github.com/kentcdodds/dom-testing-library/issues/193)) ([2e4a697](https://github.com/kentcdodds/dom-testing-library/commit/2e4a697)), closes [/github.com/kentcdodds/react-testing-library/issues/269#issuecomment-455873164](https://github.com//github.com/kentcdodds/react-testing-library/issues/269/issues/issuecomment-455873164)\n\n\n\n',
	},
	{
		id: 14806618,
		tag_name: 'v3.16.3',
		name: 'v3.16.3',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.16.3',
		body: '## [3.16.3](https://github.com/kentcdodds/dom-testing-library/compare/v3.16.2...v3.16.3) (2019-01-04)\n\n\n### Bug Fixes\n\n* **#184:** replacing setImmediate by setTimeour when not defined ([#188](https://github.com/kentcdodds/dom-testing-library/issues/188)) ([9c1f69d](https://github.com/kentcdodds/dom-testing-library/commit/9c1f69d)), closes [#184](https://github.com/kentcdodds/dom-testing-library/issues/184)\n\n\n\n',
	},
	{
		id: 14753915,
		tag_name: 'v3.16.2',
		name: 'v3.16.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.16.2',
		body: '## [3.16.2](https://github.com/kentcdodds/dom-testing-library/compare/v3.16.1...v3.16.2) (2018-12-31)\n\n\n### Bug Fixes\n\n* **getByText:** support inputs where type is either `button` or `submit` ([#185](https://github.com/kentcdodds/dom-testing-library/issues/185)) ([0cbdeb9](https://github.com/kentcdodds/dom-testing-library/commit/0cbdeb9)), closes [kentcdodds/react-testing-library#248](https://github.com/kentcdodds/react-testing-library/issues/248)\n\n\n\n',
	},
	{
		id: 14561881,
		tag_name: 'v3.16.1',
		name: 'v3.16.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.16.1',
		body: '## [3.16.1](https://github.com/kentcdodds/dom-testing-library/compare/v3.16.0...v3.16.1) (2018-12-17)\n\n\n### Bug Fixes\n\n* **TS:** add focusin/focusout typings ([#183](https://github.com/kentcdodds/dom-testing-library/issues/183)) ([228e91f](https://github.com/kentcdodds/dom-testing-library/commit/228e91f))\n\n\n\n',
	},
	{
		id: 14555407,
		tag_name: 'v3.16.0',
		name: 'v3.16.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.16.0',
		body: '# [3.16.0](https://github.com/kentcdodds/dom-testing-library/compare/v3.15.0...v3.16.0) (2018-12-16)\n\n\n### Features\n\n* **events:** implement focusin/focusout events. ([#182](https://github.com/kentcdodds/dom-testing-library/issues/182)) ([5f7376f](https://github.com/kentcdodds/dom-testing-library/commit/5f7376f))\n\n\n\n',
	},
	{
		id: 14495210,
		tag_name: 'v3.15.0',
		name: 'v3.15.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.15.0',
		body: '# [3.15.0](https://github.com/kentcdodds/dom-testing-library/compare/v3.14.1...v3.15.0) (2018-12-12)\n\n\n### Features\n\n* **custom normalizer:** allow custom control of normalization ([#172](https://github.com/kentcdodds/dom-testing-library/issues/172)) ([a03f056](https://github.com/kentcdodds/dom-testing-library/commit/a03f056))\n\n\n\n',
	},
	{
		id: 14492720,
		tag_name: 'v3.14.1',
		name: 'v3.14.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.14.1',
		body: '## [3.14.1](https://github.com/kentcdodds/dom-testing-library/compare/v3.14.0...v3.14.1) (2018-12-12)\n\n\n### Bug Fixes\n\n* **TS:** add xxxByDisplayValue TS typings ([#180](https://github.com/kentcdodds/dom-testing-library/issues/180)) ([dec7856](https://github.com/kentcdodds/dom-testing-library/commit/dec7856))\n\n\n\n',
	},
	{
		id: 14482253,
		tag_name: 'v3.14.0',
		name: 'v3.14.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.14.0',
		body: '# [3.14.0](https://github.com/kentcdodds/dom-testing-library/compare/v3.13.2...v3.14.0) (2018-12-12)\n\n\n### Features\n\n* **queryByCurrentValue:** add get/query by current value ([#169](https://github.com/kentcdodds/dom-testing-library/issues/169)) ([9a19474](https://github.com/kentcdodds/dom-testing-library/commit/9a19474))\n\n\n\n',
	},
	{
		id: 14456835,
		tag_name: 'v3.13.2',
		name: 'v3.13.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.13.2',
		body: '## [3.13.2](https://github.com/kentcdodds/dom-testing-library/compare/v3.13.1...v3.13.2) (2018-12-11)\n\n\n### Bug Fixes\n\n* **TS:** fix link to TS types for waitForDomChange ([#178](https://github.com/kentcdodds/dom-testing-library/issues/178)) ([ce79c72](https://github.com/kentcdodds/dom-testing-library/commit/ce79c72)), closes [#117](https://github.com/kentcdodds/dom-testing-library/issues/117)\n\n\n\n',
	},
	{
		id: 14429263,
		tag_name: 'v3.13.1',
		name: 'v3.13.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.13.1',
		body: '## [3.13.1](https://github.com/kentcdodds/dom-testing-library/compare/v3.13.0...v3.13.1) (2018-12-09)\n\n\n### Bug Fixes\n\n* **TS:** support fireEvent with window ([#165](https://github.com/kentcdodds/dom-testing-library/issues/165)) ([8ca67fe](https://github.com/kentcdodds/dom-testing-library/commit/8ca67fe))\n\n\n\n',
	},
	{
		id: 14262230,
		tag_name: 'v3.13.0',
		name: 'v3.13.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.13.0',
		body: '# [3.13.0](https://github.com/kentcdodds/dom-testing-library/compare/v3.12.5...v3.13.0) (2018-11-29)\n\n\n### Features\n\n* **configureTestIdAttribute:** add ability to override data-testid [generic config] ([#164](https://github.com/kentcdodds/dom-testing-library/issues/164)) ([879bf94](https://github.com/kentcdodds/dom-testing-library/commit/879bf94)), closes [#162](https://github.com/kentcdodds/dom-testing-library/issues/162)\n\n\n\n',
	},
	{
		id: 14176472,
		tag_name: 'v3.12.5',
		name: 'v3.12.5',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.12.5',
		body: '## [3.12.5](https://github.com/kentcdodds/dom-testing-library/compare/v3.12.4...v3.12.5) (2018-11-26)\n\n\n### Bug Fixes\n\n* **bundle:** compile dependencies in the UMD bundle. ([4b1363f](https://github.com/kentcdodds/dom-testing-library/commit/4b1363f)), closes [#160](https://github.com/kentcdodds/dom-testing-library/issues/160)\n\n\n\n',
	},
	{
		id: 14123288,
		tag_name: 'v3.12.4',
		name: 'v3.12.4',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.12.4',
		body: '## [3.12.4](https://github.com/kentcdodds/dom-testing-library/compare/v3.12.3...v3.12.4) (2018-11-21)\n\n\n### Bug Fixes\n\n* remove dom node in error messages in cypress environment ([#157](https://github.com/kentcdodds/dom-testing-library/issues/157)) ([0b6b9e3](https://github.com/kentcdodds/dom-testing-library/commit/0b6b9e3))\n\n\n\n',
	},
	{
		id: 13913052,
		tag_name: 'v3.12.3',
		name: 'v3.12.3',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.12.3',
		body: '## [3.12.3](https://github.com/kentcdodds/dom-testing-library/compare/v3.12.2...v3.12.3) (2018-11-09)\n\n\n### Bug Fixes\n\n* unofficially support node 6 ([#151](https://github.com/kentcdodds/dom-testing-library/issues/151)) ([eb48038](https://github.com/kentcdodds/dom-testing-library/commit/eb48038))\n\n\n\n',
	},
	{
		id: 13882280,
		tag_name: 'v3.12.2',
		name: 'v3.12.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.12.2',
		body: '## [3.12.2](https://github.com/kentcdodds/dom-testing-library/compare/v3.12.1...v3.12.2) (2018-11-07)\n\n\n### Bug Fixes\n\n* **TS:** make event functions accept Element ([#150](https://github.com/kentcdodds/dom-testing-library/issues/150)) ([f427ec3](https://github.com/kentcdodds/dom-testing-library/commit/f427ec3)), closes [#149](https://github.com/kentcdodds/dom-testing-library/issues/149)\n\n\n\n',
	},
	{
		id: 13864364,
		tag_name: 'v3.12.1',
		name: 'v3.12.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.12.1',
		body: '## [3.12.1](https://github.com/kentcdodds/dom-testing-library/compare/v3.12.0...v3.12.1) (2018-11-06)\n\n\n### Bug Fixes\n\n* **TS:** fix types for bound attribute queries ([#147](https://github.com/kentcdodds/dom-testing-library/issues/147)) ([7c90770](https://github.com/kentcdodds/dom-testing-library/commit/7c90770)), closes [#142](https://github.com/kentcdodds/dom-testing-library/issues/142)\n\n\n\n',
	},
	{
		id: 13666403,
		tag_name: 'v3.12.0',
		name: 'v3.12.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.12.0',
		body: '# [3.12.0](https://github.com/kentcdodds/dom-testing-library/compare/v3.11.3...v3.12.0) (2018-10-25)\n\n\n### Features\n\n* **esm:** add bundled export for esm ([b7baf11](https://github.com/kentcdodds/dom-testing-library/commit/b7baf11))\n\n\n\n',
	},
	{
		id: 13640649,
		tag_name: 'v3.11.3',
		name: 'v3.11.3',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.11.3',
		body: '## [3.11.3](https://github.com/kentcdodds/dom-testing-library/compare/v3.11.2...v3.11.3) (2018-10-24)\n\n\n### Bug Fixes\n\n* **files:** fix defineProperty for files ([aa0aab7](https://github.com/kentcdodds/dom-testing-library/commit/aa0aab7)), closes [#138](https://github.com/kentcdodds/dom-testing-library/issues/138)\n\n\n\n',
	},
	{
		id: 13592213,
		tag_name: 'v3.11.2',
		name: 'v3.11.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.11.2',
		body: '## [3.11.2](https://github.com/kentcdodds/dom-testing-library/compare/v3.11.1...v3.11.2) (2018-10-22)\n\n\n### Bug Fixes\n\n* flaky test for `wait` ([#131](https://github.com/kentcdodds/dom-testing-library/issues/131)) ([#134](https://github.com/kentcdodds/dom-testing-library/issues/134)) ([f29f551](https://github.com/kentcdodds/dom-testing-library/commit/f29f551))\n\n\n\n',
	},
	{
		id: 13544623,
		tag_name: 'v3.11.1',
		name: 'v3.11.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.11.1',
		body: '## [3.11.1](https://github.com/kentcdodds/dom-testing-library/compare/v3.11.0...v3.11.1) (2018-10-19)\n\n\n### Bug Fixes\n\n* unsafe attribute reference ([#129](https://github.com/kentcdodds/dom-testing-library/issues/129)) ([f5184ce](https://github.com/kentcdodds/dom-testing-library/commit/f5184ce))\n* **TS:** add attribute to QueryByAttribute and AllByAttribute ([#130](https://github.com/kentcdodds/dom-testing-library/issues/130)) ([4b62bf5](https://github.com/kentcdodds/dom-testing-library/commit/4b62bf5)), closes [/github.com/BenjaminEckardt/dom-testing-library/blob/master/src/queries.js#L60](https://github.com//github.com/BenjaminEckardt/dom-testing-library/blob/master/src/queries.js/issues/L60) [/github.com/kentcdodds/dom-testing-library/blob/master/src/queries.js#L153](https://github.com//github.com/kentcdodds/dom-testing-library/blob/master/src/queries.js/issues/L153)\n\n\n\n',
	},
	{
		id: 13403898,
		tag_name: 'v3.11.0',
		name: 'v3.11.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.11.0',
		body: '# [3.11.0](https://github.com/kentcdodds/dom-testing-library/compare/v3.10.1...v3.11.0) (2018-10-12)\n\n\n### Features\n\n* support for running in node environment ([#125](https://github.com/kentcdodds/dom-testing-library/issues/125)) ([7be9a8b](https://github.com/kentcdodds/dom-testing-library/commit/7be9a8b))\n\n\n\n',
	},
	{
		id: 13400359,
		tag_name: 'v3.10.1',
		name: 'v3.10.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.10.1',
		body: '## [3.10.1](https://github.com/kentcdodds/dom-testing-library/compare/v3.10.0...v3.10.1) (2018-10-12)\n\n\n### Bug Fixes\n\n* **queryAllBySelectText:** search using reactive properties ([#124](https://github.com/kentcdodds/dom-testing-library/issues/124)) ([6ed5eef](https://github.com/kentcdodds/dom-testing-library/commit/6ed5eef)), closes [#115](https://github.com/kentcdodds/dom-testing-library/issues/115)\n\n\n\n',
	},
	{
		id: 13396585,
		tag_name: 'v3.10.0',
		name: 'v3.10.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.10.0',
		body: '# [3.10.0](https://github.com/kentcdodds/dom-testing-library/compare/v3.9.0...v3.10.0) (2018-10-12)\n\n\n### Features\n\n* **waitForDomChange:** add new method ([#118](https://github.com/kentcdodds/dom-testing-library/issues/118)) ([4cf93d2](https://github.com/kentcdodds/dom-testing-library/commit/4cf93d2))\n\n\n\n',
	},
	{
		id: 13362876,
		tag_name: 'v3.9.0',
		name: 'v3.9.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.9.0',
		body: '# [3.9.0](https://github.com/kentcdodds/dom-testing-library/compare/v3.8.4...v3.9.0) (2018-10-10)\n\n\n### Features\n\n* **labels:** add support for aria-labelledby ([#121](https://github.com/kentcdodds/dom-testing-library/issues/121)) ([3ab989f](https://github.com/kentcdodds/dom-testing-library/commit/3ab989f)), closes [#120](https://github.com/kentcdodds/dom-testing-library/issues/120)\n\n\n\n',
	},
	{
		id: 13339877,
		tag_name: 'v3.8.4',
		name: 'v3.8.4',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.8.4',
		body: '## [3.8.4](https://github.com/kentcdodds/dom-testing-library/compare/v3.8.3...v3.8.4) (2018-10-09)\n\n\n### Bug Fixes\n\n* release revert of [#114](https://github.com/kentcdodds/dom-testing-library/issues/114) ([7b57f73](https://github.com/kentcdodds/dom-testing-library/commit/7b57f73))\n\n\n\n',
	},
	{
		id: 13338558,
		tag_name: 'v3.8.3',
		name: 'v3.8.3',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.8.3',
		body: '## [3.8.3](https://github.com/kentcdodds/dom-testing-library/compare/v3.8.2...v3.8.3) (2018-10-09)\n\n\n### Bug Fixes\n\n* **node:** allow running in node environment ([#114](https://github.com/kentcdodds/dom-testing-library/issues/114)) ([1b12385](https://github.com/kentcdodds/dom-testing-library/commit/1b12385)), closes [#100](https://github.com/kentcdodds/dom-testing-library/issues/100)\n\n\n\n',
	},
	{
		id: 13310048,
		tag_name: 'v3.8.2',
		name: 'v3.8.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.8.2',
		body: '## [3.8.2](https://github.com/kentcdodds/dom-testing-library/compare/v3.8.1...v3.8.2) (2018-10-08)\n\n\n### Bug Fixes\n\n* **TS:** update queries.d.ts ([#113](https://github.com/kentcdodds/dom-testing-library/issues/113)) ([a7fe808](https://github.com/kentcdodds/dom-testing-library/commit/a7fe808)), closes [#112](https://github.com/kentcdodds/dom-testing-library/issues/112)\n\n\n\n',
	},
	{
		id: 13213102,
		tag_name: 'v3.8.1',
		name: 'v3.8.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.8.1',
		body: '## [3.8.1](https://github.com/kentcdodds/dom-testing-library/compare/v3.8.0...v3.8.1) (2018-10-03)\n\n\n### Bug Fixes\n\n* upgrade pretty-format ([#110](https://github.com/kentcdodds/dom-testing-library/issues/110)) ([6e56bb0](https://github.com/kentcdodds/dom-testing-library/commit/6e56bb0))\n\n\n\n',
	},
	{
		id: 13211679,
		tag_name: 'v3.8.0',
		name: 'v3.8.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.8.0',
		body: '# [3.8.0](https://github.com/kentcdodds/dom-testing-library/compare/v3.7.0...v3.8.0) (2018-10-02)\n\n\n### Features\n\n* **getByText:** add style to default ignore ([863741a](https://github.com/kentcdodds/dom-testing-library/commit/863741a))\n\n\n\n',
	},
	{
		id: 13211596,
		tag_name: 'v3.7.0',
		name: 'v3.7.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.7.0',
		body: "# [3.7.0](https://github.com/kentcdodds/dom-testing-library/compare/v3.6.0...v3.7.0) (2018-10-02)\n\n\n### Features\n\n* **getByText:** add ignore option which defaults to `'script'` ([#109](https://github.com/kentcdodds/dom-testing-library/issues/109)) ([2536924](https://github.com/kentcdodds/dom-testing-library/commit/2536924))\n\n\n\n",
	},
	{
		id: 13004437,
		tag_name: 'v3.6.0',
		name: 'v3.6.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.6.0',
		body: '# [3.6.0](https://github.com/kentcdodds/dom-testing-library/compare/v3.5.2...v3.6.0) (2018-09-20)\n\n\n### Features\n\n* **queryBySelectText:** add get/query by select text ([#106](https://github.com/kentcdodds/dom-testing-library/issues/106)) ([c07657d](https://github.com/kentcdodds/dom-testing-library/commit/c07657d)), closes [#104](https://github.com/kentcdodds/dom-testing-library/issues/104)\n\n\n\n',
	},
	{
		id: 12940964,
		tag_name: 'v3.5.2',
		name: 'v3.5.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.5.2',
		body: '## [3.5.2](https://github.com/kentcdodds/dom-testing-library/compare/v3.5.1...v3.5.2) (2018-09-17)\n\n\n### Bug Fixes\n\n* ensure waitForElement disconnects MutationObserver at the right time ([#102](https://github.com/kentcdodds/dom-testing-library/issues/102)) ([a0436d4](https://github.com/kentcdodds/dom-testing-library/commit/a0436d4)), closes [#99](https://github.com/kentcdodds/dom-testing-library/issues/99) [#99](https://github.com/kentcdodds/dom-testing-library/issues/99)\n\n\n\n',
	},
	{
		id: 12815819,
		tag_name: 'v3.5.1',
		name: 'v3.5.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.5.1',
		body: '## [3.5.1](https://github.com/kentcdodds/dom-testing-library/compare/v3.5.0...v3.5.1) (2018-09-10)\n\n\n### Bug Fixes\n\n* upgrade wait-for-expect to 1.0.0 ([#95](https://github.com/kentcdodds/dom-testing-library/issues/95)) ([7cb84a9](https://github.com/kentcdodds/dom-testing-library/commit/7cb84a9))\n\n\n\n',
	},
	{
		id: 12730088,
		tag_name: 'v3.5.0',
		name: 'v3.5.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.5.0',
		body: '# [3.5.0](https://github.com/kentcdodds/dom-testing-library/compare/v3.4.0...v3.5.0) (2018-09-04)\n\n\n### Features\n\n* **getByRole:** add queries for dom attriburte `role` ([#94](https://github.com/kentcdodds/dom-testing-library/issues/94)) ([fe02135](https://github.com/kentcdodds/dom-testing-library/commit/fe02135)), closes [gnapse/jest-dom#55](https://github.com/gnapse/jest-dom/issues/55)\n\n\n\n',
	},
	{
		id: 12534233,
		tag_name: 'v3.4.0',
		name: 'v3.4.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.4.0',
		body: '# [3.4.0](https://github.com/kentcdodds/dom-testing-library/compare/v3.3.0...v3.4.0) (2018-08-23)\n\n\n### Features\n\n* **events:** allow setting the files value in change events ([#91](https://github.com/kentcdodds/dom-testing-library/issues/91)) ([98c67e2](https://github.com/kentcdodds/dom-testing-library/commit/98c67e2))\n\n\n\n',
	},
	{
		id: 12353624,
		tag_name: 'v3.3.0',
		name: 'v3.3.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.3.0',
		body: "# [3.3.0](https://github.com/kentcdodds/dom-testing-library/compare/v3.2.0...v3.3.0) (2018-08-10)\n\n\n### Features\n\n* **getNodeText:** Don't join text nodes with whitespace ([#87](https://github.com/kentcdodds/dom-testing-library/issues/87)) ([8ffe6d6](https://github.com/kentcdodds/dom-testing-library/commit/8ffe6d6)), closes [1#diff-6350d468f7684d134aab9d42d96a77beR8](https://github.com/1/issues/diff-6350d468f7684d134aab9d42d96a77beR8) [1#diff-de31c4d0bed96b2a4211de164bb1b589R59](https://github.com/1/issues/diff-de31c4d0bed96b2a4211de164bb1b589R59) [kentcdodds/react-testing-library#53](https://github.com/kentcdodds/react-testing-library/issues/53)\n\n\n\n",
	},
	{
		id: 12330567,
		tag_name: 'v3.2.0',
		name: 'v3.2.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.2.0',
		body: '# [3.2.0](https://github.com/kentcdodds/dom-testing-library/compare/v3.1.0...v3.2.0) (2018-08-09)\n\n\n### Features\n\n* **getByTitle:** Add ability to select `title` element of SVG with `getByTitle` ([#86](https://github.com/kentcdodds/dom-testing-library/issues/86)) ([fe44799](https://github.com/kentcdodds/dom-testing-library/commit/fe44799)), closes [#83](https://github.com/kentcdodds/dom-testing-library/issues/83)\n\n\n\n',
	},
	{
		id: 12278751,
		tag_name: 'v3.1.0',
		name: 'v3.1.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.1.0',
		body: '# [3.1.0](https://github.com/kentcdodds/dom-testing-library/compare/v3.0.2...v3.1.0) (2018-08-06)\n\n\n### Features\n\n* **fireEvent:** helper to assign target properties to node ([#85](https://github.com/kentcdodds/dom-testing-library/issues/85)) ([19c2868](https://github.com/kentcdodds/dom-testing-library/commit/19c2868))\n\n\n\n',
	},
	{
		id: 12013518,
		tag_name: 'v3.0.2',
		name: 'v3.0.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.0.2',
		body: '## [3.0.2](https://github.com/kentcdodds/dom-testing-library/compare/v3.0.1...v3.0.2) (2018-07-19)\n\n\n### Bug Fixes\n\n* Reference Node and MutationObserver off of the window object rather than globally ([#77](https://github.com/kentcdodds/dom-testing-library/issues/77)) ([7730d25](https://github.com/kentcdodds/dom-testing-library/commit/7730d25))\n\n\n\n',
	},
	{
		id: 11971642,
		tag_name: 'v3.0.1',
		name: 'v3.0.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.0.1',
		body: '## [3.0.1](https://github.com/kentcdodds/dom-testing-library/compare/v3.0.0...v3.0.1) (2018-07-17)\n\n\n### Bug Fixes\n\n* **waitForElement:** ensure waitForElement responds to attribute and textNode changes ([#74](https://github.com/kentcdodds/dom-testing-library/issues/74)) ([6e9d7c5](https://github.com/kentcdodds/dom-testing-library/commit/6e9d7c5))\n\n\n\n',
	},
	{
		id: 11866519,
		tag_name: 'v3.0.0',
		name: 'v3.0.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v3.0.0',
		body: "# [3.0.0](https://github.com/kentcdodds/dom-testing-library/compare/v2.9.1...v3.0.0) (2018-07-10)\n\n\n### Bug Fixes\n\n* remove extend-expect ([#70](https://github.com/kentcdodds/dom-testing-library/issues/70)) ([7f99fb8](https://github.com/kentcdodds/dom-testing-library/commit/7f99fb8))\n\n\n### BREAKING CHANGES\n\n* dom-testing-library no longer exposes the extend-expect module. Replace anywhere you're using `'dom-testing-library/extend-expect'` with `'jest-dom/extend-expect'` 👍\n\n\n\n",
	},
	{
		id: 11844309,
		tag_name: 'v2.9.1',
		name: 'v2.9.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v2.9.1',
		body: '## [2.9.1](https://github.com/kentcdodds/dom-testing-library/compare/v2.9.0...v2.9.1) (2018-07-09)\n\n\n### Bug Fixes\n\n* Make 2nd arg for getQueriesForElement optional and export within for TS types ([#68](https://github.com/kentcdodds/dom-testing-library/issues/68)) ([ec672a6](https://github.com/kentcdodds/dom-testing-library/commit/ec672a6))\n\n\n\n',
	},
	{
		id: 11843237,
		tag_name: 'v2.9.0',
		name: 'v2.9.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v2.9.0',
		body: '# [2.9.0](https://github.com/kentcdodds/dom-testing-library/compare/v2.8.0...v2.9.0) (2018-07-09)\n\n\n### Features\n\n* **queries:** allow overriding queries in getQueriesForElement ([#67](https://github.com/kentcdodds/dom-testing-library/issues/67)) ([e0200af](https://github.com/kentcdodds/dom-testing-library/commit/e0200af))\n\n\n\n',
	},
	{
		id: 11828275,
		tag_name: 'v2.8.0',
		name: 'v2.8.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v2.8.0',
		body: '# [2.8.0](https://github.com/kentcdodds/dom-testing-library/compare/v2.7.0...v2.8.0) (2018-07-08)\n\n\n### Features\n\n* **queries:** expose helper functions ([#66](https://github.com/kentcdodds/dom-testing-library/issues/66)) ([256f899](https://github.com/kentcdodds/dom-testing-library/commit/256f899))\n\n\n\n',
	},
	{
		id: 11718379,
		tag_name: 'v2.7.0',
		name: 'v2.7.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v2.7.0',
		body: '# [2.7.0](https://github.com/kentcdodds/dom-testing-library/compare/v2.6.4...v2.7.0) (2018-06-29)\n\n\n### Features\n\n* export UMD bundle ([2d98da2](https://github.com/kentcdodds/dom-testing-library/commit/2d98da2))\n\n\n\n',
	},
	{
		id: 11696132,
		tag_name: 'v2.6.4',
		name: 'v2.6.4',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v2.6.4',
		body: '## [2.6.4](https://github.com/kentcdodds/dom-testing-library/compare/v2.6.3...v2.6.4) (2018-06-28)\n\n\n### Bug Fixes\n\n* change node detection in debugDOM ([#64](https://github.com/kentcdodds/dom-testing-library/issues/64)) ([70d90c1](https://github.com/kentcdodds/dom-testing-library/commit/70d90c1))\n\n\n\n',
	},
	{
		id: 11684803,
		tag_name: 'v2.6.3',
		name: 'v2.6.3',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v2.6.3',
		body: '## [2.6.3](https://github.com/kentcdodds/dom-testing-library/compare/v2.6.2...v2.6.3) (2018-06-28)\n\n\n### Bug Fixes\n\n* **getByLabelText:** Support aria-labelledby attr containing multiple ids ([#59](https://github.com/kentcdodds/dom-testing-library/issues/59)) ([ba44c14](https://github.com/kentcdodds/dom-testing-library/commit/ba44c14))\n\n\n\n',
	},
	{
		id: 11619540,
		tag_name: 'v2.6.2',
		name: 'v2.6.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v2.6.2',
		body: '## [2.6.2](https://github.com/kentcdodds/dom-testing-library/compare/v2.6.1...v2.6.2) (2018-06-23)\n\n\n### Bug Fixes\n\n* **TS:** add typings for getByValue, getAllByValue, queryByValue, queryAllByValue ([#62](https://github.com/kentcdodds/dom-testing-library/issues/62)) ([e722b3a](https://github.com/kentcdodds/dom-testing-library/commit/e722b3a))\n\n\n\n',
	},
	{
		id: 11548484,
		tag_name: 'v2.6.1',
		name: 'v2.6.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v2.6.1',
		body: '## [2.6.1](https://github.com/kentcdodds/dom-testing-library/compare/v2.6.0...v2.6.1) (2018-06-19)\n\n\n### Bug Fixes\n\n* **TS:** Correct array return types for queryAll and getAll apis ([#60](https://github.com/kentcdodds/dom-testing-library/issues/60)) ([275496f](https://github.com/kentcdodds/dom-testing-library/commit/275496f))\n\n\n\n',
	},
	{
		id: 11446082,
		tag_name: 'v2.6.0',
		name: 'v2.6.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v2.6.0',
		body: '# [2.6.0](https://github.com/kentcdodds/dom-testing-library/compare/v2.5.0...v2.6.0) (2018-06-12)\n\n\n### Features\n\n* add within API [#53](https://github.com/kentcdodds/dom-testing-library/issues/53) ([#54](https://github.com/kentcdodds/dom-testing-library/issues/54)) ([b5bd755](https://github.com/kentcdodds/dom-testing-library/commit/b5bd755))\n\n\n\n',
	},
	{
		id: 11362727,
		tag_name: 'v2.5.0',
		name: 'v2.5.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v2.5.0',
		body: '# [2.5.0](https://github.com/kentcdodds/dom-testing-library/compare/v2.4.0...v2.5.0) (2018-06-07)\n\n\n### Features\n\n* **release:** manually release a patch version ([fb37c05](https://github.com/kentcdodds/dom-testing-library/commit/fb37c05)), closes [#51](https://github.com/kentcdodds/dom-testing-library/issues/51)\n\n\n\n',
	},
	{
		id: 11247703,
		tag_name: 'v2.4.0',
		name: 'v2.4.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v2.4.0',
		body: '<a name="2.4.0"></a>\n# [2.4.0](https://github.com/kentcdodds/dom-testing-library/compare/v2.3.2...v2.4.0) (2018-05-30)\n\n\n### Features\n\n* **logging:** don\'t log DOM in Cypress, don\'t highlight in the browser ([#45](https://github.com/kentcdodds/dom-testing-library/issues/45)) ([fd0c18c](https://github.com/kentcdodds/dom-testing-library/commit/fd0c18c))\n\n\n\n',
	},
	{
		id: 11073342,
		tag_name: 'v2.3.2',
		name: 'v2.3.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v2.3.2',
		body: '<a name="2.3.2"></a>\n## [2.3.2](https://github.com/kentcdodds/dom-testing-library/compare/v2.3.1...v2.3.2) (2018-05-18)\n\n\n### Bug Fixes\n\n* **ts:** matcher import path in get-queries-for-element typings ([#43](https://github.com/kentcdodds/dom-testing-library/issues/43)) ([b9f7597](https://github.com/kentcdodds/dom-testing-library/commit/b9f7597))\n\n\n\n',
	},
	{
		id: 11056507,
		tag_name: 'v2.3.1',
		name: 'v2.3.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v2.3.1',
		body: '<a name="2.3.1"></a>\n## [2.3.1](https://github.com/kentcdodds/dom-testing-library/compare/v2.3.0...v2.3.1) (2018-05-17)\n\n\n### Bug Fixes\n\n* **release:** manually release a patch version ([ecc9ebc](https://github.com/kentcdodds/dom-testing-library/commit/ecc9ebc)), closes [#40](https://github.com/kentcdodds/dom-testing-library/issues/40)\n\n\n\n',
	},
	{
		id: 11012063,
		tag_name: 'v2.3.0',
		name: 'v2.3.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v2.3.0',
		body: '<a name="2.3.0"></a>\n# [2.3.0](https://github.com/kentcdodds/dom-testing-library/compare/v2.2.0...v2.3.0) (2018-05-15)\n\n\n### Features\n\n* rename bindElementToQueries to getQueriesForElement ([#39](https://github.com/kentcdodds/dom-testing-library/issues/39)) ([7d7dd7a](https://github.com/kentcdodds/dom-testing-library/commit/7d7dd7a))\n\n\n\n',
	},
	{
		id: 10902861,
		tag_name: 'v2.2.0',
		name: 'v2.2.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v2.2.0',
		body: '<a name="2.2.0"></a>\n# [2.2.0](https://github.com/kentcdodds/dom-testing-library/compare/v2.1.0...v2.2.0) (2018-05-08)\n\n\n### Features\n\n* **TS:** add typescript definitions ([#37](https://github.com/kentcdodds/dom-testing-library/issues/37)) ([56b768d](https://github.com/kentcdodds/dom-testing-library/commit/56b768d))\n\n\n\n',
	},
	{
		id: 10869547,
		tag_name: 'v2.1.0',
		name: 'v2.1.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v2.1.0',
		body: '<a name="2.1.0"></a>\n# [2.1.0](https://github.com/kentcdodds/dom-testing-library/compare/v2.0.0...v2.1.0) (2018-05-06)\n\n\n### Features\n\n* **queryByValue:** add get/query by value ([#35](https://github.com/kentcdodds/dom-testing-library/issues/35)) ([b41b2e7](https://github.com/kentcdodds/dom-testing-library/commit/b41b2e7))\n\n\n\n',
	},
	{
		id: 10868798,
		tag_name: 'v2.0.0',
		name: 'v2.0.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v2.0.0',
		body: '<a name="2.0.0"></a>\n# [2.0.0](https://github.com/kentcdodds/dom-testing-library/compare/v1.11.0...v2.0.0) (2018-05-06)\n\n\n### Features\n\n* **TextMatch:** make fuzzy matching opt-in instead of default ([#31](https://github.com/kentcdodds/dom-testing-library/issues/31)) ([cde0cdf](https://github.com/kentcdodds/dom-testing-library/commit/cde0cdf))\n\n\n### BREAKING CHANGES\n\n* **TextMatch:** Strings are considered to be an exact match now. You can opt-into fuzzy matching, but it\'s recommended to use a regex instead.\n\n\n\n',
	},
	{
		id: 10865804,
		tag_name: 'v1.11.0',
		name: 'v1.11.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v1.11.0',
		body: '<a name="1.11.0"></a>\n# [1.11.0](https://github.com/kentcdodds/dom-testing-library/compare/v1.10.1...v1.11.0) (2018-05-05)\n\n\n### Features\n\n* **queryByTitle:** add new query for title attribute ([#34](https://github.com/kentcdodds/dom-testing-library/issues/34)) ([5fe849f](https://github.com/kentcdodds/dom-testing-library/commit/5fe849f))\n\n\n\n',
	},
	{
		id: 10859698,
		tag_name: 'v1.10.1',
		name: 'v1.10.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v1.10.1',
		body: '<a name="1.10.1"></a>\n## [1.10.1](https://github.com/kentcdodds/dom-testing-library/compare/v1.10.0...v1.10.1) (2018-05-04)\n\n\n### Bug Fixes\n\n* use exact match for data-testid ([#29](https://github.com/kentcdodds/dom-testing-library/issues/29)) ([7bab309](https://github.com/kentcdodds/dom-testing-library/commit/7bab309)), closes [#8](https://github.com/kentcdodds/dom-testing-library/issues/8)\n\n\n\n',
	},
	{
		id: 10701597,
		tag_name: 'v1.10.0',
		name: 'v1.10.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v1.10.0',
		body: '<a name="1.10.0"></a>\n# [1.10.0](https://github.com/kentcdodds/dom-testing-library/compare/v1.9.0...v1.10.0) (2018-04-24)\n\n\n### Features\n\n* **queries:** add queryAll/getAll methods ([#28](https://github.com/kentcdodds/dom-testing-library/issues/28)) ([6e0c752](https://github.com/kentcdodds/dom-testing-library/commit/6e0c752))\n\n\n\n',
	},
	{
		id: 10649642,
		tag_name: 'v1.9.0',
		name: 'v1.9.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v1.9.0',
		body: '<a name="1.9.0"></a>\n# [1.9.0](https://github.com/kentcdodds/dom-testing-library/compare/v1.8.0...v1.9.0) (2018-04-20)\n\n\n### Features\n\n* allow node >=6 ([#26](https://github.com/kentcdodds/dom-testing-library/issues/26)) ([cfafd9a](https://github.com/kentcdodds/dom-testing-library/commit/cfafd9a))\n\n\n\n',
	},
	{
		id: 10632505,
		tag_name: 'v1.8.0',
		name: 'v1.8.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v1.8.0',
		body: '<a name="1.8.0"></a>\n# [1.8.0](https://github.com/kentcdodds/dom-testing-library/compare/v1.7.1...v1.8.0) (2018-04-19)\n\n\n### Features\n\n* **prettyDOM:** Expose pretty-dom utility ([#25](https://github.com/kentcdodds/dom-testing-library/issues/25)) ([8748c89](https://github.com/kentcdodds/dom-testing-library/commit/8748c89))\n\n\n\n',
	},
	{
		id: 10508183,
		tag_name: 'v1.7.1',
		name: 'v1.7.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v1.7.1',
		body: '<a name="1.7.1"></a>\n## [1.7.1](https://github.com/kentcdodds/dom-testing-library/compare/v1.7.0...v1.7.1) (2018-04-12)\n\n\n### Bug Fixes\n\n* make the case-insensitive text matching only when TextMatch is a string. ([#23](https://github.com/kentcdodds/dom-testing-library/issues/23)) ([131a20b](https://github.com/kentcdodds/dom-testing-library/commit/131a20b))\n\n\n\n',
	},
	{
		id: 10502139,
		tag_name: 'v1.7.0',
		name: 'v1.7.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v1.7.0',
		body: '<a name="1.7.0"></a>\n# [1.7.0](https://github.com/kentcdodds/dom-testing-library/compare/v1.6.2...v1.7.0) (2018-04-11)\n\n\n### Features\n\n* **getNodeText :** add getNodeText and ignore extra whitespace in node texts ([#21](https://github.com/kentcdodds/dom-testing-library/issues/21)) ([2273f03](https://github.com/kentcdodds/dom-testing-library/commit/2273f03))\n\n\n\n',
	},
	{
		id: 10501127,
		tag_name: 'v1.6.2',
		name: 'v1.6.2',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v1.6.2',
		body: '<a name="1.6.2"></a>\n## [1.6.2](https://github.com/kentcdodds/dom-testing-library/compare/v1.6.1...v1.6.2) (2018-04-11)\n\n\n### Bug Fixes\n\n* special characters in id ([#22](https://github.com/kentcdodds/dom-testing-library/issues/22)) ([97af0e6](https://github.com/kentcdodds/dom-testing-library/commit/97af0e6))\n\n\n\n',
	},
	{
		id: 10496904,
		tag_name: 'v1.6.1',
		name: 'v1.6.1',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v1.6.1',
		body: '<a name="1.6.1"></a>\n## [1.6.1](https://github.com/kentcdodds/dom-testing-library/compare/v1.6.0...v1.6.1) (2018-04-11)\n\n\n### Bug Fixes\n\n* ignore extra whitespace when matching nodes by text content ([#19](https://github.com/kentcdodds/dom-testing-library/issues/19)) ([605ded7](https://github.com/kentcdodds/dom-testing-library/commit/605ded7))\n\n\n\n',
	},
	{
		id: 10495285,
		tag_name: 'v1.6.0',
		name: 'v1.6.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v1.6.0',
		body: '<a name="1.6.0"></a>\n# [1.6.0](https://github.com/kentcdodds/dom-testing-library/compare/v1.5.0...v1.6.0) (2018-04-11)\n\n\n### Features\n\n* add bindElementToQueries utility function for libraries using this API ([#18](https://github.com/kentcdodds/dom-testing-library/issues/18)) ([4410b4c](https://github.com/kentcdodds/dom-testing-library/commit/4410b4c)), closes [#17](https://github.com/kentcdodds/dom-testing-library/issues/17)\n\n\n\n',
	},
	{
		id: 10485528,
		tag_name: 'v1.5.0',
		name: 'v1.5.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v1.5.0',
		body: '<a name="1.5.0"></a>\n# [1.5.0](https://github.com/kentcdodds/dom-testing-library/compare/v1.4.0...v1.5.0) (2018-04-10)\n\n\n### Features\n\n* custom jest matchers from jest-dom ([#15](https://github.com/kentcdodds/dom-testing-library/issues/15)) ([f2683d9](https://github.com/kentcdodds/dom-testing-library/commit/f2683d9))\n\n\n\n',
	},
	{
		id: 10479387,
		tag_name: 'v1.4.0',
		name: 'v1.4.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v1.4.0',
		body: '<a name="1.4.0"></a>\n# [1.4.0](https://github.com/kentcdodds/dom-testing-library/compare/v1.3.0...v1.4.0) (2018-04-10)\n\n\n### Features\n\n* **debug:** Adding debug log when a get call fails ([#3](https://github.com/kentcdodds/dom-testing-library/issues/3)) ([c8069e3](https://github.com/kentcdodds/dom-testing-library/commit/c8069e3))\n\n\n\n',
	},
	{
		id: 10467647,
		tag_name: 'v1.3.0',
		name: 'v1.3.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v1.3.0',
		body: '<a name="1.3.0"></a>\n# [1.3.0](https://github.com/kentcdodds/dom-testing-library/compare/v1.2.0...v1.3.0) (2018-04-10)\n\n\n### Features\n\n* **fireEvent:** add fireEvent util ([#13](https://github.com/kentcdodds/dom-testing-library/issues/13)) ([d45b449](https://github.com/kentcdodds/dom-testing-library/commit/d45b449))\n\n\n\n',
	},
	{
		id: 10462433,
		tag_name: 'v1.2.0',
		name: 'v1.2.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v1.2.0',
		body: '<a name="1.2.0"></a>\n# [1.2.0](https://github.com/kentcdodds/dom-testing-library/compare/v1.1.0...v1.2.0) (2018-04-09)\n\n\n### Features\n\n* **waitForElement:** a wrapper around MutationObserver ([#10](https://github.com/kentcdodds/dom-testing-library/issues/10)) ([2289371](https://github.com/kentcdodds/dom-testing-library/commit/2289371))\n\n\n\n',
	},
	{
		id: 10439584,
		tag_name: 'v1.1.0',
		name: 'v1.1.0',
		html_url:
			'https://github.com/testing-library/dom-testing-library/releases/tag/v1.1.0',
		body: '<a name="1.1.0"></a>\n# [1.1.0](https://github.com/kentcdodds/dom-testing-library/compare/v1.0.0...v1.1.0) (2018-04-07)\n\n\n### Bug Fixes\n\n* setup semantic-release properly ([f77f943](https://github.com/kentcdodds/dom-testing-library/commit/f77f943))\n\n\n### Features\n\n* **matchers:** add toHaveClass custom matcher (closes [#2](https://github.com/kentcdodds/dom-testing-library/issues/2)) ([#4](https://github.com/kentcdodds/dom-testing-library/issues/4)) ([75d12c4](https://github.com/kentcdodds/dom-testing-library/commit/75d12c4))\n\n\n\n',
	},
]

export { domTestingLibraryReleases }
