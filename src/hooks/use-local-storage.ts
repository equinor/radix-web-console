import { useAccount } from '@azure/msal-react'
import { isEqual } from 'lodash-es'
import { useState } from 'react'
import { useInterval } from './use-interval'

interface migrateInfo {
  [key: string]: boolean
}

export function useLocalStorage<T>(key: string, defaultValue: T, testContent?: (value: unknown) => boolean) {
  function getLocalStorageItem(itemKey: string) {
    try {
      const storedItem = localStorage.getItem(itemKey)
      if (storedItem) {
        const data = JSON.parse(storedItem) as T
        return testContent?.(data) === false ? defaultValue : data
      }
      return defaultValue // Fallback to the default value if no data in localStorage
    } catch (_) {
      return defaultValue // Fallback to the default value if JSON.parse fails
    }
  }

  const [state, setState] = useState<T>(() => getLocalStorageItem(key))

  const storeValue = (value: T | ((old: T) => T)) => {
    try {
      const storingValue = value instanceof Function ? value(state) : value
      setState(storingValue)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(storingValue))
      }
    } catch (error) {
      console.error(error)
    }
  }

  useInterval(() => {
    const current = getLocalStorageItem(key)
    if (JSON.stringify(current) != JSON.stringify(state)) {
      setState(current)
    }
  }, 250)

  return [state, storeValue] as const
}

export function useMsalAccountLocalStorage<T>(key: string, defaultValue: T, testContent?: (value: unknown) => boolean) {
  const account = useAccount()
  const accountKey = account ? `${key}.${account.homeAccountId}` : key
  const migrateKey = account ? `localStorageAccountMigrate.${account.homeAccountId}` : key

  const [migrateInfo, setMigrateInfo] = useLocalStorage<migrateInfo>(migrateKey, {})
  const [nonAccountValue] = useLocalStorage(key, defaultValue)

  const migrated = !!migrateInfo[key]
  const defaultValueToUse = migrated ? defaultValue : nonAccountValue
  const [value, storeValue] = useLocalStorage(accountKey, defaultValueToUse, testContent)

  if (account && !migrated) {
    migrateInfo[key] = true
    setMigrateInfo(migrateInfo)

    if (!isEqual(defaultValueToUse, defaultValue)) {
      storeValue(defaultValueToUse)
    }
  }

  return [value, storeValue] as const
}
