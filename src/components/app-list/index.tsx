import { Typography } from '@equinor/eds-core-react';
import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppListItem, FavouriteClickedHandler } from '../app-list-item';
import AsyncResource from '../async-resource/simple-async-resource';
import PageCreateApplication from '../page-create-application';
import { AsyncState } from '../../effects/effect-types';
import { RootState } from '../../init/store';
import { ApplicationSummaryModel } from '../../models/application-summary';
import { ApplicationSummaryModelNormalizer } from '../../models/application-summary/normalizer';
import {
  getMemoizedFavouriteApplications,
  toggleFavouriteApp,
} from '../../state/applications-favourite';
import {
  getMemoizedLastKnownApplications,
  setLastKnownApps,
} from '../../state/applications-lastknown';
import { RequestState } from '../../state/state-utils/request-states';

import './style.css';

interface AppListState {
  favouriteAppNames: Array<string>;
  lastKnownAppNames: Array<string>;
}

interface AppListDispatch {
  toggleFavouriteApplication: (name: string) => void;
  setLastKnownApplicationNames: (names: Array<string>) => void;
}

export interface AppListProps extends AppListDispatch, AppListState {
  pollApplications: (
    pollKnownAppsInterval: number,
    pollKnownAppsImmediately: boolean
  ) => AsyncState<ApplicationSummaryModel[]>;
  pollApplicationsByNames: (
    pollKnownAppsInterval: number,
    pollKnownAppsImmediately: boolean,
    lastKnownAppNames: Array<string>
  ) => AsyncState<ApplicationSummaryModel[]>;
}

const pollAllAppsInterval: number = 60000;
const pollKnownAppsInterval: number = 15000;

const loading = (
  <div className="app-list__list loading">
    {[...Array(4)].map((_, i) => (
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
  a: ApplicationSummaryModel,
  b: ApplicationSummaryModel
): number {
  return a.name.localeCompare(b.name);
}

export const AppList = ({
  toggleFavouriteApplication,
  setLastKnownApplicationNames,
  pollApplications,
  pollApplicationsByNames,
  favouriteAppNames,
  lastKnownAppNames,
}: AppListProps): JSX.Element => {
  const favouriteToggle = useCallback<FavouriteClickedHandler>(
    (event, name) => {
      event.preventDefault();
      toggleFavouriteApplication(name);
    },
    [toggleFavouriteApplication]
  );

  const [pollAllAppsImmediate, setPollAllAppsImmediate] = useState(false);
  const [pollKnownAppsImmediate, setPollKnownAppsImmediate] = useState(false);
  useEffect(() => {
    lastKnownAppNames.length > 0
      ? setPollKnownAppsImmediate(true)
      : setPollAllAppsImmediate(true);
  }, [lastKnownAppNames]);

  const [appAsyncState, setAppAsyncState] = useState<
    AsyncState<ApplicationSummaryModel[]>
  >({
    status: RequestState.IN_PROGRESS,
    data: [],
  });

  const [appList, setAppList] = useState<ApplicationSummaryModel[]>([]);
  useEffect(() => {
    const data = appAsyncState.data || [];
    if (appAsyncState.status === RequestState.SUCCESS) {
      setLastKnownApplicationNames(data.map(({ name }) => name));
      setPollKnownAppsImmediate(false);
      setPollAllAppsImmediate(false);
    }
    setAppList(data.map(ApplicationSummaryModelNormalizer));
  }, [appAsyncState, setLastKnownApplicationNames, setPollKnownAppsImmediate]);

  const allAppsPollResponse = pollApplications(
    pollAllAppsInterval,
    pollAllAppsImmediate
  );
  useEffect(() => {
    if (allAppsPollResponse.status !== RequestState.IN_PROGRESS) {
      setAppAsyncState(allAppsPollResponse);
    }
  }, [allAppsPollResponse]);

  const appsByNamePollResponse = pollApplicationsByNames(
    pollKnownAppsInterval,
    pollKnownAppsImmediate,
    lastKnownAppNames
  );
  useEffect(() => {
    if (appsByNamePollResponse.status !== RequestState.IN_PROGRESS) {
      setAppAsyncState(appsByNamePollResponse);
    }
  }, [appsByNamePollResponse]);

  const allApps = appList.sort(appSorter).map((x) => ({
    app: x,
    isFavourite: !!favouriteAppNames?.includes(x.name),
  }));
  const favouriteApps = allApps.filter(({ isFavourite }) => isFavourite);

  return (
    <article className="grid grid--gap-medium">
      <div className="app-list__header">
        {allApps.length > 0 ? (
          <Typography variant="body_short_bold">Favourites</Typography>
        ) : (
          <div></div>
        )}
        <div className="create-app">
          <PageCreateApplication />
        </div>
      </div>
      <AsyncResource asyncState={appAsyncState} loading={loading}>
        <div className="app-list">
          {allApps.length > 0 ? (
            <>
              <div className="grid grid--gap-medium app-list--section">
                <div className="app-list__list">
                  {favouriteApps.length > 0 ? (
                    favouriteApps.map(({ app, isFavourite }, i) => (
                      <AppListItem
                        key={i}
                        app={app}
                        handler={favouriteToggle}
                        isFavourite={isFavourite}
                      />
                    ))
                  ) : (
                    <Typography>No favourites</Typography>
                  )}
                </div>
              </div>
              <div className="grid grid--gap-medium app-list--section">
                <Typography variant="body_short_bold">
                  All applications
                </Typography>
                <div className="app-list__list">
                  {allApps.map(({ app, isFavourite }, i) => (
                    <AppListItem
                      key={i}
                      app={app}
                      handler={favouriteToggle}
                      isFavourite={isFavourite}
                    />
                  ))}
                </div>
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
      </AsyncResource>
    </article>
  );
};

function mapDispatchToProps(dispatch: Dispatch): AppListDispatch {
  return {
    toggleFavouriteApplication: (name: string) =>
      dispatch(toggleFavouriteApp(name)),
    setLastKnownApplicationNames: (names: Array<string>) =>
      dispatch(setLastKnownApps(names)),
  };
}

function mapStateToProps(state: RootState): AppListState {
  return {
    favouriteAppNames: [...getMemoizedFavouriteApplications(state)],
    lastKnownAppNames: [...getMemoizedLastKnownApplications(state)],
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppList);
