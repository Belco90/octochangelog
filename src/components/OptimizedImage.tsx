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
	priority,
	loading,
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
			priority={priority}
			loading={loading}
			cdn={process.env.NODE_ENV === 'production' ? 'netlify' : undefined}
			operations={{
				netlify: netlifyOperations,
			}}
		/>
	)
}
