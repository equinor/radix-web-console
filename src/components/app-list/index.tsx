import { Typography } from '@equinor/eds-core-react';
import { FunctionComponent, useCallback, useState } from 'react';
import { connect } from 'react-redux';

import { AppListItem, FavouriteClickedHandler } from '../app-list-item';
import AsyncResource from '../async-resource/another-async-resource';
import PageCreateApplication from '../page-create-application';
import { RootState } from '../../init/store';
import {
  getMemoizedFavouriteApplications,
  toggleFavouriteApp,
} from '../../state/applications-favourite';
import {
  useGetSearchApplicationsQuery,
  useShowApplicationsQuery,
} from '../../store/radix-api';
import { dataSorter, sortCompareString } from '../../utils/sort-utils';

import './style.css';

interface AppListState {
  favouriteAppNames: Readonly<Array<string>>;
}

interface AppListDispatch {
  toggleFavouriteApplication: (name: string) => void;
}

export interface AppListProps extends AppListState, AppListDispatch {}

const pollAppsInterval = 15000;

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

export const AppList: FunctionComponent<AppListProps> = ({
  toggleFavouriteApplication,
  favouriteAppNames,
}) => {
  const [randomPlaceholderCount] = useState(Math.floor(Math.random() * 5) + 3);
  const [favourites, setFavourites] = useState(favouriteAppNames);

  const favouriteToggle = useCallback<FavouriteClickedHandler>(
    (event, name) => {
      event.preventDefault();
      toggleFavouriteApplication(name);
    },
    [toggleFavouriteApplication]
  );

  if (
    favourites.length !== favouriteAppNames.length ||
    favourites.some((x) => !favouriteAppNames.includes(x))
  ) {
    setFavourites(favouriteAppNames);
  }

  const { data: appsData, ...appsState } = useShowApplicationsQuery(
    {},
    { pollingInterval: pollAppsInterval }
  );
  const { data: favsData, ...favsState } = useGetSearchApplicationsQuery(
    {
      apps: favourites?.join(','),
      includeEnvironmentActiveComponents: 'true',
      includeLatestJobSummary: 'true',
    },
    { skip: !(favourites?.length > 0), pollingInterval: pollAppsInterval }
  );

  const apps = dataSorter(appsData, [
    (x, y) => sortCompareString(x.name, y.name),
  ]).map((app) => ({ app, isFavourite: favourites.includes(app.name) }));
  const favouriteApps = dataSorter(
    [
      ...(favsData ?? [])
        .filter(({ name }) => favourites.includes(name))
        .map((app) => ({ app, isFavourite: true })),
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
                        handler={favouriteToggle}
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
                        handler={favouriteToggle}
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
};

export default connect<AppListState, AppListDispatch, {}, RootState>(
  (state) => ({
    favouriteAppNames: [...getMemoizedFavouriteApplications(state)],
  }),
  (dispatch) => ({
    toggleFavouriteApplication: (name) => dispatch(toggleFavouriteApp(name)),
  })
)(AppList);
