import { Button, CircularProgress, Icon, Typography } from '@equinor/eds-core-react'
import { refresh } from '@equinor/eds-icons'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { uniq } from 'lodash-es'
import { useCallback, useState } from 'react'

import {
  favouriteApplicationsKey as favoriteApplicationsKey,
  knownApplicationsKey,
  knownApplicationsLastRefreshKey,
  useMsalAccountLocalStorage,
} from '../../hooks/use-local-storage'
import { useTimestampTimeout } from '../../hooks/use-timestamp-timeout'
import { pollingInterval } from '../../store/defaults'
import { radixApi, useGetSearchApplicationsQuery } from '../../store/radix-api'
import { getFetchErrorMessage } from '../../store/utils/parse-errors'
import { promiseHandler } from '../../utils/promise-handler'
import { dataSorter, sortCompareString } from '../../utils/sort-utils'
import { Alert } from '../alert'
import CreateApplication from '../create-application'
import { AppSearch } from './AppSearch'
import { APP_LIST_REFRESH_INTERVAL_MS } from './appList.const'
import { isArrayOfStrings } from './appList.utils'
import { FavoritesList } from './FavoritesList'
import { KnownApplicationsList } from './KnownApplicationsList'

import './style.css'

export default function AppList() {
  const [favorites, setFavorites] = useMsalAccountLocalStorage<Array<string>>(
    favoriteApplicationsKey,
    [],
    isArrayOfStrings
  )

  const [knownAppNames, setKnownAppNames] = useMsalAccountLocalStorage<Array<string>>(
    knownApplicationsKey,
    [],
    isArrayOfStrings
  )

  const [knownAppNamesLastRefresh, setKnownAppNamesLastRefresh] = useMsalAccountLocalStorage(
    knownApplicationsLastRefreshKey,
    0
  )

  const [showAppsQuery, showAppsQueryState] = radixApi.endpoints.showApplications.useLazyQuery({})

  const refreshKnownApps = useCallback(() => {
    promiseHandler(
      showAppsQuery({}).unwrap(),
      (data) => {
        setKnownAppNames(data.map((app) => app.name))
        setKnownAppNamesLastRefresh(Date.now())
      },
      'error'
    )
  }, [showAppsQuery, setKnownAppNames, setKnownAppNamesLastRefresh])

  useTimestampTimeout(refreshKnownApps, knownAppNamesLastRefresh + APP_LIST_REFRESH_INTERVAL_MS)

  const { data: favouriteApps, ...favouriteAppsState } = useGetSearchApplicationsQuery(
    {
      apps: favorites?.join(','),
      includeEnvironments: true,
      includeLatestJobSummary: true,
    },
    { skip: favorites?.length === 0, pollingInterval }
  )

  const changeFavouriteApplication = (appName: string, isFavourite: boolean) => {
    if (!favorites) {
      setFavorites([appName])
      return
    }
    if (isFavourite) {
      setFavorites((old) => uniq([...old, appName]))
      return
    }
    setFavorites((old) => old.filter((favourite) => favourite !== appName))
  }

  const [searchValue, setSearchValue] = useState('')

  const favouriteNames = dataSorter(favorites ?? [], [(a, b) => sortCompareString(a, b)])

  const knownApps = dataSorter(knownAppNames ?? [], [(a, b) => sortCompareString(a, b)])
    .map((appName) => ({
      name: appName,
      isFavourite: favorites?.includes(appName),
    }))
    .filter((app) => app.name.toLowerCase().includes(searchValue.toLowerCase()))

  const isRefreshing = showAppsQueryState.isLoading || showAppsQueryState.isFetching
  const hasLoadedKnownAppsOnce = showAppsQueryState.status === QueryStatus.fulfilled || knownAppNamesLastRefresh > 0

  return (
    <article className="grid grid--gap-medium">
      <div className="app-list__header">
        <Typography variant="body_short_bold">Favorites</Typography>
        <div className="app-list__buttons">
          <CreateApplication />
        </div>
      </div>
      <div className="app-list">
        <FavoritesList
          favoriteNames={favouriteNames}
          favoriteApps={favouriteApps}
          isLoading={favouriteAppsState.isLoading}
          onRemoveFavorite={(appName) => changeFavouriteApplication(appName, false)}
        />
        <div className="applications-list-title-actions">
          <Typography variant="body_short_bold">All applications</Typography>
          <AppSearch searchValue={searchValue} setSearchValue={setSearchValue} />
          <Button
            className={'action--justify-end'}
            variant="outlined"
            color="primary"
            disabled={isRefreshing}
            onClick={refreshKnownApps}
          >
            {isRefreshing ? <CircularProgress size={16} /> : <Icon data={refresh} />}
            Refresh list
          </Button>
        </div>
        {showAppsQueryState.isError && (
          <div>
            <Alert type="danger">Failed to load applications. {getFetchErrorMessage(showAppsQueryState.error)}</Alert>
          </div>
        )}
        <div className="grid grid--gap-medium app-list--section">
          <KnownApplicationsList
            apps={knownApps}
            hasKnownApps={(knownAppNames?.length ?? 0) > 0}
            hasLoadedOnce={hasLoadedKnownAppsOnce}
            onToggleFavourite={changeFavouriteApplication}
          />
        </div>
      </div>
    </article>
  )
}
