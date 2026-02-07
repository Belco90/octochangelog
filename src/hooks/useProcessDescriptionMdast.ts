import { useEffect, useMemo, useState } from 'react'
import * as prod from 'react/jsx-runtime'
import rehypeHighlight from 'rehype-highlight'
import rehype2react from 'rehype-react'
import emoji from 'remark-emoji'
import gfm from 'remark-gfm'
import remarkGithub from 'remark-github'
import parse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import markdown from 'remark-stringify'
import { unified } from 'unified'

import type {
	ComponentsMapping,
	ProcessedRelease,
	MinimalRepository,
} from '@/models'

import type { ReactNode } from 'react'
import type { Options as RehypeReactOptions } from 'rehype-react'

async function processDescriptionAsync(
	description: ProcessedRelease['descriptionMdast'],
	components: ComponentsMapping,
	repositoryHtmlUrl: string,
): Promise<ReactNode> {
	const rehypeReactOptions: RehypeReactOptions = {
		...prod,
		components,
	}

	return new Promise<ReactNode>((resolve, reject) => {
		const baseProcessor = unified()
		baseProcessor.use(parse)
		baseProcessor.use(gfm)
		baseProcessor.use(remarkGithub, { repository: repositoryHtmlUrl })
		baseProcessor.use(emoji, { accessible: true })
		baseProcessor.use(remark2rehype)
		baseProcessor.use(rehypeHighlight)
		baseProcessor.use(rehype2react, rehypeReactOptions)

		const markdownProcessor = unified()
		markdownProcessor.use(markdown)
		markdownProcessor.use(gfm)
		markdownProcessor.use(remarkGithub, { repository: repositoryHtmlUrl })

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

type HookArgs = {
	repository: MinimalRepository
	description: ProcessedRelease['descriptionMdast']
	componentsMapping: ComponentsMapping
}

export function useProcessDescriptionMdast({
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
				repository.html_url,
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
