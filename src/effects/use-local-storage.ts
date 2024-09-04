import { useState } from 'react';
import { useInterval } from './use-interval';

export default function useLocalStorage<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(
    () => JSON.parse(localStorage.getItem(key)) || defaultValue
  );

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
