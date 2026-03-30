import { Box, Heading, Icon, Link, Stack } from '@chakra-ui/react'
import { HiMiniLink } from 'react-icons/hi2'

import { useScrollToHash } from '@/hooks/useScrollToHash'
import type {
	ProcessedRelease,
	ProcessedReleasesCollection,
	ReleaseGroup,
	MinimalRepository,
} from '@/models'
import {
	compareReleaseGroupsByPriority,
	getSemVerReleaseGroup,
	slugify,
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
}: {
	title: ReleaseGroup
	releaseGroup: Array<ProcessedRelease>
	repository: MinimalRepository
}) => {
	const originalTitle = releaseGroup[0]?.originalTitle
	const displayTitle = originalTitle
		? getDisplayTitle(originalTitle, title)
		: title

	const slug = slugify(displayTitle)

	return (
		<Box>
			<Heading
				as="h2"
				size="2xl"
				fontWeight="extrabold"
				bgColor="bg.subtle"
				py="2"
				mt="1"
				textTransform="capitalize"
				position="sticky"
				top="0"
				id={slug}
			>
				<Link
					href={`#${slug}`}
					aria-label={`Link to ${displayTitle} section`}
					textDecorationColor="brand.emphasized"
				>
					{displayTitle}{' '}
					<Icon size="md">
						<HiMiniLink />
					</Icon>
				</Link>
			</Heading>
			<Box>
				{releaseGroup.map((processedReleaseChange: ProcessedRelease) => (
					<ProcessedReleaseChangeDescription
						key={`${title}-${processedReleaseChange.id}`}
						repository={repository}
						processedReleaseChange={processedReleaseChange}
						mb="2"
					/>
				))}
			</Box>
		</Box>
	)
}
type ComparatorChangelogResultsProps = {
	processedReleases: ProcessedReleasesCollection
	repository: MinimalRepository
}

export const ComparatorChangelogResults = ({
	processedReleases,
	repository,
}: ComparatorChangelogResultsProps) => {
	// Scroll to hash anchor once content is rendered
	useScrollToHash(!!processedReleases)

	const sortedGroupTitles = Object.keys(processedReleases).sort(
		compareReleaseGroupsByPriority,
	)

	return (
		<Stack gap="6" divideY="1px">
			{sortedGroupTitles.map((title) => (
				<ReleaseChangelogGroup
					key={title}
					title={title}
					releaseGroup={processedReleases[title]}
					repository={repository}
				/>
			))}
		</Stack>
	)
}
