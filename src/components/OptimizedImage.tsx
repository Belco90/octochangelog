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

export function OptimizedImage({
	alt,
	operations,
	width,
	height,
	...remainingProps
}: OptimizedImageProps) {
	const netlifyOperations = Object.assign(
		{
			q: 80,
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
			cdn={process.env.NODE_ENV === 'production' ? 'netlify' : undefined}
			operations={{
				netlify: netlifyOperations,
			}}
		/>
	)
}
