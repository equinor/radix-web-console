import { Button, CircularProgress, Icon, Typography } from '@equinor/eds-core-react'
import { type FunctionComponent, useEffect, useState } from 'react'

import { radixApi, useGetSearchApplicationsQuery } from '../../store/radix-api'
import { dataSorter, sortCompareString } from '../../utils/sort-utils'
import { AppListItem } from '../app-list-item'
import AsyncResource from '../async-resource/async-resource'
import CreateApplication from '../create-application'

import './style.css'
import { refresh } from '@equinor/eds-icons'
import { isEqual, uniq } from 'lodash-es'
import useLocalStorage from '../../effects/use-local-storage'
import { pollingInterval } from '../../store/defaults'
import { getFetchErrorMessage } from '../../store/utils/parse-errors'
import { promiseHandler } from '../../utils/promise-handler'
import { Alert } from '../alert'

const LoadingCards: FunctionComponent<{ amount: number }> = ({ amount }) => (
  <div className="app-list__list loading">
    {[...Array(amount || 1)].map((_, i) => (
      <AppListItem key={i} appName={''} handler={(e) => e.preventDefault()} isPlaceholder isLoading={false} />
    ))}
  </div>
)

const isArrayOfStrings = (variable: unknown): variable is string[] => {
  return Array.isArray(variable) && variable.every((item) => typeof item === 'string')
}

export default function AppList() {
  const [randomPlaceholderCount] = useState(Math.floor(Math.random() * 5) + 3)

  const [favourites, setFavourites] = useLocalStorage<Array<string>>('favouriteApplications', [], isArrayOfStrings)

  const [knownAppNames, setKnownAppNames] = useLocalStorage<Array<string>>('knownApplications', [], isArrayOfStrings)
  const [refreshApps, appsState] = radixApi.endpoints.showApplications.useLazyQuery({})

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

  // remove from know app names previously favorite knownApps, which do not currently exist
  useEffect(() => {
    if (!favourites || !knownApps) {
      return
    }
    const knownAppNames = knownApps
      .filter((knownApp) => !knownApp.isFavourite || favourites.some((favAppName) => favAppName === knownApp.name))
      .map((app) => app.name)
    const mergedKnownAndFavoriteAppNames = uniq([...knownAppNames, ...favourites]).sort()
    if (
      !isEqual(
        knownApps.map((app) => app.name),
        mergedKnownAndFavoriteAppNames
      )
    ) {
      setKnownAppNames(mergedKnownAndFavoriteAppNames)
    }
  }, [knownApps, favourites, setKnownAppNames])

  return (
    <article className="grid grid--gap-medium">
      <div className="app-list__header">
        <Typography variant="body_short_bold">Favourites</Typography>
        <div className="app-list__buttons">
          <CreateApplication />
          <Button
            className="feedback-button"
            href={'https://github.com/equinor/radix/issues'}
            target="_blank"
            rel="noopener noreferrer"
          >
            Give us feedback
          </Button>
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
            {(appsState.isLoading || appsState.isFetching) && (
              <div>
                <CircularProgress size={16} /> Loading applications…
              </div>
            )}
            <Button
              className={'action--justify-end'}
              variant="ghost"
              color="primary"
              disabled={appsState.isLoading || appsState.isFetching}
              onClick={() =>
                promiseHandler(
                  refreshApps({}).unwrap(),
                  (data) => setKnownAppNames(data.map((app) => app.name)),
                  'error'
                )
              }
            >
              <Icon data={refresh} />
              Refresh list
            </Button>
          </div>
          {appsState.isError && (
            <div>
              <Alert type="danger">Failed to load applications. {getFetchErrorMessage(appsState.error)}</Alert>
            </div>
          )}
          <div className="grid grid--gap-medium app-list--section">
            {knownAppNames?.length > 0 || appsState.isLoading || appsState.isFetching ? (
              <AsyncResource asyncState={appsState} loadingContent={<LoadingCards amount={randomPlaceholderCount} />}>
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
              </AsyncResource>
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
