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
	src,
	...remainingProps
}: OptimizedImageProps) {
	// Check if the src is an external URL (starts with http:// or https://)
	const isExternalUrl =
		typeof src === 'string' &&
		(src.startsWith('http://') || src.startsWith('https://'))

	// For external URLs, use a regular img tag without CDN processing
	if (isExternalUrl) {
		const loadingAttr = loading ?? (priority ? 'eager' : 'lazy')

		return (
			<img
				{...remainingProps}
				src={src}
				alt={alt}
				width={width}
				height={height}
				loading={loadingAttr}
			/>
		)
	}

	// For local images, use unpic with Netlify CDN
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
			src={src}
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
