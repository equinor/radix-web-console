import { Button, CircularProgress, Icon, Typography } from '@equinor/eds-core-react'
import { useCallback, useMemo } from 'react'

import { radixApi, useGetSearchApplicationsQuery } from '../../store/radix-api'
import { dataSorter, sortCompareString } from '../../utils/sort-utils'
import { AppListItem } from '../app-list-item'
import CreateApplication from '../create-application'

import './style.css'
import { refresh } from '@equinor/eds-icons'
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

  const timeStampNextRefresh = useMemo(
    () => knowAppNamesLastRefresh + appListrefreshInterval,
    [knowAppNamesLastRefresh]
  )

  useTimestampTimeout(refreshKnownApps, timeStampNextRefresh)

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
              variant="ghost"
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
            {knownAppNames?.length > 0 || showAppsQueryState.isLoading || showAppsQueryState.isFetching ? (
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
              <div className="app-list--no-apps-header">
                <div className="grid grid--gap-small">
                  <Typography variant="h4">No applications yet</Typography>
                  <Typography>Applications that you create (or have access to) appear here</Typography>
                </div>
              </div>
            )}
          </div>
        </>
      </div>
    </article>
  )
}
