import { Button, CircularProgress, Typography } from '@equinor/eds-core-react';
import { type FunctionComponent, useEffect, useState } from 'react';

import { radixApi, useGetSearchApplicationsQuery } from '../../store/radix-api';
import { dataSorter, sortCompareString } from '../../utils/sort-utils';
import { AppListItem } from '../app-list-item';
import AsyncResource from '../async-resource/async-resource';
import PageCreateApplication from '../page-create-application';

import './style.css';
import { isEqual, uniq } from 'lodash';
import useLocalStorage from '../../effects/use-local-storage';
import { pollingInterval } from '../../store/defaults';
import { getFetchErrorMessage } from '../../store/utils';
import { promiseHandler } from '../../utils/promise-handler';
import { Alert } from '../alert';

const LoadingCards: FunctionComponent<{ amount: number }> = ({ amount }) => (
  <div className="app-list__list loading">
    {[...Array(amount || 1)].map((_, i) => (
      <AppListItem
        key={i}
        app={{ name: 'dummy' }}
        handler={(e) => e.preventDefault()}
        isPlaceholder
      />
    ))}
  </div>
);

export default function AppList() {
  const [randomPlaceholderCount] = useState(Math.floor(Math.random() * 5) + 3);
  const [favourites, setFavourites] = useLocalStorage<Array<string>>(
    'favouriteApplications',
    []
  );
  const [knownAppNames, setKnownAppNames] = useLocalStorage<Array<string>>(
    'knownApplications',
    []
  );

  const [refreshApps, appsState] =
    radixApi.endpoints.showApplications.useLazyQuery({});

  const { data: favsData, ...favsState } = useGetSearchApplicationsQuery(
    {
      apps: favourites?.join(','),
      includeEnvironmentActiveComponents: 'true',
      includeLatestJobSummary: 'true',
    },
    { skip: favourites.length === 0, pollingInterval }
  );

  const changeFavouriteApplication = (app: string, isFavourite: boolean) => {
    if (isFavourite) {
      setFavourites((old) => uniq([...old, app]));
    } else {
      setFavourites((old) => old.filter((a) => a !== app));
    }
  };

  const knownApps = dataSorter(knownAppNames ?? [], [
    (x, y) => sortCompareString(x, y),
  ]).map((appName) => ({
    name: appName,
    isFavourite: favourites.includes(appName),
  }));

  const favouriteApps = dataSorter(
    [
      ...(favsData ?? [])
        .filter(({ name }) => favourites.includes(name))
        .map((favApp) => ({ name: favApp.name, isFavourite: true }) as const),
      ...knownApps,
    ].filter(
      (app, i, arr) =>
        app.isFavourite && arr.findIndex((x) => x.name === app.name) === i // remove non-favourites and duplicates
    ),
    [(x, y) => sortCompareString(x.name, y.name)]
  );

  // remove from know app names previously favorite knownApps, which do not currently exist
  useEffect(() => {
    if (!favsData || !knownApps) {
      return;
    }
    const knownAppNames = knownApps
      .filter(
        (knownApp) =>
          !knownApp.isFavourite ||
          favsData.some((favApp) => favApp.name === knownApp.name)
      )
      .map((app) => app.name);
    const favAppNames = favsData.map((app) => app.name);
    const mergedKnownAndFavoriteAppNames = uniq([
      ...knownAppNames,
      ...favAppNames,
    ]).sort();
    if (
      !isEqual(
        knownApps.map((app) => app.name),
        mergedKnownAndFavoriteAppNames
      )
    ) {
      setKnownAppNames(mergedKnownAndFavoriteAppNames);
    }
  }, [knownApps, favsData, setKnownAppNames]);

  return (
    <article className="grid grid--gap-medium">
      <div className="app-list__header">
        <Typography variant="body_short_bold">Favourites</Typography>
        <div className="create-app">
          <PageCreateApplication />
        </div>
      </div>
      <div className="app-list">
        {favsState.isLoading ? (
          <div>
            <CircularProgress size={16} /> Loading favorites…
          </div>
        ) : favouriteApps.length > 0 ? (
          <>
            <div className="grid grid--gap-medium app-list--section">
              <AsyncResource
                asyncState={{
                  ...favsState,
                  isLoading: favsState.isLoading && !(favouriteApps.length > 0),
                }}
                loadingContent={<LoadingCards amount={favourites.length} />}
              >
                <div className="app-list__list">
                  {favouriteApps.map((app, i) => (
                    <AppListItem
                      key={i}
                      app={app}
                      handler={(e) => {
                        changeFavouriteApplication(app.name, false);
                        e.preventDefault();
                      }}
                      isFavourite
                      showStatus
                    />
                  ))}
                </div>
              </AsyncResource>
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
              disabled={appsState.isLoading || appsState.isFetching}
              onClick={() =>
                promiseHandler(
                  refreshApps({}).unwrap(),
                  (data) => setKnownAppNames(data.map((app) => app.name)),
                  'error'
                )
              }
            >
              Refresh list
            </Button>
          </div>
          {appsState.isError && (
            <div>
              <Alert type="danger">
                Failed to load applications.{' '}
                {getFetchErrorMessage(appsState.error)}
              </Alert>
            </div>
          )}
          <div className="grid grid--gap-medium app-list--section">
            {(knownAppNames && knownAppNames.length > 0) ||
            appsState.isLoading ||
            appsState.isFetching ? (
              <AsyncResource
                asyncState={appsState}
                loadingContent={
                  <LoadingCards amount={randomPlaceholderCount} />
                }
              >
                <div className="app-list__list">
                  {knownApps.map((app, i) => (
                    <AppListItem
                      key={i}
                      app={app}
                      handler={(e) => {
                        changeFavouriteApplication(app.name, !app.isFavourite);
                        e.preventDefault();
                      }}
                      isFavourite={app.isFavourite}
                    />
                  ))}
                </div>
              </AsyncResource>
            ) : (
              <div className="app-list--no-apps-header">
                <div className="grid grid--gap-small">
                  <Typography variant="h4">No applications yet</Typography>
                  <Typography>
                    Applications that you create (or have access to) appear here
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </>
      </div>
    </article>
  );
}
