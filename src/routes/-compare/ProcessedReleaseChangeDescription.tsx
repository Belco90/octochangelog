import {
	SkeletonText,
	Box,
	Code,
	Heading,
	Icon,
	Tag,
	Text,
	Span,
} from '@chakra-ui/react'
import { HiOutlineExternalLink } from 'react-icons/hi'

import { Link } from '@/components/Link'
import type { LinkProps } from '@/components/Link'
import { SimpleBlockquote } from '@/components/SimpleBlockquote'
import { useProcessDescriptionMdast } from '@/hooks/useProcessDescriptionMdast'
import type { ProcessedRelease, MinimalRepository } from '@/models'
import { getReleaseVersion } from '@/utils'

import type { BoxProps } from '@chakra-ui/react'

type RemarkComponentProps = Record<string, unknown>

const RemarkH3 = (props: RemarkComponentProps) => (
	<Heading as="h3" size="xl" mb="4" {...props} />
)

const RemarkH4 = (props: RemarkComponentProps) => (
	<Heading as="h4" size="lg" mb="4" {...props} />
)

const RemarkH5 = (props: RemarkComponentProps) => (
	<Heading as="h5" size="md" mb="4" {...props} />
)

const RemarkH6 = (props: RemarkComponentProps) => (
	<Heading as="h6" size="md" mb="4" {...props} />
)

const RemarkP = (props: RemarkComponentProps) => <Text mb="2" {...props} />

const RemarkA = ({ href, children, ...rest }: LinkProps) => (
	<Link isExternal href={href} colorPalette="accent" {...rest}>
		<Span>{children}</Span>{' '}
		<Icon mr="0.5" ml="-1" verticalAlign="middle">
			<HiOutlineExternalLink />
		</Icon>
	</Link>
)

const RemarkUl = (props: RemarkComponentProps) => (
	<Box
		as="ul"
		listStyleType="disc"
		listStylePosition="outside"
		mb="4"
		ml="4"
		{...props}
	/>
)

const RemarkOl = (props: RemarkComponentProps) => (
	<Box
		as="ol"
		listStyleType="decimal"
		listStylePosition="outside"
		mb="4"
		ml="4"
		{...props}
	/>
)

const RemarkPre = (props: RemarkComponentProps) => (
	<Box
		as="pre"
		bgColor="bg.muted"
		mb="4"
		p="3"
		overflowX="auto"
		display="block"
		css={{
			'& > code': { display: 'block' },
		}}
		{...props}
	/>
)

const RemarkCode = (props: RemarkComponentProps) => (
	<Code color="inherit" bgColor="bg.muted" {...props} />
)

const RemarkBlockquote = (props: RemarkComponentProps) => (
	<SimpleBlockquote mb="2" {...props} />
)

const remarkReactComponents = {
	h1: RemarkH3,
	h2: RemarkH4,
	h3: RemarkH5,
	h4: RemarkH6,
	h5: RemarkH6,
	h6: RemarkH6,
	p: RemarkP,
	a: RemarkA,
	ul: RemarkUl,
	ol: RemarkOl,
	pre: RemarkPre,
	code: RemarkCode,
	blockquote: RemarkBlockquote,
}

type ProcessedReleaseChangeProps = BoxProps & {
	repository: MinimalRepository
	processedReleaseChange: ProcessedRelease
}

export const ProcessedReleaseChangeDescription = ({
	processedReleaseChange,
	repository,
	...rest
}: ProcessedReleaseChangeProps) => {
	const { processedDescription, isProcessing } = useProcessDescriptionMdast({
		repository,
		description: processedReleaseChange.descriptionMdast,
		componentsMapping: remarkReactComponents,
	})

	return (
		<Box {...rest} mb={8}>
			{isProcessing ? (
				<SkeletonText noOfLines={3} />
			) : (
				<>
					<Link isExternal href={processedReleaseChange.html_url}>
						<Tag.Root
							colorPalette="accent"
							variant="subtle"
							size="lg"
							mb={2}
							rounded="full"
						>
							<Tag.Label>{getReleaseVersion(processedReleaseChange)}</Tag.Label>
						</Tag.Root>
					</Link>
					<Box ml="1" pl="2" borderInlineStart="solid 1px {colors.brand.fg/20}">
						{processedDescription}
					</Box>
				</>
			)}
		</Box>
	)
}
