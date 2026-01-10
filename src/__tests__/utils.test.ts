import { describe, expect, it } from 'vitest'

import type {
	MinimalRelease,
	Repository,
	RepositoryQueryParams,
} from '@/models'
import {
	compareReleaseGroupsByPriority,
	compareReleasesByVersion,
	extractVersionFromTag,
	filterReleasesByVersionRange,
	getMdastContentNodeTitle,
	getMdastContentReleaseGroup,
	getReleaseVersion,
	isStableRelease,
	mapRepositoryToQueryParams,
	mapStringToRepositoryQueryParams,
	paginateList,
	sanitizeReleaseGroupTitle,
} from '@/utils'

import type { RootContent } from 'mdast'

describe('mapRepositoryToQueryParams util', () => {
	it.each`
		label               | input                                       | output
		${'an empty repo'}  | ${undefined}                                | ${{ owner: '', repo: '' }}
		${'a full repo'}    | ${{ owner: { login: 'foo' }, name: 'bar' }} | ${{ owner: 'foo', repo: 'bar' }}
		${'a partial repo'} | ${{ owner: {}, name: 'bar' }}               | ${{ owner: '', repo: 'bar' }}
	`(
		'should map $label',
		({
			input,
			output,
		}: {
			input: undefined | Repository
			output: RepositoryQueryParams
		}) => {
			const result = mapRepositoryToQueryParams(input)

			expect(result).toEqual(output)
		},
	)
})

describe('mapStringToRepositoryQueryParams util', () => {
	it.each`
		label                                                | input         | output
		${'full repo details from splittable string'}        | ${'org/name'} | ${{ owner: 'org', repo: 'name' }}
		${'partial repo details from non-splittable string'} | ${'foo'}      | ${{ owner: 'foo', repo: '' }}
		${'empty details from empty string'}                 | ${''}         | ${{ owner: '', repo: '' }}
	`(
		'should return $label',
		({
			input,
			output,
		}: {
			label: string
			input: string
			output: RepositoryQueryParams
		}) => {
			const result = mapStringToRepositoryQueryParams(input)

			expect(result).toEqual(output)
		},
	)
})

describe('extractVersionFromTag util', () => {
	it.each`
		label                                            | input                      | output
		${'scoped tag with @yarnpkg/cli format'}         | ${'@yarnpkg/cli/4.9.4'}    | ${'4.9.4'}
		${'scoped tag with another scope'}               | ${'@scope/package/1.2.3'}  | ${'1.2.3'}
		${'scoped tag with v prefix'}                    | ${'@scope/pkg/v2.0.0'}     | ${'v2.0.0'}
		${'standard tag with v prefix'}                  | ${'v1.2.3'}                | ${'v1.2.3'}
		${'standard tag without v prefix'}               | ${'1.2.3'}                 | ${'1.2.3'}
		${'tag with multiple slashes keeping only last'} | ${'@scope/sub/pkg/3.4.5'}  | ${'3.4.5'}
		${'prerelease scoped tag'}                       | ${'@scope/pkg/1.0.0-beta'} | ${'1.0.0-beta'}
		${'prerelease standard tag'}                     | ${'v2.0.0-alpha.1'}        | ${'v2.0.0-alpha.1'}
		${'tag without slashes'}                         | ${'5.0.0'}                 | ${'5.0.0'}
		${'invalid version with slash returns full tag'} | ${'invalid/notversion'}    | ${'invalid/notversion'}
	`(
		'should extract $label',
		({ input, output }: { label: string; input: string; output: string }) => {
			const result = extractVersionFromTag(input)

			expect(result).toBe(output)
		},
	)
})

describe('getReleaseVersion util', () => {
	it.each`
		tagName     | releaseName    | output
		${'latest'} | ${'v5.2.0'}    | ${'v5.2.0'}
		${'latest'} | ${''}          | ${'latest'}
		${'v1.2.3'} | ${'ignore me'} | ${'v1.2.3'}
	`(
		'should return the correct version for a release with tag $tagName and name $releaseName',
		({
			tagName,
			releaseName,
			output,
		}: {
			tagName: string
			releaseName: string
			output: string
		}) => {
			const result = getReleaseVersion({
				tag_name: tagName,
				name: releaseName,
			} as MinimalRelease)

			expect(result).toEqual(output)
		},
	)

	describe('with scoped tags', () => {
		it.each`
			tagName                   | releaseName    | output
			${'@yarnpkg/cli/4.9.4'}   | ${'ignore me'} | ${'4.9.4'}
			${'@scope/package/1.2.3'} | ${''}          | ${'1.2.3'}
			${'@scope/pkg/v2.0.0'}    | ${'Version 2'} | ${'v2.0.0'}
		`(
			'should extract version from scoped tag $tagName',
			({
				tagName,
				releaseName,
				output,
			}: {
				tagName: string
				releaseName: string
				output: string
			}) => {
				const result = getReleaseVersion({
					tag_name: tagName,
					name: releaseName,
				} as MinimalRelease)

				expect(result).toEqual(output)
			},
		)
	})
})

describe('filterReleasesByVersionRange util', () => {
	const getFakeReleases = (): Array<MinimalRelease> => {
		return [
			{ tag_name: 'v2.9.23' },
			{ tag_name: 'v2.9.15' },
			{ tag_name: 'v2.9.7' },
			{ tag_name: 'v2.2.0' },
			{ tag_name: 'v2.1.0' },
			{ tag_name: 'v2.0.0' },
			{ tag_name: 'v1.1.2' },
			{ tag_name: 'v1.1.1' },
			{ tag_name: 'v1.1.0' },
			{ tag_name: 'v1.0.0' },
		] as Array<MinimalRelease>
	}

	it('should filter by provided range excluding the "from" but including the "to"', () => {
		const result = filterReleasesByVersionRange({
			releases: getFakeReleases(),
			from: 'v2.0.0',
			to: 'v2.9.7',
		})

		expect(result).toEqual([
			{ tag_name: 'v2.9.7' },
			{ tag_name: 'v2.2.0' },
			{ tag_name: 'v2.1.0' },
		])
	})

	it('should filter until the latest available release', () => {
		const result = filterReleasesByVersionRange({
			releases: getFakeReleases(),
			from: 'v2.0.0',
			to: 'latest',
		})

		expect(result).toEqual([
			{ tag_name: 'v2.9.23' },
			{ tag_name: 'v2.9.15' },
			{ tag_name: 'v2.9.7' },
			{ tag_name: 'v2.2.0' },
			{ tag_name: 'v2.1.0' },
		])
	})

	it('should return an empty array if the range is the other way around', () => {
		const result = filterReleasesByVersionRange({
			releases: getFakeReleases(),
			from: 'v2.0.0',
			to: 'v1.0.0',
		})

		expect(result).toEqual([])
	})

	it('should return an empty array if the releases are out of the range', () => {
		const result = filterReleasesByVersionRange({
			releases: getFakeReleases(),
			from: 'v2.99.0',
			to: 'v5.0.0',
		})

		expect(result).toEqual([])
	})

	it('should throw an error if a range version is invalid', () => {
		expect(() =>
			filterReleasesByVersionRange({
				releases: getFakeReleases(),
				from: '1',
				to: '2',
			}),
		).toThrow(TypeError('Invalid Version: 1'))
	})

	describe('with scoped tags', () => {
		const getScopedReleases = (): Array<MinimalRelease> => {
			return [
				{ tag_name: '@yarnpkg/cli/4.9.4' },
				{ tag_name: '@yarnpkg/cli/4.9.2' },
				{ tag_name: '@yarnpkg/cli/4.8.0' },
				{ tag_name: '@yarnpkg/cli/4.7.1' },
				{ tag_name: '@yarnpkg/cli/4.7.0' },
				{ tag_name: '@yarnpkg/cli/4.6.0' },
			] as Array<MinimalRelease>
		}

		it('should filter scoped releases by provided range', () => {
			const result = filterReleasesByVersionRange({
				releases: getScopedReleases(),
				from: '@yarnpkg/cli/4.6.0',
				to: '@yarnpkg/cli/4.8.0',
			})

			expect(result).toEqual([
				{ tag_name: '@yarnpkg/cli/4.8.0' },
				{ tag_name: '@yarnpkg/cli/4.7.1' },
				{ tag_name: '@yarnpkg/cli/4.7.0' },
			])
		})

		it('should filter scoped releases until latest', () => {
			const result = filterReleasesByVersionRange({
				releases: getScopedReleases(),
				from: '@yarnpkg/cli/4.7.0',
				to: 'latest',
			})

			expect(result).toEqual([
				{ tag_name: '@yarnpkg/cli/4.9.4' },
				{ tag_name: '@yarnpkg/cli/4.9.2' },
				{ tag_name: '@yarnpkg/cli/4.8.0' },
				{ tag_name: '@yarnpkg/cli/4.7.1' },
			])
		})

		it('should work with mixed scoped and non-scoped versions', () => {
			const mixedReleases = [
				{ tag_name: '@scope/pkg/3.0.0' },
				{ tag_name: 'v2.5.0' },
				{ tag_name: '@scope/pkg/2.0.0' },
				{ tag_name: 'v1.5.0' },
			] as Array<MinimalRelease>

			const result = filterReleasesByVersionRange({
				releases: mixedReleases,
				from: 'v1.5.0',
				to: 'v2.5.0',
			})

			expect(result).toEqual([
				{ tag_name: 'v2.5.0' },
				{ tag_name: '@scope/pkg/2.0.0' },
			])
		})
	})
})

describe('isStableRelease util', () => {
	it.each`
		tagName                 | output
		${'v0.7.0'}             | ${true}
		${'v1.0.0'}             | ${true}
		${'v2.5.7'}             | ${true}
		${'v5.0.0-alpha.3'}     | ${false}
		${'v4.0.0-beta.4'}      | ${false}
		${'I am not a release'} | ${false}
	`(
		'should return $output for tag $tagName',
		({ tagName, output }: { tagName: string; output: boolean }) => {
			const result = isStableRelease({ tag_name: tagName } as MinimalRelease)

			expect(result).toBe(output)
		},
	)

	describe('with scoped tags', () => {
		it.each`
			tagName                         | output
			${'@yarnpkg/cli/4.9.4'}         | ${true}
			${'@scope/package/1.0.0'}       | ${true}
			${'@scope/pkg/2.5.7'}           | ${true}
			${'@scope/pkg/5.0.0-alpha.3'}   | ${false}
			${'@scope/pkg/4.0.0-beta.4'}    | ${false}
			${'@scope/pkg/1.0.0-rc.1'}      | ${false}
			${'@scope/notaversion/invalid'} | ${false}
		`(
			'should return $output for scoped tag $tagName',
			({ tagName, output }: { tagName: string; output: boolean }) => {
				const result = isStableRelease({ tag_name: tagName } as MinimalRelease)

				expect(result).toBe(output)
			},
		)
	})
})

describe('sanitizeReleaseGroupTitle', () => {
	it.each`
		input                  | output
		${'BREAKING CHANGES'}  | ${'breaking changes'}
		${'Bug Fixes'}         | ${'bug fixes'}
		${'minor'}             | ${'minor'}
		${'minor-release'}     | ${'minor release'}
		${'🐛 Bug fix'}        | ${'bug fix'}
		${'    trim this    '} | ${'trim this'}
	`(
		'should return $output for input $input',
		({ input, output }: { input: string; output: boolean }) => {
			const result = sanitizeReleaseGroupTitle(input)

			expect(result).toEqual(output)
		},
	)
})

describe('getMdastContentNodeTitle util', () => {
	it('should return the title of the first child node found', () => {
		const result = getMdastContentNodeTitle({
			children: [{ value: 'foo' }, { value: 'bar' }],
		} as RootContent)

		expect(result).toBe('foo')
	})

	it('should return "unknown" if the first child node found has no title', () => {
		const result = getMdastContentNodeTitle({
			children: [{}, { value: 'bar' }],
		} as RootContent)

		expect(result).toBe('unknown')
	})

	it('should return "unknown" if there are no children', () => {
		const result = getMdastContentNodeTitle({} as RootContent)

		expect(result).toBe('unknown')
	})
})

describe('getMdastContentReleaseGroup util', () => {
	it.each`
		input                 | output
		${'Major Features'}   | ${'features'}
		${'🐙 Features'}      | ${'features'}
		${'Minor changes'}    | ${'features'}
		${'Breaking Changes'} | ${'breaking changes'}
		${'Major release'}    | ${'breaking changes'}
		${'🐞 Bug fixes'}     | ${'bug fixes'}
		${'bugs'}             | ${'bug fixes'}
		${'Patch release'}    | ${'bug fixes'}
		${'Thanks to'}        | ${'thanks'}
		${'Artifacts'}        | ${'artifacts'}
		${'Credits to'}       | ${'credits'}
		${'📑 Documentation'} | ${'documentation'}
		${'Core changes:'}    | ${'core changes'}
	`(
		'should return the group $output for a node with the title $input',
		({ input, output }: { input: string; output: string }) => {
			const result = getMdastContentReleaseGroup({
				children: [{ value: input }],
			} as RootContent)

			expect(result).toBe(output)
		},
	)
})

describe('compareReleaseGroupsByPriority util', () => {
	it('should sort groups by desc priority', () => {
		const groups = [
			'credits',
			'features',
			'📑 documentation',
			'bug fixes',
			'core changes',
			'thanks',
			'artifacts',
			'breaking changes',
		]

		groups.sort(compareReleaseGroupsByPriority)

		expect(groups).toEqual([
			'breaking changes',
			'features',
			'bug fixes',
			'📑 documentation',
			'core changes',
			'credits',
			'thanks',
			'artifacts',
		])
	})
})

describe('compareReleasesByVersion', () => {
	const getUnsortedReleases = (): Array<MinimalRelease> => {
		return [
			{ tag_name: 'v4.5.0' },
			{ tag_name: 'v1.0.0' },
			{ tag_name: 'v0.9.0' },
			{ tag_name: 'v4.5.1' },
			{ tag_name: 'v5.0.0' },
			{ tag_name: 'v1.1.0' },
			{ tag_name: 'v1.0.1' },
		] as Array<MinimalRelease>
	}

	it('should sort versions by desc order', () => {
		const releases = getUnsortedReleases()

		releases.sort(compareReleasesByVersion)

		expect(releases).toEqual([
			{ tag_name: 'v5.0.0' },
			{ tag_name: 'v4.5.1' },
			{ tag_name: 'v4.5.0' },
			{ tag_name: 'v1.1.0' },
			{ tag_name: 'v1.0.1' },
			{ tag_name: 'v1.0.0' },
			{ tag_name: 'v0.9.0' },
		])
	})

	it('should sort versions by asc order', () => {
		const releases = getUnsortedReleases()

		releases.sort((a, b) => compareReleasesByVersion(a, b, 'asc'))

		expect(releases).toEqual([
			{ tag_name: 'v0.9.0' },
			{ tag_name: 'v1.0.0' },
			{ tag_name: 'v1.0.1' },
			{ tag_name: 'v1.1.0' },
			{ tag_name: 'v4.5.0' },
			{ tag_name: 'v4.5.1' },
			{ tag_name: 'v5.0.0' },
		])
	})

	describe('with scoped tags', () => {
		const getScopedUnsortedReleases = (): Array<MinimalRelease> => {
			return [
				{ tag_name: '@yarnpkg/cli/4.5.0' },
				{ tag_name: '@yarnpkg/cli/1.0.0' },
				{ tag_name: '@yarnpkg/cli/4.9.4' },
				{ tag_name: '@yarnpkg/cli/4.5.1' },
				{ tag_name: '@yarnpkg/cli/5.0.0' },
				{ tag_name: '@yarnpkg/cli/1.1.0' },
			] as Array<MinimalRelease>
		}

		it('should sort scoped versions by desc order', () => {
			const releases = getScopedUnsortedReleases()

			releases.sort(compareReleasesByVersion)

			expect(releases).toEqual([
				{ tag_name: '@yarnpkg/cli/5.0.0' },
				{ tag_name: '@yarnpkg/cli/4.9.4' },
				{ tag_name: '@yarnpkg/cli/4.5.1' },
				{ tag_name: '@yarnpkg/cli/4.5.0' },
				{ tag_name: '@yarnpkg/cli/1.1.0' },
				{ tag_name: '@yarnpkg/cli/1.0.0' },
			])
		})

		it('should sort scoped versions by asc order', () => {
			const releases = getScopedUnsortedReleases()

			releases.sort((a, b) => compareReleasesByVersion(a, b, 'asc'))

			expect(releases).toEqual([
				{ tag_name: '@yarnpkg/cli/1.0.0' },
				{ tag_name: '@yarnpkg/cli/1.1.0' },
				{ tag_name: '@yarnpkg/cli/4.5.0' },
				{ tag_name: '@yarnpkg/cli/4.5.1' },
				{ tag_name: '@yarnpkg/cli/4.9.4' },
				{ tag_name: '@yarnpkg/cli/5.0.0' },
			])
		})

		it('should sort mixed scoped and non-scoped versions', () => {
			const mixedReleases = [
				{ tag_name: '@scope/pkg/3.0.0' },
				{ tag_name: 'v2.0.0' },
				{ tag_name: '@scope/pkg/1.0.0' },
				{ tag_name: 'v4.0.0' },
			] as Array<MinimalRelease>

			mixedReleases.sort(compareReleasesByVersion)

			expect(mixedReleases).toEqual([
				{ tag_name: 'v4.0.0' },
				{ tag_name: '@scope/pkg/3.0.0' },
				{ tag_name: 'v2.0.0' },
				{ tag_name: '@scope/pkg/1.0.0' },
			])
		})
	})
})

describe('paginateList util', () => {
	it.each`
		caseTitle | inputList          | perPage | pageIndex | expectedList       | expectedHasNext
		${'A'}    | ${[1, 2, 3, 4, 5]} | ${2}    | ${1}      | ${[1, 2]}          | ${true}
		${'B'}    | ${[1, 2, 3, 4, 5]} | ${4}    | ${2}      | ${[5]}             | ${false}
		${'C'}    | ${[1, 2, 3, 4, 5]} | ${4}    | ${3}      | ${[]}              | ${false}
		${'D'}    | ${['a', 'b', 'c']} | ${2}    | ${1}      | ${['a', 'b']}      | ${true}
		${'E'}    | ${['a', 'b', 'c']} | ${3}    | ${1}      | ${['a', 'b', 'c']} | ${false}
	`(
		'should paginate the input list $inputList correctly with $perPage elements per page, and index $pageIndex',
		({
			inputList,
			perPage,
			pageIndex,
			expectedList,
			expectedHasNext,
		}: {
			caseTitle: string
			inputList: Array<unknown>
			perPage: number
			pageIndex: number
			expectedList: Array<unknown>
			expectedHasNext: boolean
		}) => {
			const result = paginateList(inputList, perPage, pageIndex)

			expect(result).toEqual({ data: expectedList, hasNext: expectedHasNext })
		},
	)

	it('should throw an error if page index is 0', () => {
		expect(() => paginateList([1, 2, 3], 1, 0)).toThrow(
			'`pageIndex` is 1-based index so 0 is not a valid value.',
		)
	})
})
