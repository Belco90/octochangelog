import { useEffect, useRef } from 'react'

/**
 * Scrolls to the element matching the URL hash fragment once content is ready.
 *
 * This hook will only trigger the scroll once per component mount, preventing
 * repeated scrolling on following re-renders.
 */
export function useScrollToHash(isReady: boolean) {
	const hasScrolledRef = useRef(false)

	useEffect(() => {
		// Don't scroll if not ready or already scrolled
		if (!isReady || hasScrolledRef.current) return

		const hash = window.location.hash
		if (!hash) return

		// Extract element ID from hash (remove '#')
		const elementId = hash.slice(1)
		const element = document.getElementById(elementId)

		if (element) {
			// Use double requestAnimationFrame to ensure DOM is fully painted
			// (necessary for advanced layout like sticky headings)
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					element.scrollIntoView({
						behavior: 'smooth',
						block: 'start',
					})

					// Mark as scrolled to prevent future scrolls
					hasScrolledRef.current = true
				})
			})
		}
	}, [isReady])
}
