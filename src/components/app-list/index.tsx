import { Typography } from '@equinor/eds-core-react';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppListItem, FavouriteClickedHandler } from '../app-list-item';
import { SimpleAsyncResource } from '../async-resource/simple-async-resource';
import PageCreateApplication from '../page-create-application';
import { AsyncState } from '../../effects/effect-types';
import { RootState } from '../../init/store';
import { arrayNormalizer } from '../../models/model-utils';
import { ApplicationSummaryModel } from '../../models/radix-api/applications/application-summary';
import { ApplicationSummaryModelNormalizer } from '../../models/radix-api/applications/application-summary/normalizer';
import {
  getMemoizedFavouriteApplications,
  toggleFavouriteApp,
} from '../../state/applications-favourite';
import { RequestState } from '../../state/state-utils/request-states';
import { dataSorter, sortCompareString } from '../../utils/sort-utils';

import './style.css';

interface AppListState {
  favouriteAppNames: Array<string>;
}

interface AppListDispatch {
  toggleFavouriteApplication: (name: string) => void;
}

export interface AppListProps extends AppListState, AppListDispatch {
  pollApplications: (
    interval: number,
    pollImmediately: boolean
  ) => AsyncState<Array<ApplicationSummaryModel>>;
  pollApplicationsByNames: (
    interval: number,
    pollImmediately: boolean,
    names: Array<string>,
    include: {
      includeJobSummary?: boolean;
      includeEnvironmentActiveComponents?: boolean;
    }
  ) => AsyncState<Array<ApplicationSummaryModel>>;
}

const pollAppsInterval = 15000;

const LoadingCards: FunctionComponent<{ amount: number }> = ({ amount }) => (
  <div className="app-list__list loading">
    {[...Array(amount || 1)].map((_, i) => (
      <AppListItem
        key={i}
        app={{ name: 'dummy' }}
        handler={(evt) => evt.preventDefault()}
        isPlaceholder
      />
    ))}
  </div>
);

function useGetAsyncApps(
  pollResponse: AsyncState<Array<ApplicationSummaryModel>>
): AsyncState<Array<ApplicationSummaryModel>> {
  const [appState, setAppState] = useState<
    AsyncState<Array<ApplicationSummaryModel>>
  >({ status: RequestState.IN_PROGRESS, data: [] });
  useEffect(() => {
    if (pollResponse.status !== RequestState.IN_PROGRESS) {
      setAppState({
        status: pollResponse.status,
        error: pollResponse.error,
        data: arrayNormalizer(
          pollResponse.data,
          ApplicationSummaryModelNormalizer,
          []
        ),
      });
    }
  }, [pollResponse]);

  return appState;
}

export const AppList: FunctionComponent<AppListProps> = ({
  toggleFavouriteApplication,
  pollApplications,
  pollApplicationsByNames,
  favouriteAppNames,
}) => {
  const [includeFields] = useState({
    includeLatestJobSummary: true,
    includeEnvironmentActiveComponents: true,
  });
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

  const allApps = useGetAsyncApps(pollApplications(pollAppsInterval, true));
  const allFavouriteApps = useGetAsyncApps(
    pollApplicationsByNames(pollAppsInterval, true, favourites, includeFields)
  );

  const apps = dataSorter(allApps.data, [
    (x, y) => sortCompareString(x.name, y.name),
  ]).map((app) => ({ app, isFavourite: favourites.includes(app.name) }));
  const favouriteApps = dataSorter(
    [
      ...(allFavouriteApps.data ?? [])
        .filter(({ name }) => favourites.includes(name))
        .map((app) => ({ app, isFavourite: true })),
      ...apps,
    ].filter(
      ({ app, isFavourite }, i, arr) =>
        isFavourite && arr.findIndex((x) => x.app.name === app.name) === i // remove non-favourites and duplicates
    ),
    [(x, y) => sortCompareString(x.app.name, y.app.name)]
  );

  const favStatus: AsyncState<null> = {
    data: null,
    status:
      allFavouriteApps.status === RequestState.IN_PROGRESS &&
      favouriteApps.length > 0
        ? RequestState.SUCCESS
        : allFavouriteApps.status,
  };

  return (
    <article className="grid grid--gap-medium">
      <div className="app-list__header">
        <Typography variant="body_short_bold">Favourites</Typography>
        <div className="create-app">
          <PageCreateApplication />
        </div>
      </div>
      <div className="app-list">
        {allApps.status === RequestState.IN_PROGRESS ||
        allFavouriteApps.status === RequestState.IN_PROGRESS ||
        apps.length > 0 ||
        favouriteApps.length > 0 ? (
          <>
            <div className="grid grid--gap-medium app-list--section">
              <SimpleAsyncResource
                asyncState={favStatus}
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
              </SimpleAsyncResource>
            </div>
            <div className="grid grid--gap-medium app-list--section">
              <Typography variant="body_short_bold">
                All applications
              </Typography>
              <SimpleAsyncResource
                asyncState={allApps}
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
              </SimpleAsyncResource>
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

function mapDispatchToProps(dispatch: Dispatch): AppListDispatch {
  return {
    toggleFavouriteApplication: (name) => dispatch(toggleFavouriteApp(name)),
  };
}

function mapStateToProps(state: RootState): AppListState {
  return { favouriteAppNames: [...getMemoizedFavouriteApplications(state)] };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppList);
