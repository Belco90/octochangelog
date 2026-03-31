import {
	Box,
	Field,
	HStack,
	Icon,
	Portal,
	Select,
	Span,
	Spinner,
	useListCollection,
} from '@chakra-ui/react'
import { useCallback, useEffect, useRef } from 'react'
import { HiArrowDown } from 'react-icons/hi'

import type { MinimalRelease } from '@/models'
import { getReleaseVersion } from '@/utils'

type ReleaseVersionFieldProps = {
	label: string
	id?: string
	onChange(version: string): void
	placeholder?: string
	value?: string
	isLoading?: boolean
	isDisabled?: boolean
	options?: Array<MinimalRelease>
	error?: string
	onScrollNearEnd?: () => void
	isFetchingMore?: boolean
	hasMore?: boolean
}

export const ReleaseVersionField = ({
	options,
	label,
	id,
	placeholder,
	onChange,
	value,
	isLoading = false,
	isDisabled = false,
	error,
	onScrollNearEnd,
	isFetchingMore = false,
	hasMore = false,
}: ReleaseVersionFieldProps) => {
	const { collection, set: setCollection } = useListCollection<MinimalRelease>({
		initialItems: options ?? [],
		itemToString: (release) => getReleaseVersion(release),
		itemToValue: (release) => release.tag_name,
	})

	useEffect(() => {
		setCollection(options ?? [])
	}, [options, setCollection])

	const sentinelRef = useRef<HTMLDivElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)

	const stableOnScrollNearEnd = useCallback(() => {
		onScrollNearEnd?.()
	}, [onScrollNearEnd])

	useEffect(() => {
		const sentinel = sentinelRef.current
		const content = contentRef.current
		if (!sentinel || !content || !hasMore || isFetchingMore) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					stableOnScrollNearEnd()
				}
			},
			{ root: content, threshold: 0 },
		)
		observer.observe(sentinel)
		return () => observer.disconnect()
	}, [stableOnScrollNearEnd, hasMore, isFetchingMore])

	const hasError = Boolean(error)
	const hasOptions = options != null && options.length > 0

	return (
		<Field.Root disabled={isDisabled} gap="1" invalid={hasError}>
			<Select.Root
				collection={collection}
				size="lg"
				value={value ? [value] : []}
				onValueChange={(details) => {
					const selectedValue = details.value[0]
					if (selectedValue) {
						onChange(selectedValue)
					}
				}}
				positioning={{ sameWidth: true }}
				disabled={isDisabled}
				invalid={hasError}
			>
				<Select.Label>{label}</Select.Label>

				<Select.HiddenSelect id={id} />

				<Select.Control pr="-8">
					<Select.Trigger
						fontWeight="medium"
						rounded="2xl"
						_focusVisible={{
							borderColor: 'border',
						}}
					>
						<Select.ValueText
							placeholder={isLoading ? 'Loading...' : placeholder}
						/>
						<Select.Indicator mr="-1">
							<Icon color="brand.fg">
								<HiArrowDown />
							</Icon>
						</Select.Indicator>
					</Select.Trigger>
				</Select.Control>

				<Portal>
					<Select.Positioner>
						<Select.Content ref={contentRef} maxHeight="xs" overflowY="auto">
							{collection.items.map((release) => (
								<Select.Item
									key={release.id}
									item={release}
									bgColor={{
										_highlighted: 'brand.muted',
									}}
								>
									<Select.ItemText>
										{getReleaseVersion(release)}
									</Select.ItemText>
									<Select.ItemIndicator
										color="brand.fg"
										css={{
											_icon: {
												boxSize: '5',
											},
										}}
									/>
								</Select.Item>
							))}

							{/* Scroll sentinel for infinite loading */}
							<Box ref={sentinelRef} css={{ height: '1px' }} />

							{isFetchingMore && (
								<HStack p="2" justifyContent="center">
									<Spinner size="sm" borderWidth="md" color="brand.fg" />
									<Span fontSize="sm">Loading more releases...</Span>
								</HStack>
							)}
							{!hasMore && hasOptions && (
								<Box p="2" textAlign="center">
									<Span fontSize="sm" color="fg.muted">
										No more releases available
									</Span>
								</Box>
							)}
						</Select.Content>
					</Select.Positioner>
				</Portal>
			</Select.Root>

			<Field.ErrorText>{error}</Field.ErrorText>
		</Field.Root>
	)
}
