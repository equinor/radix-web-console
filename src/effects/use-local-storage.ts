import { useEffect, useState } from 'react';

export default function useLocalStorage<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(
    () => JSON.parse(localStorage.getItem(key)) || defaultValue
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState] as const;
}
