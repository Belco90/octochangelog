import { type ReactNode, useEffect, useMemo, useState } from 'react'
import * as prod from 'react/jsx-runtime'
import rehypeHighlight from 'rehype-highlight'
import rehype2react, { type Options as RehypeReactOptions } from 'rehype-react'
import emoji from 'remark-emoji'
import gfm from 'remark-gfm'
import parse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import markdown from 'remark-stringify'
import { unified } from 'unified'

import {
	type ComponentsMapping,
	type ProcessedRelease,
	type Repository,
} from '@/models'

const rehypeReactOptions: RehypeReactOptions = prod

async function processDescriptionAsync(
	description: ProcessedRelease['descriptionMdast'],
	components: ComponentsMapping,
): Promise<ReactNode> {
	rehypeReactOptions.components = components

	return new Promise<ReactNode>((resolve, reject) => {
		const baseProcessor = unified()
		baseProcessor.use(parse)
		baseProcessor.use(gfm)
		baseProcessor.use(emoji, { accessible: true })
		baseProcessor.use(remark2rehype)
		baseProcessor.use(rehypeHighlight)
		baseProcessor.use(rehype2react, rehypeReactOptions)

		const markdownProcessor = unified()
		markdownProcessor.use(markdown)
		markdownProcessor.use(gfm)

		baseProcessor.process(
			markdownProcessor.stringify(description),
			(err, file) => {
				if (err) {
					reject(err)
				} else if (!file?.result) {
					reject(new Error('Result not generated'))
				} else {
					resolve(file.result as ReactNode)
				}
			},
		)
	})
}

interface HookArgs {
	repository: Repository
	description: ProcessedRelease['descriptionMdast']
	componentsMapping: ComponentsMapping
}

function useProcessDescriptionMdast({
	repository,
	description,
	componentsMapping,
}: HookArgs) {
	const [processedDescription, setProcessedDescription] =
		useState<ReactNode | null>(null)

	const [isProcessing, setIsProcessing] = useState(true)

	useEffect(() => {
		const handleProcessDescription = async () => {
			setIsProcessing(true)
			const result = await processDescriptionAsync(
				description,
				componentsMapping,
			)

			setProcessedDescription(result)
			setIsProcessing(false)
		}

		void handleProcessDescription()
	}, [componentsMapping, description, repository.html_url])

	const data = useMemo(
		() => ({
			processedDescription,
			isProcessing,
		}),
		[isProcessing, processedDescription],
	)

	return data
}

export default useProcessDescriptionMdast
