import { Button, CircularProgress, Typography } from '@equinor/eds-core-react';
import { FunctionComponent, useState } from 'react';
import { uniq } from 'lodash';

import { AppListItem } from '../app-list-item';
import AsyncResource from '../async-resource/async-resource';
import PageCreateApplication from '../page-create-application';
import {
  ApplicationSummary,
  radixApi,
  useGetSearchApplicationsQuery
} from '../../store/radix-api';
import { dataSorter, sortCompareString } from '../../utils/sort-utils';

import './style.css';
import useLocalStorage from '../../effects/use-local-storage';
import { pollingInterval } from '../../store/defaults';
import { promiseHandler } from '../../utils/promise-handler';
import { Alert } from '../alert';
import { getFetchErrorMessage } from '../../store/utils';

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
  const [knownApplications, setKnownApplications] = useLocalStorage<
    Array<string>
  >('knownApplications', []);

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

  const apps = dataSorter(knownApplications, [
    (x, y) => sortCompareString(x, y),
  ]).map((appName) => ({{}
    name: appName},
    isFavourite: favourites.includes(appName),
  })));

  const favouriteApps = dataSorter(
    [
      ...(favsData ?? [])
        .filter(({ name }) => favourites.includes(name))
        .map((app) => ({ app, isFavourite: true }) as const),
      ...apps,
    ].filter(
      ({ app, isFavourite }, i, arr) =>
        isFavourite && arr.findIndex((x) => x.app.name === app.name) === i // remove non-favourites and duplicates
    ),
    [(x, y) => sortCompareString(x.app.name, y.app.name)]
  );

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
        ) : (
          favouriteApps.length > 0 && (
            <>
              <div className="grid grid--gap-medium app-list--section">
                <AsyncResource
                  asyncState={{
                    ...favsState,
                    isLoading:
                      favsState.isLoading && !(favouriteApps.length > 0),
                  }}
                  loadingContent={<LoadingCards amount={favourites.length} />}
                >
                  {favouriteApps.length > 0 ? (
                    <div className="app-list__list">
                      {favouriteApps.map(({ app }, i) => (
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
                  ) : (
                    <Typography>No favourites</Typography>
                  )}
                </AsyncResource>
              </div>
            </>
          )
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
                  (data) => setKnownApplications(data.map((app) => app.name)),
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
            {knownApplications.length > 0 ? (
              <AsyncResource
                asyncState={appsState}
                loadingContent={
                  <LoadingCards amount={randomPlaceholderCount} />
                }
              >
                <div className="app-list__list">
                  {apps.map(({ app, isFavourite }, i) => (
                    <AppListItem
                      key={i}
                      app={app}
                      handler={(e) => {
                        changeFavouriteApplication(app.name, !isFavourite);
                        e.preventDefault();
                      }}
                      isFavourite={isFavourite}
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
