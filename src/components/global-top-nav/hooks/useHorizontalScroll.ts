import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDebounce } from '../../../hooks/use-debounce'

const SCROLL_STEP_RATIO = 0.8
const SCROLL_DEBOUNCE_MS = 20
const END_THRESHOLD_PX = 5

type ScrollDirection = 'left' | 'right'

interface HorizontalScroll {
  readonly scrollContainerRef: (node: HTMLDivElement | null) => void
  readonly scrollBy: (direction: ScrollDirection) => void
  readonly isStartReached: boolean
  readonly isEndReached: boolean
  readonly canScroll: boolean
}

export const useHorizontalScroll = (): HorizontalScroll => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isStartReached, setIsStartReached] = useState(true)
  const [isEndReached, setIsEndReached] = useState(false)

  // Read widths from the live DOM node so the calculation never uses stale state.
  const updateReachedEdges = useDebounce(() => {
    const node = containerRef.current
    if (!node) return
    setIsStartReached(node.scrollLeft === 0)
    const distanceToEnd = Math.abs(node.clientWidth + Math.round(node.scrollLeft) - node.scrollWidth)
    setIsEndReached(distanceToEnd <= END_THRESHOLD_PX)
  }, SCROLL_DEBOUNCE_MS)

  const resizeObserver = useMemo(() => new ResizeObserver(() => updateReachedEdges()), [updateReachedEdges])

  const scrollContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node
      if (!node) return
      resizeObserver.observe(node)
      node.addEventListener('scroll', updateReachedEdges, { passive: true })
      updateReachedEdges()
    },
    [resizeObserver, updateReachedEdges]
  )

  useEffect(() => {
    const cachedContainer = containerRef.current
    return () => {
      updateReachedEdges.cancel()
      cachedContainer?.removeEventListener('scroll', updateReachedEdges)
      resizeObserver.disconnect()
    }
  }, [resizeObserver, updateReachedEdges])

  const scrollBy = useCallback((direction: ScrollDirection) => {
    const node = containerRef.current
    if (!node) return
    const signifier = direction === 'left' ? -1 : 1
    node.scrollTo(node.scrollLeft + signifier * node.clientWidth * SCROLL_STEP_RATIO, 0)
  }, [])

  return { scrollContainerRef, scrollBy, isStartReached, isEndReached, canScroll: !isStartReached || !isEndReached }
}
