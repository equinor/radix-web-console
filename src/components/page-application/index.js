import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import DocumentTitle from '../document-title';
import PageEnvironment from '../page-environment';
import Button from '../button';
import Environments from './environments';
import Code from '../code';
import Panel from '../panel';
import Toggler from '../toggler';

import { mapRouteParamsToProps } from '../../utils/routing';
import { getConnectionStatus } from '../../state/streaming';
import streamingStatus from '../../state/streaming/connection-status';
import { getApplications } from '../../state/applications';
import { routeWithParams } from '../../utils/string';

import appsActions from '../../state/applications/action-creators';
import routes from '../../routes';

const makeHeader = text => (
  <h3 className="o-heading-section o-heading--lean">{text}</h3>
);

const CONFIRM_TEXT =
  'This will delete the application from all environments and remove it from Radix. Are you sure?';

const PageApplication = ({ appName, app, appsLoaded, deleteApp }) => {
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
      <DocumentTitle title={`${app.metadata.name} (app)`} />
      <div className="o-layout-page-head">
        <div className="o-layout-fullwidth">
          <h1 className="o-heading-page">
            <Link to={routeWithParams(routes.app, { appName })}>
              {app.metadata.name}
            </Link>
          </h1>
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

      <Environments app={app} />

      <Route
        path={routes.app}
        exact
        render={() => (
          <Panel>
            <Toggler summary={makeHeader('Application definition')}>
              <Code>{JSON.stringify(app, null, 2)}</Code>
            </Toggler>
          </Panel>
        )}
      />
      <Route path={routes.appEnvironment} component={PageEnvironment} />
    </main>
  );
};

PageApplication.propTypes = {
  appName: PropTypes.string.isRequired,
  app: PropTypes.object,
  appsLoaded: PropTypes.bool.isRequired,
  deleteApp: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  app: getApplications(state)[ownProps.appName],
  appsLoaded: getConnectionStatus(state, 'apps') === streamingStatus.CONNECTED,
});

const mapDispatchToProps = dispatch => ({
  deleteApp: appName => dispatch(appsActions.deleteAppRequest(appName)),
});

export default mapRouteParamsToProps(
  ['appName'],
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageApplication)
);
