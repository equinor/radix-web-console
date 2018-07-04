import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import { getApplications } from '../../state/applications';
import { getConnectionStatus } from '../../state/streaming';
import streamingStatus from '../../state/streaming/connection-status';
import appsActions from '../../state/applications/action-creators';
import routes from '../../routes';

export const PageApplication = ({ appsLoaded, app, requestDelete }) => {
  if (!appsLoaded) {
    return (
      <div className="o-layout-page-head">
        <div className="o-layout-fullwidth">Loading…</div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="o-layout-page-head">
        <div className="o-layout-fullwidth">App not found</div>
      </div>
    );
  }

  return (
    <div className="o-layout-page-head">
      <div className="o-layout-fullwidth">
        <h1 className="o-heading-page">{app.metadata.name}</h1>
      </div>
      <pre>{JSON.stringify(app, null, 2)}</pre>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  app: getApplications(state)[ownProps.match.params.id],
  appsLoaded: getConnectionStatus(state, 'apps') === streamingStatus.CONNECTED,
});

const mapDispatchToProps = dispatch => ({
  requestDelete: appName => dispatch(appsActions.deleteAppRequest(appName)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageApplication)
);
