import { debounce } from 'lodash';
import { useEffect, useMemo, useRef } from 'react';

// Picked up from https://www.developerway.com/posts/debouncing-in-react
export function useDebounce<TArgs extends Array<unknown>, TReturn>(
  fn: (...args: TArgs) => TReturn,
  delay: number
): (...args: TArgs) => TReturn {
  const ref = useRef<(...args: TArgs) => TReturn>();

  useEffect(() => {
    ref.current = fn;
  }, [fn]);

  const debouncedCallback = useMemo(() => {
    const func = (...args: TArgs): TReturn => ref.current?.(...args);
    return debounce(func, delay);
  }, [delay]);

  return debouncedCallback;
}