import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';

import Jobs from './jobs';

import AppSummary from '../app-summary';
import Button from '../button';
import Code from '../code';
import DocumentTitle from '../document-title';
import PageJob from '../page-job';
import PageEnvironment from '../page-environment';
import Panel from '../panel';
import Toggler from '../toggler';

import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';

import { getApplications } from '../../state/applications';
import * as applicationState from '../../state/new_application';
import { getConnectionStatus } from '../../state/streaming';
import streamingStatus from '../../state/streaming/connection-status';
import * as subscriptionActions from '../../state/subscriptions/action-creators';

import appsActions from '../../state/applications/action-creators';
import routes from '../../routes';

import './styles.css';

const makeHeader = text => (
  <h3 className="o-heading-section o-heading--lean">{text}</h3>
);

const CONFIRM_TEXT =
  'This will delete the application from all environments and remove it from Radix. Are you sure?';

export class PageApplication extends React.Component {
  componentDidMount() {
    const { subscribeApplication, appName } = this.props;

    if (subscribeApplication) {
      subscribeApplication(appName);
    }
  }

  componentWillUnmount() {
    const { unsubscribeApplication, appName } = this.props;

    if (unsubscribeApplication) {
      unsubscribeApplication(appName);
    }
  }

  render() {
    const { appName, app, appsLoaded, deleteApp, newApp } = this.props;
    if (!app && !appsLoaded) {
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

    const appDef = newApp ? (
      <Panel>
        <Toggler summary={makeHeader('Application definition')}>
          <Code>{JSON.stringify(newApp && newApp.registration, null, 2)}</Code>
        </Toggler>
      </Panel>
    ) : null;

    return (
      <main className="page-application">
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

        <AppSummary app={app} showAllEnvs />

        <Route
          path={routes.app}
          exact
          render={() => (
            <React.Fragment>
              <Panel>
                <div className="o-layout-columns">
                  <div>
                    <h3 className="o-heading-section o-heading--first">
                      Latest jobs
                    </h3>
                    <Jobs appName={appName} />
                  </div>
                </div>
              </Panel>
              {appDef}
            </React.Fragment>
          )}
        />
        <Route path={routes.appEnvironment} component={PageEnvironment} />
        <Route path={routes.appJob} component={PageJob} />
      </main>
    );
  }
}

PageApplication.propTypes = {
  appName: PropTypes.string.isRequired,
  app: PropTypes.object,
  appsLoaded: PropTypes.bool.isRequired,
  deleteApp: PropTypes.func.isRequired,
  newApp: PropTypes.object,
  subscribeApplication: PropTypes.func.isRequired,
  unsubscribeApplication: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  app: getApplications(state)[ownProps.appName],
  appsLoaded: getConnectionStatus(state, 'apps') === streamingStatus.CONNECTED,
  newApp: applicationState.getApplication(state),
});

const mapDispatchToProps = dispatch => ({
  deleteApp: appName => dispatch(appsActions.deleteAppRequest(appName)),
  subscribeApplication: appName =>
    dispatch(subscriptionActions.subscribeApplication(appName)),
  unsubscribeApplication: () =>
    dispatch(subscriptionActions.unsubscribeApplication()),
});

export default mapRouteParamsToProps(
  ['appName'],
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageApplication)
);
