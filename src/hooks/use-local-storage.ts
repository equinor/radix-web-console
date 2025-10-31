import { useAccount } from '@azure/msal-react'
import { useCallback, useState } from 'react'
import { useInterval } from './use-interval'

export const knownApplicationsKey = 'knownApplications'
export const favouriteApplicationsKey = 'favouriteApplications'
export const appNavKey = 'app-nav'
export const batchJobListExpandedKey = 'batchJobListExpanded'
export const componentEventListExpandedKey = 'componentEventListExpanded'
export const activeComponentEnvVarsListExpandedKey = 'activeComponentEnvVarsListExpanded'
export const activeJobComponentEnvVarsListExpandedKey = 'activeJobComponentEnvVarsListExpanded'
export const singleJobListExpandedKey = 'singleJobListExpanded'
export const deploymentComponentEnvVarsListExpandedKey = 'deploymentComponentEnvVarsListExpanded'
export const deploymentJobComponentEnvVarsListExpandedKey = 'deploymentJobComponentEnvVarsListExpanded'
export const environmentEventListExpandedKey = 'environmentEventListExpanded'
export const replicaEventListExpandedKey = 'replicaEventListExpanded'
export const batchJobEnvVarsListExpandedKey = 'batchJobEnvVarsListExpanded'
export const knownApplicationsLastRefreshKey = 'knownApplicationsLastRefresh'

export function useLocalStorage<T>(key: string, defaultValue: T, testContent?: (value: unknown) => boolean) {
  const getLocalStorageItem = useCallback(
    (itemKey: string) => {
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
    },
    [defaultValue, testContent]
  )

  const [state, setState] = useState<T>(() => getLocalStorageItem(key))

  const storeValue = useCallback(
    (value: T | ((old: T) => T)) => {
      try {
        const storingValue = value instanceof Function ? value(state) : value
        setState(storingValue)
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(storingValue))
        }
      } catch (error) {
        console.error(error)
      }
    },
    [key, state]
  )

  useInterval(() => {
    const current = getLocalStorageItem(key)
    if (JSON.stringify(current) !== JSON.stringify(state)) {
      setState(current)
    }
  }, 250)

  return [state, storeValue] as const
}

export function useMsalAccountLocalStorage<T>(key: string, defaultValue: T, testContent?: (value: unknown) => boolean) {
  const account = useAccount()
  const accountKey = account ? `${key}.${account.homeAccountId}` : key
  const [nonAccountValue] = useLocalStorage(key, defaultValue)
  return useLocalStorage(accountKey, nonAccountValue, testContent)
}
