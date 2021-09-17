import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import AppListItem from '../app-list-item';
import AsyncResource from '../async-resource/simple-async-resource';

import PageCreateApplication from '../page-create-application';

import './style.css';
import { Typography } from '@equinor/eds-core-react';
import { getFavouriteApplications } from '../../state/applications-favourite';
import favouriteAppsActions from '../../state/applications-favourite/action-creators';
import { getLastKnownApplicationNames } from '../../state/applications-lastknown';
import lastKnownAppsActions from '../../state/applications-lastknown/action-creators';
import requestStates from '../../state/state-utils/request-states';
import applicationsNormaliser from '../../models/application-summary/normaliser';

const pollAllAppsInterval = 60000;
const pollKnownAppsInterval = 15000;

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
  lastKnownAppNames,
  setLastKnownApplicationNames,
  pollApplications,
  pollApplicationsByNames,
}) => {
  const [pollAllAppsImmediately, setPollAllAppsImmediately] = useState(false);
  const [pollKnownAppsImmediately, setPollKnownAppsImmediately] = useState(
    false
  );

  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => setFirstRender(false), []);

  useEffect(() => {
    if (firstRender) {
      setPollAllAppsImmediately(!lastKnownAppNames.length);
      setPollKnownAppsImmediately(lastKnownAppNames.length);
    }
  }, [firstRender, lastKnownAppNames]);

  const [appAsyncState, setAppAsyncState] = useState({
    status: requestStates.IN_PROGRESS,
    data: [],
  });

  const [appList, setAppList] = useState([]);
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
  pollApplications: PropTypes.func.isRequired,
  pollApplicationsByNames: PropTypes.func.isRequired,
  favouriteAppNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  lastKnownAppNames: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  toggleFavouriteApplication: (appName) =>
    dispatch(favouriteAppsActions.toggleFavouriteApplication(appName)),
  setLastKnownApplicationNames: (appNames) =>
    dispatch(lastKnownAppsActions.setLastKnownApplicationNames(appNames)),
});

const mapStateToProps = (state) => ({
  favouriteAppNames: getFavouriteApplications(state),
  lastKnownAppNames: getLastKnownApplicationNames(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppList);
