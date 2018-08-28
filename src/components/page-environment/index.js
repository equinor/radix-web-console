import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Components from './components';
import DocumentTitle from '../document-title';
import PageComponent from '../page-component';
import Panel from '../panel';
import Code from '../code';
import Toggler from '../toggler';

import { getConnectionStatus } from '../../state/streaming';
import streamingStatus from '../../state/streaming/connection-status';
import { getApplication, getAppEnvs } from '../../state/applications';
import { routeWithParams } from '../../utils/string';
import { mapRouteParamsToProps } from '../../utils/routing';
import routes from '../../routes';

const makeHeader = text => (
  <h3 className="o-heading-section o-heading--lean">{text}</h3>
);

const PageEnvironment = ({ app, appName, env, envName, appsLoaded }) => {
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
      <DocumentTitle title={`${envName} (env)`} />
      <h3 className="o-heading-page">
        <Link to={routeWithParams(routes.appEnvironment, { appName, envName })}>
          Environment: {envName}
        </Link>
      </h3>
      <Panel>
        <div className="o-layout-columns">
          <div>
            <h3 className="o-heading-section o-heading--first">Components</h3>
            <Components
              appName={appName}
              envName={envName}
              components={app.spec.components}
            />
          </div>
        </div>
      </Panel>

      <Route
        path={routes.appEnvironment}
        exact
        render={() => (
          <Panel>
            <Toggler summary={makeHeader('Environment definition')}>
              <Code>{JSON.stringify(env, null, 2)}</Code>
            </Toggler>
          </Panel>
        )}
      />

      <Route path={routes.appComponent} component={PageComponent} />
    </main>
  );
};

PageEnvironment.propTypes = {
  appName: PropTypes.string.isRequired,
  app: PropTypes.object,
  appsLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  app: getApplication(state, ownProps.appName),
  appsLoaded: getConnectionStatus(state, 'apps') === streamingStatus.CONNECTED,
  env: getAppEnvs(state, ownProps.appName).find(
    env => env.name === ownProps.envName
  ),
  podsLoaded: getConnectionStatus(state, 'pods') === streamingStatus.CONNECTED,
});

export default mapRouteParamsToProps(
  ['appName', 'envName'],
  connect(mapStateToProps)(PageEnvironment)
);
