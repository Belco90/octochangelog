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

const isProdMode = process.env.NODE_ENV === 'production'

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
			priority={isProdMode ? priority : undefined} // priority is not transformed if not cdn setup, so the boolean value sent to the DOM is incorrect
			cdn={isProdMode ? 'netlify' : undefined}
			operations={{
				netlify: netlifyOperations,
			}}
		/>
	)
}
