import { Box, Heading, Stack } from '@chakra-ui/react'

import { ChangelogSkeleton } from '@/components/ChangelogSkeleton'
import { useProcessReleases } from '@/hooks/useProcessReleases'
import type {
	MinimalRelease,
	ProcessedRelease,
	ReleaseGroup,
	MinimalRepository,
} from '@/models'
import {
	compareReleaseGroupsByPriority,
	getSemVerReleaseGroup,
	stripEmojis,
} from '@/utils'

import { ProcessedReleaseChangeDescription } from './ProcessedReleaseChangeDescription'

function getDisplayTitle(originalTitle: string, processedTitle: string) {
	if (processedTitle === 'others') {
		return processedTitle
	}

	return originalTitle
		? getSemVerReleaseGroup(stripEmojis(originalTitle).trim())
		: processedTitle
}

const ReleaseChangelogGroup = ({
	title,
	releaseGroup,
	repository,
	shouldShowTitle,
}: {
	title: ReleaseGroup
	releaseGroup: Array<ProcessedRelease>
	repository: MinimalRepository
	shouldShowTitle: boolean
}) => {
	const originalTitle = releaseGroup[0]?.originalTitle
	const displayTitle = originalTitle
		? getDisplayTitle(originalTitle, title)
		: title

	const textTransform =
		title === 'breaking changes' ? 'uppercase' : 'capitalize'

	return (
		<Box key={title}>
			{shouldShowTitle && (
				<Heading
					as="h3"
					size="xl"
					bgColor="background3"
					mb={4}
					py={4}
					textTransform={textTransform}
					position="sticky"
					top={0}
				>
					{displayTitle}
				</Heading>
			)}
			<Box mb={4}>
				{releaseGroup.map((processedReleaseChange: ProcessedRelease) => (
					<ProcessedReleaseChangeDescription
						key={`${title}-${processedReleaseChange.id}`}
						repository={repository}
						processedReleaseChange={processedReleaseChange}
						mb={8}
					/>
				))}
			</Box>
		</Box>
	)
}
type ComparatorChangelogResultsProps = {
	releases: Array<MinimalRelease>
	repository: MinimalRepository
}

export const ComparatorChangelogResults = ({
	releases,
	repository,
}: ComparatorChangelogResultsProps) => {
	const { processedReleases, isProcessing } = useProcessReleases(releases)

	const shouldShowProcessedReleaseTitle = (() => {
		if (!processedReleases) {
			return false
		}

		const groupsTitles = Object.keys(processedReleases)

		return groupsTitles.length > 1 || !groupsTitles.includes('others')
	})()

	const sortedGroupTitles: Array<string> | null = processedReleases
		? Object.keys(processedReleases).sort(compareReleaseGroupsByPriority)
		: []

	if (isProcessing) {
		return <ChangelogSkeleton />
	}

	if (!processedReleases || Object.keys(processedReleases).length === 0) {
		return null
	}

	return (
		<Stack gap={6}>
			{sortedGroupTitles.map((title) => (
				<ReleaseChangelogGroup
					key={title}
					title={title}
					releaseGroup={processedReleases[title]}
					repository={repository}
					shouldShowTitle={shouldShowProcessedReleaseTitle}
				/>
			))}
		</Stack>
	)
}
