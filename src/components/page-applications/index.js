import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getApplicationList } from '../../state/applications';
import { requestDeleteApp } from '../../state/applications/action-creators';
import ApplicationsList from './applications-list';
import routes from '../../routes';

export const PageApplications = ({ apps, requestDelete }) => (
  <React.Fragment>
    <h1>Applications</h1>
    {apps.length > 0 && (
      <ApplicationsList apps={apps} deleteApp={requestDelete} />
    )}
    {apps.length === 0 && 'No apps yet 🐼'}
    <Link to={routes.appCreate}>Create an app</Link>
  </React.Fragment>
);

const mapStateToProps = state => ({
  apps: getApplicationList(state),
});

const mapDispatchToProps = dispatch => ({
  requestDelete: appName => dispatch(requestDeleteApp(appName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageApplications);
