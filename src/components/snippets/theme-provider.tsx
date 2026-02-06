'use client'

import { ChakraProvider } from '@chakra-ui/react'

import { system } from '@/theme'

import { ColorModeProvider } from './color-mode'

import type { ColorModeProviderProps } from './color-mode'

export function ChakraThemeProvider(props: ColorModeProviderProps) {
	return (
		<ChakraProvider value={system}>
			<ColorModeProvider {...props} />
		</ChakraProvider>
	)
}
