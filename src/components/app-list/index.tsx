import { Typography } from '@equinor/eds-core-react';
import { FunctionComponent, useState } from 'react';
import { uniq } from 'lodash';

import { AppListItem } from '../app-list-item';
import AsyncResource from '../async-resource/async-resource';
import PageCreateApplication from '../page-create-application';
import {
  useGetSearchApplicationsQuery,
  useShowApplicationsQuery,
} from '../../store/radix-api';
import { dataSorter, sortCompareString } from '../../utils/sort-utils';

import './style.css';
import useLocalStorage from '../../effects/use-local-storage';
import { pollingInterval } from '../../store/defaults';

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
  const [favourites, setFacourites] = useLocalStorage<Array<string>>(
    'favouriteApplications',
    []
  );

  const { data: appsData, ...appsState } = useShowApplicationsQuery(
    {},
    { pollingInterval: 10 * 60_000 } // TODO: Should we disable polling and instead add a refresh button?
  );

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
      setFacourites((old) => uniq([...old, app]));
    } else {
      setFacourites((old) => old.filter((a) => a !== app));
    }
  };

  const apps = dataSorter(appsData, [
    (x, y) => sortCompareString(x.name, y.name),
  ]).map((app) => ({ app, isFavourite: favourites.includes(app.name) }));
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
        {appsState.isLoading ||
        favsState.isLoading ||
        apps.length > 0 ||
        favouriteApps.length > 0 ? (
          <>
            <div className="grid grid--gap-medium app-list--section">
              <AsyncResource
                asyncState={{
                  ...favsState,
                  isLoading: favsState.isLoading && !(favouriteApps.length > 0),
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
            <div className="grid grid--gap-medium app-list--section">
              <Typography variant="body_short_bold">
                All applications
              </Typography>
              <AsyncResource
                asyncState={appsState}
                loadingContent={
                  <LoadingCards amount={randomPlaceholderCount} />
                }
              >
                {apps.length > 0 && (
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
                )}
              </AsyncResource>
            </div>
          </>
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
    </article>
  );
}
