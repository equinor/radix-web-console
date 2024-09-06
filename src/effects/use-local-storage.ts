import { useState } from 'react';
import { useInterval } from './use-interval';

export default function useLocalStorage<T>(key: string, defaultValue: T) {
  let item: T;
  try {
    const storedItem = localStorage.getItem(key);
    if (storedItem) {
      item = JSON.parse(storedItem) as T;
    } else {
      item = defaultValue; // Fallback to the default value if no data in localStorage
    }
  } catch (error) {
    item = defaultValue; // Fallback to the default value if JSON.parse fails
  }

  const [state, setState] = useState<T>(() => item);

  const storeValue = (value: T | ((old: T) => T)) => {
    try {
      const storingValue = value instanceof Function ? value(state) : value;
      setState(storingValue);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(storingValue));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useInterval(() => {
    const current = window.localStorage.getItem(key);
    if (current != JSON.stringify(state)) {
      setState(JSON.parse(current));
    }
  }, 250);

  return [state, storeValue] as const;
}
