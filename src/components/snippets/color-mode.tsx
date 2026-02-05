'use client'

import { ClientOnly, IconButton, Skeleton, Span } from '@chakra-ui/react'
import { ThemeProvider, useTheme } from 'next-themes'
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi'

import type { IconButtonProps, SpanProps } from '@chakra-ui/react'
import type { ThemeProviderProps } from 'next-themes'
import type { RefObject } from 'react'

export type ColorModeProviderProps = ThemeProviderProps

export function ColorModeProvider(props: ColorModeProviderProps) {
	return (
		<ThemeProvider attribute="class" disableTransitionOnChange {...props} />
	)
}

export type ColorMode = 'light' | 'dark'

export interface UseColorModeReturn {
	colorMode: ColorMode
	setColorMode: (colorMode: ColorMode) => void
	toggleColorMode: () => void
}

export function useColorMode(): UseColorModeReturn {
	const { resolvedTheme, setTheme, forcedTheme } = useTheme()
	const colorMode = forcedTheme || resolvedTheme
	const toggleColorMode = () => {
		setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
	}
	return {
		colorMode: colorMode as ColorMode,
		setColorMode: setTheme,
		toggleColorMode,
	}
}

export function useColorModeValue<T>(light: T, dark: T) {
	const { colorMode } = useColorMode()
	return colorMode === 'dark' ? dark : light
}

export function ColorModeIcon() {
	const { colorMode } = useColorMode()
	return colorMode === 'dark' ? <HiOutlineMoon /> : <HiOutlineSun />
}

type ColorModeButtonProps = Omit<IconButtonProps, 'aria-label'>

export const ColorModeButton = function ColorModeButton({
	ref,
	...props
}: ColorModeButtonProps & { ref?: RefObject<HTMLButtonElement | null> }) {
	const { toggleColorMode, colorMode } = useColorMode()
	const isDarkMode = colorMode === 'dark'

	return (
		<ClientOnly fallback={<Skeleton boxSize="9" />}>
			<IconButton
				onClick={toggleColorMode}
				variant="ghost"
				aria-label="Toggle dark mode"
				aria-pressed={isDarkMode}
				size="sm"
				ref={ref}
				{...props}
				css={{
					_icon: {
						width: '5',
						height: '5',
					},
				}}
			>
				<ColorModeIcon />
			</IconButton>
		</ClientOnly>
	)
}

export const LightMode = function LightMode({
	ref,
	...props
}: SpanProps & { ref?: RefObject<HTMLSpanElement | null> }) {
	return (
		<Span
			{...props}
			color="fg"
			display="contents"
			className="chakra-theme light"
			colorPalette="gray"
			colorScheme="light"
			ref={ref}
		/>
	)
}

export const DarkMode = function DarkMode({
	ref,
	...props
}: SpanProps & { ref?: RefObject<HTMLSpanElement | null> }) {
	return (
		<Span
			{...props}
			color="fg"
			display="contents"
			className="chakra-theme dark"
			colorPalette="gray"
			colorScheme="dark"
			ref={ref}
		/>
	)
}
