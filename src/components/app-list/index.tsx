import { Button, CircularProgress, Icon, Typography } from '@equinor/eds-core-react'
import { useCallback } from 'react'

import { radixApi, useGetSearchApplicationsQuery } from '../../store/radix-api'
import { dataSorter, sortCompareString } from '../../utils/sort-utils'
import { AppListItem } from '../app-list-item'
import CreateApplication from '../create-application'

import './style.css'
import { refresh } from '@equinor/eds-icons'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { uniq } from 'lodash-es'
import {
  favouriteApplicationsKey,
  knownApplicationsKey,
  knownApplicationsLastRefreshKey,
  useMsalAccountLocalStorage,
} from '../../hooks/use-local-storage'
import { useTimestampTimeout } from '../../hooks/use-timestamp-timeout'
import { pollingInterval } from '../../store/defaults'
import { getFetchErrorMessage } from '../../store/utils/parse-errors'
import { promiseHandler } from '../../utils/promise-handler'
import { Alert } from '../alert'

const LoadingCards = ({ amount }: { amount: number }) => (
  <div className="app-list__list loading">
    {[...Array(amount || 1)].map((_, i) => (
      <AppListItem key={i} appName={''} handler={(e) => e.preventDefault()} isPlaceholder isLoading={false} />
    ))}
  </div>
)

const isArrayOfStrings = (variable: unknown): variable is string[] => {
  return Array.isArray(variable) && variable.every((item) => typeof item === 'string')
}

const appListrefreshInterval = 24 * 60 * 60 * 1000

export default function AppList() {
  const [favourites, setFavourites] = useMsalAccountLocalStorage<Array<string>>(
    favouriteApplicationsKey,
    [],
    isArrayOfStrings
  )

  const [knownAppNames, setKnownAppNames] = useMsalAccountLocalStorage<Array<string>>(
    knownApplicationsKey,
    [],
    isArrayOfStrings
  )

  const [knowAppNamesLastRefresh, setKnowAppNamesLastRefresh] = useMsalAccountLocalStorage(
    knownApplicationsLastRefreshKey,
    0
  )

  const [showAppsQuery, showAppsQueryState] = radixApi.endpoints.showApplications.useLazyQuery({})

  const refreshKnownApps = useCallback(() => {
    promiseHandler(
      showAppsQuery({}).unwrap(),
      (data) => {
        setKnownAppNames(data.map((app) => app.name))
        setKnowAppNamesLastRefresh(Date.now())
      },
      'error'
    )
  }, [showAppsQuery, setKnownAppNames, setKnowAppNamesLastRefresh])

  useTimestampTimeout(refreshKnownApps, knowAppNamesLastRefresh + appListrefreshInterval)

  const { data: favsData, ...favsState } = useGetSearchApplicationsQuery(
    {
      apps: favourites?.join(','),
      includeEnvironmentActiveComponents: 'true',
      includeLatestJobSummary: 'true',
    },
    { skip: favourites?.length === 0, pollingInterval }
  )

  const changeFavouriteApplication = (appName: string, isFavourite: boolean) => {
    if (!favourites) {
      setFavourites([appName])
      return
    }
    if (isFavourite) {
      setFavourites((old) => uniq([...old, appName]))
      return
    }
    setFavourites((old) => old.filter((a) => a !== appName))
  }

  const knownApps = dataSorter(knownAppNames ?? [], [(x, y) => sortCompareString(x, y)]).map((appName) => ({
    name: appName,
    isFavourite: favourites?.includes(appName),
  }))

  const favouriteNames = dataSorter(favourites ?? [], [(x, y) => sortCompareString(x, y)])

  return (
    <article className="grid grid--gap-medium">
      <div className="app-list__header">
        <Typography variant="body_short_bold">Favourites</Typography>
        <div className="app-list__buttons">
          <CreateApplication />
        </div>
      </div>
      <div className="app-list">
        {favouriteNames?.length > 0 ? (
          <>
            <div className="grid grid--gap-medium app-list--section">
              <div className="app-list__list">
                {favouriteNames.map((appName) => {
                  const app = favsData?.find((a) => a.name === appName)
                  return (
                    <AppListItem
                      key={appName}
                      appName={appName}
                      isDeleted={!app}
                      environmentActiveComponents={app?.environmentActiveComponents}
                      latestJob={app?.latestJob}
                      handler={(e) => {
                        changeFavouriteApplication(appName, false)
                        e.preventDefault()
                      }}
                      isFavourite
                      showStatus
                      isLoading={favsState.isLoading}
                    />
                  )
                })}
              </div>
            </div>
          </>
        ) : (
          <Typography>No favourites</Typography>
        )}
        <>
          <div className="applications-list-title-actions">
            <Typography variant="body_short_bold">All applications</Typography>
            <Button
              className={'action--justify-end'}
              variant="outlined"
              color="primary"
              disabled={showAppsQueryState.isLoading || showAppsQueryState.isFetching}
              onClick={refreshKnownApps}
            >
              {showAppsQueryState.isLoading || showAppsQueryState.isFetching ? (
                <CircularProgress size={16} />
              ) : (
                <Icon data={refresh} />
              )}
              Refresh list
            </Button>
          </div>
          {showAppsQueryState.isError && (
            <div>
              <Alert type="danger">Failed to load applications. {getFetchErrorMessage(showAppsQueryState.error)}</Alert>
            </div>
          )}
          <div className="grid grid--gap-medium app-list--section">
            {knownAppNames?.length > 0 ? (
              <div className="app-list__list">
                {knownApps.map((app) => {
                  return (
                    <AppListItem
                      key={app.name}
                      appName={app.name}
                      handler={(e) => {
                        changeFavouriteApplication(app.name, !app.isFavourite)
                        e.preventDefault()
                      }}
                      isFavourite={app.isFavourite}
                      isLoading={false}
                    />
                  )
                })}
              </div>
            ) : (
              <>
                {showAppsQueryState.status === QueryStatus.fulfilled || knowAppNamesLastRefresh > 0 ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 'var(--eds_spacing_medium)',
                    }}
                  >
                    <Typography variant="h3">No applications yet</Typography>
                    <Typography>Applications that you create (or have access to) appear here</Typography>
                    <CreateApplication />
                  </div>
                ) : (
                  <LoadingCards amount={6} />
                )}
              </>
            )}
          </div>
        </>
      </div>
    </article>
  )
}
