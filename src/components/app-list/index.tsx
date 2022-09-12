import { Typography } from '@equinor/eds-core-react';
import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppListItem, FavouriteClickedHandler } from '../app-list-item';
import { SimpleAsyncResource } from '../async-resource/simple-async-resource';
import PageCreateApplication from '../page-create-application';
import { AsyncState } from '../../effects/effect-types';
import { RootState } from '../../init/store';
import { ApplicationSummaryModel } from '../../models/application-summary';
import { ApplicationSummaryModelNormalizer } from '../../models/application-summary/normalizer';
import {
  getMemoizedFavouriteApplications,
  toggleFavouriteApp,
} from '../../state/applications-favourite';
import { RequestState } from '../../state/state-utils/request-states';

import './style.css';

interface AppListState {
  favouriteAppNames: Array<string>;
}

interface AppListDispatch {
  toggleFavouriteApplication: (name: string) => void;
}

export interface AppListProps extends AppListDispatch, AppListState {
  pollApplications: (
    interval: number,
    pollImmediately: boolean
  ) => AsyncState<Array<ApplicationSummaryModel>>;
  pollApplicationsByNames: (
    interval: number,
    pollImmediately: boolean,
    names: Array<string>,
    includeJobSummary?: boolean
  ) => AsyncState<Array<ApplicationSummaryModel>>;
}

const pollAppsInterval: number = 15000;

const loading = ({ placeholders }: { placeholders: number }): JSX.Element => (
  <div className="app-list__list loading">
    {[...Array(placeholders)].map((_, i) => (
      <AppListItem
        key={i}
        app={{ name: '' }}
        handler={() => {}}
        isPlaceholder
      />
    ))}
  </div>
);

function appSorter(
  { name: aName }: ApplicationSummaryModel,
  { name: bName }: ApplicationSummaryModel
): number {
  return aName.localeCompare(bName);
}

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
        data: (pollResponse.data ?? []).map(ApplicationSummaryModelNormalizer),
      });
    }
  }, [pollResponse]);

  return appState;
}

export const AppList = ({
  toggleFavouriteApplication,
  pollApplications,
  pollApplicationsByNames,
  favouriteAppNames,
}: AppListProps): JSX.Element => {
  const [randoms] = useState([
    Math.floor(Math.random() * 5) + 3,
    Math.floor(Math.random() * 5) + 3,
  ]);

  const favouriteToggle = useCallback<FavouriteClickedHandler>(
    (event, name) => {
      event.preventDefault();
      toggleFavouriteApplication(name);
    },
    [toggleFavouriteApplication]
  );

  const allApps = useGetAsyncApps(pollApplications(pollAppsInterval, true));
  const allFavourites = useGetAsyncApps(
    pollApplicationsByNames(pollAppsInterval, true, favouriteAppNames, true)
  );

  const apps = allApps.data.sort(appSorter).map((x) => ({
    app: x,
    isFavourite: !!favouriteAppNames?.includes(x.name),
  }));
  const favourites = allFavourites.data.reduce(
    (obj, x) => {
      const element = obj.find(({ app }) => app.name === x.name);
      element && (element.app = x);
      return obj;
    },
    apps.filter(({ isFavourite }) => isFavourite)
  );

  return (
    <article className="grid grid--gap-medium">
      <div className="app-list__header">
        {favourites.length > 0 ? (
          <Typography variant="body_short_bold">Favourites</Typography>
        ) : (
          <div></div>
        )}
        <div className="create-app">
          <PageCreateApplication />
        </div>
      </div>
      <div className="app-list">
        {allApps.status === RequestState.IN_PROGRESS ||
        allFavourites.status === RequestState.IN_PROGRESS ||
        apps.length > 0 ||
        favourites.length > 0 ? (
          <>
            <div className="grid grid--gap-medium app-list--section">
              <SimpleAsyncResource
                asyncState={allFavourites}
                loading={loading({ placeholders: randoms[0] })}
              >
                {favourites.length > 0 ? (
                  <div className="app-list__list">
                    {favourites.map(({ app }, i) => (
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
                loading={loading({ placeholders: randoms[1] })}
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
    toggleFavouriteApplication: (name: string) =>
      dispatch(toggleFavouriteApp(name)),
  };
}

function mapStateToProps(state: RootState): AppListState {
  return { favouriteAppNames: [...getMemoizedFavouriteApplications(state)] };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppList);
