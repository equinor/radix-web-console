import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// Tabs use "scroll-snap-align: end", so scroll by less than a full row to avoid skipping past tabs.
const SCROLL_STEP_RATIO = 0.8
const SCROLL_DEBOUNCE_MS = 20
const END_THRESHOLD_PX = 5

type ScrollDirection = 'left' | 'right'

interface HorizontalScroll {
  scrollContainerRef: (node: HTMLDivElement | null) => void
  scrollBy: (direction: ScrollDirection) => void
  isStartReached: boolean
  isEndReached: boolean
  canScroll: boolean
}

export const useHorizontalScroll = (): HorizontalScroll => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [contentWidth, setContentWidth] = useState(0)
  const [isStartReached, setIsStartReached] = useState(true)
  const [isEndReached, setIsEndReached] = useState(false)

  const updateReachedEdges = useCallback(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
    debounceTimeout.current = setTimeout(() => {
      if (!containerRef.current) return
      setIsStartReached(containerRef.current.scrollLeft === 0)
      const distanceToEnd = Math.abs(containerWidth + Math.round(containerRef.current.scrollLeft) - contentWidth)
      setIsEndReached(distanceToEnd <= END_THRESHOLD_PX)
    }, SCROLL_DEBOUNCE_MS)
  }, [containerWidth, contentWidth])

  const resizeObserver = useMemo(
    () =>
      new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          setContainerWidth(Math.round(entry.borderBoxSize[0].inlineSize))
          updateReachedEdges()
        })
      }),
    [updateReachedEdges]
  )

  const scrollContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node
      if (!node) return
      setContentWidth(node.scrollWidth)
      setContainerWidth(node.clientWidth)
      resizeObserver.observe(node)
      node.addEventListener('scroll', updateReachedEdges, { passive: true })
    },
    [resizeObserver, updateReachedEdges]
  )

  useEffect(() => {
    const cachedContainer = containerRef.current
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
      cachedContainer?.removeEventListener('scroll', updateReachedEdges)
      resizeObserver.disconnect()
    }
  }, [resizeObserver, updateReachedEdges])

  const scrollBy = useCallback(
    (direction: ScrollDirection) => {
      if (!containerRef.current) return
      const signifier = direction === 'left' ? -1 : 1
      const target = containerRef.current.scrollLeft + signifier * containerWidth * SCROLL_STEP_RATIO
      containerRef.current.scrollTo(target, 0)
    },
    [containerWidth]
  )

  return { scrollContainerRef, scrollBy, isStartReached, isEndReached, canScroll: !isStartReached || !isEndReached }
}
