import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import DocumentTitle from '../document-title';
import { getApplicationList } from '../../state/applications';
import appsActions from '../../state/applications/action-creators';
import routes from '../../routes';

import AppList from '../app-list';

export const PageApplications = ({ apps, requestDelete }) => (
  <React.Fragment>
    <DocumentTitle title="Applications" />
    <div className="o-layout-page-head">
      <div className="o-layout-fullwidth">
        <h1 className="o-heading-page">Applications</h1>
        <Link to={routes.appCreate}>Create an app</Link>
      </div>
    </div>
    {apps.length > 0 && <AppList apps={apps} deleteApp={requestDelete} />}
    {apps.length === 0 && 'No apps yet 🐼'}
  </React.Fragment>
);

const mapStateToProps = state => ({
  apps: getApplicationList(state),
});

const mapDispatchToProps = dispatch => ({
  requestDelete: appName => dispatch(appsActions.deleteAppRequest(appName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageApplications);
