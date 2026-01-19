import { useReducer, useEffect } from 'react'
import gfm from 'remark-gfm'
import parse from 'remark-parse'
import { unified } from 'unified'

import type {
	MinimalRelease,
	ProcessedRelease,
	ProcessedReleasesCollection,
} from '@/models'
import {
	getMdastContentNodeTitle,
	getSemVerReleaseGroup,
	sanitizeReleaseGroupTitle,
} from '@/utils'

import type { Root } from 'mdast'
import type { Processor } from 'unified'

function insertReleaseInGroup(
	newProcessedRelease: ProcessedRelease,
	groupedReleases: ProcessedReleasesCollection,
): void {
	const { title } = newProcessedRelease
	if (Array.isArray(groupedReleases[title])) {
		// Group already exists, then append new changes of same type
		groupedReleases[title].push(newProcessedRelease)
	} else {
		// Group doesn't exist yet, then create it and init with new changes
		groupedReleases[title] = [newProcessedRelease]
	}
}

function processedReleaseIsEmpty(processedRelease: ProcessedRelease): boolean {
	return processedRelease.descriptionMdast.children.length === 0
}

const processor = unified().use(parse).use(gfm) as Processor<Root>

function processReleases(
	releases: Array<MinimalRelease>,
): ProcessedReleasesCollection {
	const processedReleasesCollection: ProcessedReleasesCollection = {}

	for (const rel of releases) {
		const { body, ...remainingRel } = rel

		if (!body) {
			continue
		}

		const mdastDescription = processor.parse(body)

		let newProcessedRelease: ProcessedRelease | undefined
		for (const mdastNode of mdastDescription.children) {
			const originalTitle = getMdastContentNodeTitle(mdastNode)

			if (mdastNode.type === 'heading' && [1, 2, 3].includes(mdastNode.depth)) {
				// Check if prev release available, and save it if so...
				if (
					newProcessedRelease &&
					!processedReleaseIsEmpty(newProcessedRelease)
				) {
					insertReleaseInGroup(newProcessedRelease, processedReleasesCollection)
				}

				// ... and create new release if proper header found
				const sanitizedTitle = sanitizeReleaseGroupTitle(originalTitle)
				const title = getSemVerReleaseGroup(sanitizedTitle)
				if (title) {
					newProcessedRelease = {
						title,
						originalTitle,
						descriptionMdast: {
							type: 'root',
							children: [],
						},
						...remainingRel,
					}
				}
			} else if (newProcessedRelease) {
				// Append content to current release
				newProcessedRelease.descriptionMdast.children.push(mdastNode)
			} else {
				// Standalone or non-groupable release found
				newProcessedRelease = {
					title: 'others',
					originalTitle,
					descriptionMdast: {
						type: 'root',
						children: [mdastNode],
					},
					...remainingRel,
				}
			}
		}
		// Insert final release in group
		if (newProcessedRelease && !processedReleaseIsEmpty(newProcessedRelease)) {
			insertReleaseInGroup(newProcessedRelease, processedReleasesCollection)
		}
	}
	return processedReleasesCollection
}

interface UseProcessReleasesReturn {
	processedReleases: ProcessedReleasesCollection | null
	isProcessing: boolean
}

interface ProcessReleasesState {
	processedReleases: ProcessedReleasesCollection | null
	isProcessing: boolean
}

type ProcessReleasesAction =
	| { type: 'START_PROCESSING' }
	| {
			type: 'SET_PROCESSED_RELEASES'
			payload: ProcessedReleasesCollection | null
	  }

function processReleasesReducer(
	state: ProcessReleasesState,
	action: ProcessReleasesAction,
): ProcessReleasesState {
	switch (action.type) {
		case 'START_PROCESSING':
			return { ...state, isProcessing: true }
		case 'SET_PROCESSED_RELEASES':
			return { processedReleases: action.payload, isProcessing: false }
		default:
			return state
	}
}

const initialState: ProcessReleasesState = {
	processedReleases: null,
	isProcessing: false,
}

export function useProcessReleases(
	releases: Array<MinimalRelease> | null,
): UseProcessReleasesReturn {
	const [state, dispatch] = useReducer(processReleasesReducer, initialState)

	useEffect(() => {
		dispatch({ type: 'START_PROCESSING' })

		const timeoutId = setTimeout(() => {
			if (!releases || releases.length === 0) {
				dispatch({ type: 'SET_PROCESSED_RELEASES', payload: null })
			} else {
				const result = processReleases(releases)
				dispatch({ type: 'SET_PROCESSED_RELEASES', payload: result })
			}
		}, 0)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [releases])

	return {
		processedReleases: state.processedReleases,
		isProcessing: state.isProcessing,
	}
}
