import { Image } from '@unpic/react'

import type { ImageProps, SourceProps } from '@unpic/react'

type NetlifyOperations = Exclude<
	SourceProps['operations'],
	undefined
>['netlify']
type BaseImageProps = Omit<ImageProps, 'cdn' | 'operations' | 'options'>

type OptimizedImageProps = BaseImageProps & {
	operations?: NetlifyOperations
}

const isHosted = Boolean(process.env.NETLIFY)

export function OptimizedImage({
	alt,
	operations,
	width,
	height,
	priority,
	...remainingProps
}: OptimizedImageProps) {
	const netlifyOperations = Object.assign(
		{
			q: 75,
			fm: 'webp',
			w: width,
			h: height,
		},
		operations,
	)

	return (
		// @ts-expect-error -- unpic types are not correctly inferred here for "layout" prop
		<Image
			{...remainingProps}
			alt={alt}
			width={width}
			height={height}
			priority={isHosted ? priority : undefined} // priority is not transformed if not cdn setup, so the boolean value sent to the DOM is incorrect
			cdn={isHosted ? 'netlify' : undefined}
			operations={{
				netlify: netlifyOperations,
			}}
		/>
	)
}
