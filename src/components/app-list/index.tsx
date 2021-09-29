import { Typography } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppListItem, FavouriteClickedHandler } from '../app-list-item';
import AsyncResource from '../async-resource/simple-async-resource';
import PageCreateApplication from '../page-create-application';
import { RootState } from '../../init/store';
import applicationSummaryModel from '../../models/application-summary';
import applicationsNormaliser from '../../models/application-summary/normaliser';
import { toggleFavouriteApp } from '../../state/applications-favourite';
import { setLastKnownApps } from '../../state/applications-lastknown';
import requestStates from '../../state/state-utils/request-states';

import './style.css';

export interface AppListSummaryResponse {
  status: string;
  data: Array<typeof applicationSummaryModel>;
}

interface AppListAppNames {
  favouriteAppNames: Array<string>;
  lastKnownAppNames: Array<string>;
}

interface AppListDispatch {
  toggleFavouriteApplication: (name: string) => void;
  setLastKnownApplicationNames: (names: Array<string>) => void;
}

export interface AppListProps extends AppListDispatch, AppListAppNames {
  pollApplications: (
    pollKnownAppsInterval: number,
    pollKnownAppsImmediately: boolean
  ) => AppListSummaryResponse;
  pollApplicationsByNames: (
    pollKnownAppsInterval: number,
    pollKnownAppsImmediately: boolean,
    lastKnownAppNames: Array<string>
  ) => AppListSummaryResponse;
}

const pollAllAppsInterval = 60000;
const pollKnownAppsInterval = 15000;

function appSorter(
  a: typeof applicationSummaryModel,
  b: typeof applicationSummaryModel
) {
  return a.name.localeCompare(b.name);
}

const LoadingItem = () => (
  <AppListItem
    app={{ name: '', latestJob: null }}
    handler={() => {}}
    isPlaceholder
  />
);

const loading = (
  <div className="app-list__list loading">
    <LoadingItem />
    <LoadingItem />
    <LoadingItem />
    <LoadingItem />
  </div>
);

export const AppList = (props: AppListProps): JSX.Element => {
  const {
    toggleFavouriteApplication,
    setLastKnownApplicationNames,
    pollApplications,
    pollApplicationsByNames,
    favouriteAppNames,
    lastKnownAppNames,
  } = props;

  const [pollAllAppsImmediately, setPollAllAppsImmediately] = useState(false);
  const [pollKnownAppsImmediately, setPollKnownAppsImmediately] =
    useState(false);

  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => setFirstRender(false), []);

  useEffect(() => {
    if (firstRender) {
      setPollAllAppsImmediately(lastKnownAppNames.length === 0);
      setPollKnownAppsImmediately(lastKnownAppNames.length > 0);
    }
  }, [firstRender, lastKnownAppNames]);

  const [appAsyncState, setAppAsyncState] = useState<AppListSummaryResponse>({
    status: requestStates.IN_PROGRESS,
    data: [],
  });

  const [appList, setAppList] = useState<Array<typeof applicationSummaryModel>>(
    []
  );
  useEffect(() => {
    if (appAsyncState.status === requestStates.SUCCESS) {
      setLastKnownApplicationNames(appAsyncState.data.map((app) => app.name));
      setPollKnownAppsImmediately(false);
    }
    setAppList((appAsyncState.data || []).map(applicationsNormaliser));
  }, [
    appAsyncState,
    setLastKnownApplicationNames,
    setPollKnownAppsImmediately,
  ]);

  const allAppsPollResponse = pollApplications(
    pollAllAppsInterval,
    pollAllAppsImmediately
  );
  useEffect(() => {
    if (allAppsPollResponse.status !== requestStates.IN_PROGRESS) {
      setAppAsyncState(allAppsPollResponse);
    }
  }, [allAppsPollResponse]);

  const appsByNamePollResponse = pollApplicationsByNames(
    pollKnownAppsInterval,
    pollKnownAppsImmediately,
    lastKnownAppNames
  );
  useEffect(() => {
    if (appsByNamePollResponse.status !== requestStates.IN_PROGRESS) {
      setAppAsyncState(appsByNamePollResponse);
    }
  }, [appsByNamePollResponse]);

  const favouriteToggler: FavouriteClickedHandler = (event, name) => {
    event.preventDefault();
    toggleFavouriteApplication(name);
  };

  const isFavouriteApp = (app: typeof applicationSummaryModel) =>
    favouriteAppNames?.includes(app.name);

  const appsRender = appList
    .sort(appSorter)
    .map((app) => (
      <AppListItem
        key={app.name}
        app={app}
        handler={favouriteToggler}
        isFavourite={isFavouriteApp(app)}
      />
    ));

  const favouriteAppsRender =
    favouriteAppNames?.length > 0 ? (
      appList
        .filter(isFavouriteApp)
        .sort(appSorter)
        .map((app) => (
          <AppListItem
            key={app.name}
            app={app}
            handler={favouriteToggler}
            isFavourite
          />
        ))
    ) : (
      <Typography>No favourites</Typography>
    );

  return (
    <article className="grid grid--gap-medium">
      <div className="app-list__header">
        {appList.length > 0 ? (
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
          {appList.length > 0 ? (
            <>
              <div className="grid grid--gap-medium app-list--section">
                <div className="app-list__list">{favouriteAppsRender}</div>
              </div>
              <div className="grid grid--gap-medium app-list--section">
                <Typography variant="body_short_bold">
                  All applications
                </Typography>
                <div className="app-list__list">{appsRender}</div>
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

const mapDispatchToProps = (dispatch: Dispatch): AppListDispatch => ({
  toggleFavouriteApplication: (name: string) =>
    dispatch(toggleFavouriteApp(name)),
  setLastKnownApplicationNames: (names: Array<string>) =>
    dispatch(setLastKnownApps(names)),
});
const mapStateToProps = (state: RootState): AppListAppNames => ({
  favouriteAppNames: state.favouriteApplications,
  lastKnownAppNames: state.lastKnownApplications,
});

export default connect(mapStateToProps, mapDispatchToProps)(AppList);
