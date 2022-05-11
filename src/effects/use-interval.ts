import { useEffect, useRef } from 'react';

export function useInterval(callback: () => void, delay?: number): void {
  const savedCallback = useRef<() => void>();

  // Remember latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up interval.
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
    return () => {};
  }, [delay]);
}
