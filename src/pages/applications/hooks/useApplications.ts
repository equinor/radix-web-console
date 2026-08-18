import { QueryStatus } from '@reduxjs/toolkit/query'
import { useCallback } from 'react'

import {
  knownApplicationsKey,
  knownApplicationsLastRefreshKey,
  useMsalAccountLocalStorage,
} from '../../../hooks/use-local-storage'
import { useTimestampTimeout } from '../../../hooks/use-timestamp-timeout'
import { radixApi } from '../../../store/radix-api'
import { promiseHandler } from '../../../utils/promise-handler'
import { dataSorter, sortCompareString } from '../../../utils/sort-utils'
import { isArrayOfStrings } from '../../../utils/type-guards'

const APP_LIST_REFRESH_INTERVAL_MS = 24 * 60 * 60 * 1000

/**
 * Hook for retrieving the names of the applications the user has access to. Application names are cached
 * in local storage for instant first paint, then refreshed from the API in the background.
 */
export const useApplications = () => {
  const [cachedApplicationNames, setCachedApplicationNames] = useMsalAccountLocalStorage<Array<string>>(
    knownApplicationsKey,
    [],
    isArrayOfStrings
  )

  const [lastRefreshedAt, setLastRefreshedAt] = useMsalAccountLocalStorage(knownApplicationsLastRefreshKey, 0)

  const [triggerShowAppsQuery, showAppsQuery] = radixApi.endpoints.showApplications.useLazyQuery({})

  const refresh = useCallback(() => {
    promiseHandler(
      triggerShowAppsQuery({}).unwrap(),
      (data) => {
        setCachedApplicationNames(data.map((app) => app.name))
        setLastRefreshedAt(Date.now())
      },
      'error'
    )
  }, [triggerShowAppsQuery, setCachedApplicationNames, setLastRefreshedAt])

  useTimestampTimeout(refresh, lastRefreshedAt + APP_LIST_REFRESH_INTERVAL_MS)

  const applicationNames = dataSorter(cachedApplicationNames ?? [], [(a, b) => sortCompareString(a, b)])

  const isRefreshing = showAppsQuery.isLoading || showAppsQuery.isFetching
  const hasLoadedOnce = showAppsQuery.status === QueryStatus.fulfilled || lastRefreshedAt > 0

  return {
    applicationNames,
    hasLoadedOnce,
    isRefreshing,
    isError: showAppsQuery.isError,
    error: showAppsQuery.error,
    refresh,
  }
}
