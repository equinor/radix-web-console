import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import AppListItem from '../app-list-item';
import AsyncResource from '../async-resource/simple-async-resource';

import PageCreateApplication from '../page-create-application';

import './style.css';
import { Typography } from '@equinor/eds-core-react';
import { getFavouriteApplications } from '../../state/applications-favourite';
import { toggleFavouriteApplication } from '../../state/applications-favourite/action-creators';
import { getLastKnownApplicationNames } from '../../state/applications-lastknown';
import { setLastKnownApplicationNames } from '../../state/applications-lastknown/action-creators';
import { pollApplications, pollApplicationsByNames } from './poll-applications';
import requestStates from '../../state/state-utils/request-states';
import applicationsNormaliser from '../../models/application-summary/normaliser';

const pollAllAppsInterval = 60000;
const pollKnownAppsInterval = 15000;
const [usePollApplications] = pollApplications();
const [usePollApplicationsByNames] = pollApplicationsByNames();

const appSorter = (a, b) => a.name.localeCompare(b.name);

const LoadingItem = () => {
  return <AppListItem app={{ isPlaceHolder: true }} />;
};

const loading = (
  <div className="app-list__list loading">
    <LoadingItem />
    <LoadingItem />
    <LoadingItem />
    <LoadingItem />
  </div>
);

export const AppList = ({
  toggleFavouriteApplication,
  favouriteAppNames,
  lastKnowAppNames,
  setLastKnownApplicationNames,
}) => {
  const [pollAllAppsImmediately, setPollAllAppsImmediately] = useState(false);
  const [pollKnownAppsImmediately, setPollKnownAppsImmediately] = useState(
    false
  );

  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    setFirstRender(false);
  }, []);

  useEffect(() => {
    if (firstRender) {
      setPollAllAppsImmediately(!lastKnowAppNames.length);
      setPollKnownAppsImmediately(lastKnowAppNames.length);
    }
  }, [firstRender, lastKnowAppNames]);

  const [appAsyncState, setAppAsyncState] = useState({
    status: requestStates.IN_PROGRESS,
    data: [],
  });

  const [appList, setAppList] = useState([]);
  useEffect(() => {
    if (appAsyncState.status === requestStates.SUCCESS) {
      setLastKnownApplicationNames(appAsyncState.data.map((app) => app.name));
    }
    setAppList((appAsyncState.data || []).map(applicationsNormaliser));
  }, [appAsyncState, setLastKnownApplicationNames]);

  const polledAllApps = usePollApplications(
    pollAllAppsInterval,
    pollAllAppsImmediately
  );
  useEffect(() => {
    if (polledAllApps.status !== requestStates.IN_PROGRESS) {
      setAppAsyncState(polledAllApps);
    }
    setPollKnownAppsImmediately(false);
  }, [polledAllApps]);

  const polledLastKnownApps = usePollApplicationsByNames(
    pollKnownAppsInterval,
    pollKnownAppsImmediately,
    lastKnowAppNames
  );
  useEffect(() => {
    if (polledLastKnownApps.status !== requestStates.IN_PROGRESS) {
      setAppAsyncState(polledLastKnownApps);
    }
  }, [polledLastKnownApps]);

  const favouriteToggler = (e, appName) => {
    e.preventDefault();
    toggleFavouriteApplication(appName);
  };

  const isFavouriteApp = (appName) => favouriteAppNames.includes(appName);

  const appsRender = appList
    .sort(appSorter)
    .map((app) => (
      <AppListItem
        app={app}
        key={app.name}
        handler={favouriteToggler}
        isFavourite={isFavouriteApp(app.name)}
      />
    ));

  const favouriteAppsRender =
    favouriteAppNames.length > 0 ? (
      appList
        .filter((app) => isFavouriteApp(app.name))
        .sort(appSorter)
        .map((app) => (
          <AppListItem
            app={app}
            key={app.name}
            isFavourite
            handler={favouriteToggler}
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
            <div>
              <div className="app-list--no-apps-header">
                <div className="grid grid--gap-small">
                  <Typography variant="h4">No applications yet</Typography>
                  <Typography>
                    Applications that you create (or have access to) appear here
                  </Typography>
                </div>
              </div>
            </div>
          )}
        </div>
      </AsyncResource>
    </article>
  );
};

AppList.propTypes = {
  toggleFavouriteApplication: PropTypes.func.isRequired,
  setLastKnownApplicationNames: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  toggleFavouriteApplication: (appName) =>
    dispatch(toggleFavouriteApplication(appName)),
  setLastKnownApplicationNames: (appNames) =>
    dispatch(setLastKnownApplicationNames(appNames)),
});

const mapStateToProps = (state) => ({
  favouriteAppNames: getFavouriteApplications(state),
  lastKnowAppNames: getLastKnownApplicationNames(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppList);
