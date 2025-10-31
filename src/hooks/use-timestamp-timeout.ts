import { useEffect, useRef } from 'react'

/**
 * useTimestampTimeout
 *
 * A custom React hook for triggering a callback function at a specific timestamp.
 *
 * @param callback - The function to execute when the timeout is reached.
 * @param timestamp - The absolute time (in milliseconds, Unix epoch) at which to execute the callback.
 *
 * How it works:
 * - The hook sets up a timeout that fires when the system time reaches the provided timestamp.
 * - If the timestamp is in the past or now, the callback is invoked immediately.
 * - The callback reference is kept up-to-date even if the callback changes between renders.
 * - The timeout is cleaned up automatically when the component unmounts or when timestamp changes.
 *
 * Usage:
 * ```tsx
 * useTimestampTimeout(() => {
 *   alert('Time reached!');
 * }, Date.now() + 5000); // Fires in 5 seconds
 * ```
 */
export function useTimestampTimeout(callback: () => void, timestamp: number): void {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the timeout.
  useEffect(() => {
    let delay = timestamp - Date.now()
    if (delay <= 0) {
      delay = 0
    }

    const id = setTimeout(() => {
      savedCallback.current()
    }, delay)

    return () => {
      clearTimeout(id)
    }
  }, [timestamp])
}
