import React from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import { getApplicationList } from '../../state/applications';
import ApplicationsList from './applications-list';
import routes from '../../routes';

export const PageApplications = ({ apps }) => (
  <React.Fragment>
    <h1>Applications</h1>
    {apps.length > 0 && <ApplicationsList apps={apps} />}
    {apps.length === 0 && 'No apps yet 🐼'}
    <Link to={routes.appCreate}>Create an app</Link>
  </React.Fragment>
);

const mapStateToProps = state => ({
  apps: getApplicationList(state),
});

export default connect(mapStateToProps)(PageApplications);
