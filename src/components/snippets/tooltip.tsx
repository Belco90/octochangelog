import { Tooltip as ChakraTooltip, Portal } from '@chakra-ui/react'

import type { ReactNode, RefObject } from 'react'

export interface TooltipProps extends ChakraTooltip.RootProps {
	showArrow?: boolean
	portalled?: boolean
	portalRef?: RefObject<HTMLElement | null>
	content: ReactNode
	contentProps?: ChakraTooltip.ContentProps
	disabled?: boolean
}

export const Tooltip = function Tooltip({
	ref,
	...props
}: TooltipProps & { ref?: RefObject<HTMLDivElement | null> }) {
	const {
		showArrow,
		children,
		disabled,
		portalled = true,
		content,
		contentProps,
		portalRef,
		...rest
	} = props

	if (disabled) return children

	return (
		<ChakraTooltip.Root {...rest}>
			<ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
			<Portal disabled={!portalled} container={portalRef}>
				<ChakraTooltip.Positioner>
					<ChakraTooltip.Content ref={ref} {...contentProps}>
						{showArrow && (
							<ChakraTooltip.Arrow>
								<ChakraTooltip.ArrowTip />
							</ChakraTooltip.Arrow>
						)}
						{content}
					</ChakraTooltip.Content>
				</ChakraTooltip.Positioner>
			</Portal>
		</ChakraTooltip.Root>
	)
}
