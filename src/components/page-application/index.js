import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router';

import PageApplicationPod from '../page-application-pod';
import PageApplicationSecret from '../page-application-secret';
import Button from '../button';
import Summary from './summary';

import { getConnectionStatus } from '../../state/streaming';
import streamingStatus from '../../state/streaming/connection-status';
import { getApplications } from '../../state/applications';

import appsActions from '../../state/applications/action-creators';
import {
  requestConnection,
  disconnect,
} from '../../state/streaming/action-creators';
import routes from '../../routes';

const CONFIRM_TEXT =
  'This will delete the application from all environments and remove it from Radix. Are you sure?';
var environments = [];
var environmentString = '';

class PageApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedEnv: '' };
    this.selectEnv = this.selectEnv.bind(this);
  }
  componentWillMount() {
    this.props.startStreaming();
  }

  componentWillUnmount() {
    this.props.stopStreaming();
  }

  selectEnv(event) {
    var environment = environments.filter(env =>
      env.name.includes(event.target.value)
    );

    if (environment.length > 1) {
      this.setState({ selectedEnv: '' });
      environmentString = '';
    } else {
      var envName = ''; //Using this because there is a delay when using setState and therefore environmentString will be defined using the old value if we don't use this variable.
      environment.map(env => (envName = env.name));
      this.setState({ selectedEnv: envName });
      environmentString = 'Environment: ' + envName;
    }
  }

  render() {
    if (!this.props.appsLoaded) {
      return (
        <div className="o-layout-page-head">
          <div className="o-layout-fullwidth">Loading…</div>
        </div>
      );
    }

    if (!this.props.app) {
      return (
        <main className="o-layout-page-head">
          <div className="o-layout-fullwidth">App not found</div>
        </main>
      );
    }

    if (typeof this.props.app.spec.environments !== 'undefined') {
      environments = this.props.app.spec.environments;
    }
    return (
      <main>
        <div className="o-layout-page-head">
          <div className="o-layout-fullwidth">
            <h1 className="o-heading-page">
              {this.props.app.metadata.name}
              <br />
              {environmentString}
            </h1>
            <Button
              btnType={['tiny', 'danger']}
              onClick={() =>
                window.confirm(CONFIRM_TEXT) &&
                this.props.deleteApp(this.props.app.metadata.name)
              }
            >
              Delete
            </Button>
          </div>
        </div>
        <div />
        <div>
          <select
            className="page-application_dropdown--environment"
            onChange={this.selectEnv}
          >
            <option value="">Show all</option>
            {environments.map((env, index) => (
              <option key={index} value={env.name}>
                {env.name}
              </option>
            ))}
          </select>
        </div>
        {/* TODO: only display summary on applications page, not sub-pages */}
        {/* TODO: Should there be a list for the environments as well? */}
        <Summary
          app={this.props.app}
          environmentName={this.state.selectedEnv}
        />
        <Route path={routes.appPod} component={PageApplicationPod} />
        <Route path={routes.appSecret} component={PageApplicationSecret} />
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  app: getApplications(state)[ownProps.match.params.id],
  appsLoaded: getConnectionStatus(state, 'apps') === streamingStatus.CONNECTED,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteApp: appName => dispatch(appsActions.deleteAppRequest(appName)),
  startStreaming: () => {
    dispatch(requestConnection('pods', { app: ownProps.match.params.id }));
    dispatch(requestConnection('secrets', { app: ownProps.match.params.id }));
  },
  stopStreaming: () => {
    dispatch(disconnect('pods'));
    dispatch(disconnect('secrets'));
  },
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageApplication)
);
