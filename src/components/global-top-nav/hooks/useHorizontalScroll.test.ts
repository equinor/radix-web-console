import { act, type RenderHookResult, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useHorizontalScroll } from './useHorizontalScroll'

const DEBOUNCE_MS = 20

let resizeTriggers: Array<() => void>

class MockResizeObserver {
  constructor(private readonly callback: ResizeObserverCallback) {
    resizeTriggers.push(() => this.callback([], this))
  }
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

interface Dimensions {
  clientWidth: number
  scrollWidth: number
  scrollLeft: number
}

const createContainer = (initial: Omit<Dimensions, 'scrollLeft'> & { scrollLeft?: number }) => {
  const dimensions: Dimensions = {
    clientWidth: initial.clientWidth,
    scrollWidth: initial.scrollWidth,
    scrollLeft: initial.scrollLeft ?? 0,
  }
  const node = document.createElement('div')
  Object.defineProperty(node, 'clientWidth', { configurable: true, get: () => dimensions.clientWidth })
  Object.defineProperty(node, 'scrollWidth', { configurable: true, get: () => dimensions.scrollWidth })
  Object.defineProperty(node, 'scrollLeft', {
    configurable: true,
    get: () => dimensions.scrollLeft,
    set: (value: number) => {
      dimensions.scrollLeft = value
    },
  })
  node.scrollTo = vi.fn() as unknown as HTMLDivElement['scrollTo']
  return { node, dimensions }
}

const attachContainer = (
  result: RenderHookResult<ReturnType<typeof useHorizontalScroll>, void>['result'],
  node: HTMLDivElement
) => {
  act(() => result.current.scrollContainerRef(node))
  act(() => vi.advanceTimersByTime(DEBOUNCE_MS))
}

describe('useHorizontalScroll', () => {
  beforeEach(() => {
    resizeTriggers = []
    vi.stubGlobal('ResizeObserver', MockResizeObserver)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it('starts at the scroll start before the container is measured', () => {
    const { result } = renderHook(() => useHorizontalScroll())

    expect(result.current.isStartReached).toBe(true)
  })

  it('flags both edges reached when the content fits within the container', () => {
    const { result } = renderHook(() => useHorizontalScroll())
    const { node } = createContainer({ clientWidth: 200, scrollWidth: 200 })

    attachContainer(result, node)

    expect(result.current.isStartReached).toBe(true)
    expect(result.current.isEndReached).toBe(true)
  })

  it('reports no scrolling when the content fits within the container', () => {
    const { result } = renderHook(() => useHorizontalScroll())
    const { node } = createContainer({ clientWidth: 200, scrollWidth: 200 })

    attachContainer(result, node)

    expect(result.current.canScroll).toBe(false)
  })

  it('reaches only the start when scrolled fully left with overflowing content', () => {
    const { result } = renderHook(() => useHorizontalScroll())
    const { node } = createContainer({ clientWidth: 100, scrollWidth: 300, scrollLeft: 0 })

    attachContainer(result, node)

    expect(result.current.isStartReached).toBe(true)
    expect(result.current.isEndReached).toBe(false)
  })

  it('reports scrolling is possible when the content overflows', () => {
    const { result } = renderHook(() => useHorizontalScroll())
    const { node } = createContainer({ clientWidth: 100, scrollWidth: 300, scrollLeft: 0 })

    attachContainer(result, node)

    expect(result.current.canScroll).toBe(true)
  })

  it('reaches only the end when scrolled fully right', () => {
    const { result } = renderHook(() => useHorizontalScroll())
    const { node } = createContainer({ clientWidth: 100, scrollWidth: 300, scrollLeft: 200 })

    attachContainer(result, node)

    expect(result.current.isStartReached).toBe(false)
    expect(result.current.isEndReached).toBe(true)
  })

  it('reaches neither edge when scrolled to the middle', () => {
    const { result } = renderHook(() => useHorizontalScroll())
    const { node } = createContainer({ clientWidth: 100, scrollWidth: 300, scrollLeft: 50 })

    attachContainer(result, node)

    expect(result.current.isStartReached).toBe(false)
    expect(result.current.isEndReached).toBe(false)
  })

  it('treats an end within the pixel threshold as reached', () => {
    const { result } = renderHook(() => useHorizontalScroll())
    const { node } = createContainer({ clientWidth: 100, scrollWidth: 303, scrollLeft: 200 })

    attachContainer(result, node)

    expect(result.current.isEndReached).toBe(true)
  })

  it('recomputes edges when the container emits a scroll event', () => {
    const { result } = renderHook(() => useHorizontalScroll())
    const { node, dimensions } = createContainer({ clientWidth: 100, scrollWidth: 300, scrollLeft: 0 })
    attachContainer(result, node)

    dimensions.scrollLeft = 50
    act(() => node.dispatchEvent(new Event('scroll')))
    act(() => vi.advanceTimersByTime(DEBOUNCE_MS))

    expect(result.current.isStartReached).toBe(false)
  })

  it('recomputes edges when the resize observer fires', () => {
    const { result } = renderHook(() => useHorizontalScroll())
    const { node, dimensions } = createContainer({ clientWidth: 200, scrollWidth: 200 })
    attachContainer(result, node)

    dimensions.scrollWidth = 400
    act(() => resizeTriggers[0]())
    act(() => vi.advanceTimersByTime(DEBOUNCE_MS))

    expect(result.current.isEndReached).toBe(false)
  })

  it('scrolls right by 80% of the container width', () => {
    const { result } = renderHook(() => useHorizontalScroll())
    const { node } = createContainer({ clientWidth: 100, scrollWidth: 300, scrollLeft: 0 })
    attachContainer(result, node)

    act(() => result.current.scrollBy('right'))

    expect(node.scrollTo).toHaveBeenCalledWith(80, 0)
  })

  it('scrolls left by 80% of the container width', () => {
    const { result } = renderHook(() => useHorizontalScroll())
    const { node } = createContainer({ clientWidth: 100, scrollWidth: 300, scrollLeft: 100 })
    attachContainer(result, node)

    act(() => result.current.scrollBy('left'))

    expect(node.scrollTo).toHaveBeenCalledWith(20, 0)
  })
})
