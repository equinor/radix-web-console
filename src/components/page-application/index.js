import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router';

import PageEnvironment from '../page-environment';
import Button from '../button';
import Summary from './summary';

import { getConnectionStatus } from '../../state/streaming';
import streamingStatus from '../../state/streaming/connection-status';
import { getApplications } from '../../state/applications';

import appsActions from '../../state/applications/action-creators';
import routes from '../../routes';

const CONFIRM_TEXT =
  'This will delete the application from all environments and remove it from Radix. Are you sure?';

const PageApplication = ({ app, appsLoaded, deleteApp }) => {
  if (!appsLoaded) {
    return (
      <div className="o-layout-page-head">
        <div className="o-layout-fullwidth">Loading…</div>
      </div>
    );
  }

  if (!app) {
    return (
      <main className="o-layout-page-head">
        <div className="o-layout-fullwidth">App not found</div>
      </main>
    );
  }

  return (
    <main>
      <div className="o-layout-page-head">
        <div className="o-layout-fullwidth">
          <h1 className="o-heading-page">{app.metadata.name}</h1>
          <Button
            btnType={['tiny', 'danger']}
            onClick={() =>
              window.confirm(CONFIRM_TEXT) && deleteApp(app.metadata.name)
            }
          >
            Delete
          </Button>
        </div>
      </div>
      <Summary app={app} />
      <Route path={routes.appEnvironment} component={PageEnvironment} />
    </main>
  );
};

const mapStateToProps = (state, ownProps) => ({
  app: getApplications(state)[ownProps.match.params.id],
  appsLoaded: getConnectionStatus(state, 'apps') === streamingStatus.CONNECTED,
});

const mapDispatchToProps = dispatch => ({
  deleteApp: appName => dispatch(appsActions.deleteAppRequest(appName)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageApplication)
);
