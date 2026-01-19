import type { components } from '@octokit/openapi-types'
import type { Root } from 'mdast'
import type { ReactElement, PropsWithChildren, ReactNode } from 'react'

type PropsWithRequiredChildren<TProps = unknown> = PropsWithChildren<TProps> & {
	children: ReactNode
}

type CompareSearchParams = {
	repo?: string
	from?: string
	to?: string
}

type SemVerGroup = 'breaking changes' | 'features' | 'bug fixes'

type MiscGroup = 'others' | 'artifacts' | 'thanks' | 'credits'

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
type ReleaseGroup = SemVerGroup | MiscGroup | string

type RepositoryQueryParams = {
	repo: string
	owner: string
}

// We don't use the full repo, but it's useful for typing query responses
type FullRepository = components['schemas']['full-repository']

/**
 * Minimal properties from a GitHub repository that are used across the webapp.
 */
type MinimalRepository = Pick<
	FullRepository,
	'id' | 'owner' | 'html_url' | 'full_name' | 'name'
>

/**
 * Minimal properties from a GitHub release that are used across the webapp.
 */
type MinimalRelease = Pick<
	components['schemas']['release'],
	'id' | 'tag_name' | 'name' | 'html_url' | 'body'
>

type RepoSearchResultItem = components['schemas']['repo-search-result-item']

interface ProcessedRelease extends Omit<MinimalRelease, 'body'> {
	title: string
	originalTitle: string
	descriptionMdast: Root
}

type ProcessedReleasesCollection = Record<ReleaseGroup, Array<ProcessedRelease>>

type ReleaseVersion = string

type ComponentPropsWithoutNode = Record<string, unknown>

type ComponentLike<
	T,
	P extends ComponentPropsWithoutNode = ComponentPropsWithoutNode,
> = (props: P) => T | null

type ComponentsMapping = Record<string, ComponentLike<ReactElement>>

export type {
	PropsWithRequiredChildren,
	CompareSearchParams,
	SemVerGroup,
	MiscGroup,
	ReleaseGroup,
	RepositoryQueryParams,
	FullRepository,
	MinimalRepository,
	MinimalRelease,
	RepoSearchResultItem,
	ProcessedRelease,
	ProcessedReleasesCollection,
	ReleaseVersion,
	ComponentsMapping,
}
