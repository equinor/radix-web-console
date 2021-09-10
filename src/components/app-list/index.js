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
import { bind } from '@react-rxjs/core';
import { interval, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, startWith, exhaustMap, filter, catchError } from 'rxjs/operators';
import { createApiUrl } from '../../api/api-helpers';
import { getLastKnownApplicationNames } from '../../state/applications-lastknown';
import { setLastKnownApplicationNames } from '../../state/applications-lastknown/action-creators';
import { getApplications } from './get-applications';
import requestStates from '../../state/state-utils/request-states';

const [useGetApplication] = getApplications();

const getApplicationsByNamesFactory = (appNames) => {
  return ajax
    .post(
      createApiUrl('/applications/_search'),
      { names: appNames },
      { 'Content-Type': 'application/json' }
    )
    .pipe(
      map((response) => ({
        data: response.response,
        status: requestStates.SUCCESS,
      })),
      catchError((err) =>
        of({ status: requestStates.FAILURE, error: err.message })
      )
    );
};

const [useGetApplicationsByNameInterval] = bind(
  (appNames) => {
    return interval(5000).pipe(
      map(() => appNames),
      startWith(appNames),
      filter((appNames) => appNames.length > 0),
      exhaustMap((appNames) => getApplicationsByNamesFactory(appNames))
    );
  },
  () => ({ status: requestStates.IN_PROGRESS })
);

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
  const [appAsyncState, setAppAsyncState] = useState({
    status: requestStates.IN_PROGRESS,
    data: [],
  });

  const [appList, setAppList] = useState([]);
  useEffect(() => {
    setAppList(appAsyncState.data || []);
  }, [appAsyncState]);

  const allApps = useGetApplication();

  useEffect(() => {
    setAppAsyncState(allApps);
    if (allApps.status === requestStates.SUCCESS) {
      setLastKnownApplicationNames(allApps.data.map((app) => app.name));
    }
  }, [allApps, setAppAsyncState, setLastKnownApplicationNames]);

  const lastKnowApps = useGetApplicationsByNameInterval(lastKnowAppNames, 5000);

  useEffect(() => {
    setAppAsyncState(lastKnowApps);
    if (lastKnowApps.status === requestStates.SUCCESS) {
      setLastKnownApplicationNames(lastKnowApps.data.map((app) => app.name));
    }
  }, [lastKnowApps, setLastKnownApplicationNames]);

  const favouriteToggler = (e, appName) => {
    e.preventDefault();
    toggleFavouriteApplication(appName);
  };

  const appsRender = appList
    .sort(appSorter)
    .map((app) => (
      <AppListItem app={app} key={app.name} handler={favouriteToggler} />
    ));

  const favouriteAppsRender =
    favouriteAppNames.length > 0 ? (
      appList
        .filter((app) => favouriteAppNames.includes(app.name))
        .sort(appSorter)
        .map((app) => (
          <AppListItem app={app} key={app.name} handler={favouriteToggler} />
        ))
    ) : (
      <Typography>No favourites</Typography>
    );

  console.log('appList', appList);
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
