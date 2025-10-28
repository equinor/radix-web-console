import { useEffect, useRef, useState } from 'react'

export function useInterval(callback: () => void, delay?: number): void {
  const savedCallback = useRef<() => void>(callback)

  // Remember latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up interval.
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay)
      return () => clearInterval(id)
    }
    return () => void 0
  }, [delay])
}

export function useDurationInterval(callback: () => unknown, intervalMs = 2_000, durationMs = 15_000) {
  const [startAt, setStartAt] = useState<number>(0)

  const start = () => {
    setStartAt(Date.now())
  }

  useEffect(() => {
    if (startAt === 0) {
      return () => void 0
    }

    const id = setInterval(() => {
      if (Date.now() > startAt + durationMs) {
        setStartAt(0)
        clearInterval(id)
        return
      }

      callback()
    }, intervalMs)

    return () => clearInterval(id)
  }, [startAt, durationMs, intervalMs, callback])

  return start
}
