import { Skeleton, Stack } from '@chakra-ui/react-v2'

export const TextSkeleton = () => {
	return (
		<Stack spacing={3}>
			<Skeleton height={4} width="25%" />
			<Skeleton height={4} width="40%" />
			<Skeleton height={4} width="10%" />
			<Skeleton height={4} width="35%" />
		</Stack>
	)
}
