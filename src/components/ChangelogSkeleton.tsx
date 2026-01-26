import { Skeleton, SkeletonText, VStack } from '@chakra-ui/react'

export function ChangelogSkeleton() {
	return (
		<VStack
			gap="8"
			alignItems="start"
			aria-busy="true"
			aria-label="Calculating changelog"
		>
			<Skeleton width="40" height="10" />
			<SkeletonText noOfLines={7} />

			<Skeleton width="40" height="10" />
			<SkeletonText noOfLines={3} />
		</VStack>
	)
}
