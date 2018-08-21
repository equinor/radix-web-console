import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';

import DocumentTitle from '../document-title';
import PagePod from '../page-pod';
import PageSecret from '../page-secret';
import Summary from './summary';

import { getConnectionStatus } from '../../state/streaming';
import streamingStatus from '../../state/streaming/connection-status';
import { getApplications } from '../../state/applications';

import { mapRouteParamsToProps } from '../../utils/routing';

import appsActions from '../../state/applications/action-creators';
import {
  requestConnection,
  disconnect,
} from '../../state/streaming/action-creators';
import routes from '../../routes';

class PageEnvironment extends React.Component {
  componentWillMount() {
    this.props.startStreaming();
  }

  componentWillUnmount() {
    this.props.stopStreaming();
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

    return (
      <main>
        <DocumentTitle title={`${this.props.env} (env)`} />
        <Summary app={this.props.app} env={this.props.env} />
        {this.props.podsLoaded && (
          <Route path={routes.appEnvPod} component={PagePod} />
        )}
        <Route path={routes.appEnvSecret} component={PageSecret} />
      </main>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  app: getApplications(state)[ownProps.match.params.id],
  appsLoaded: getConnectionStatus(state, 'apps') === streamingStatus.CONNECTED,
  podsLoaded: getConnectionStatus(state, 'pods') === streamingStatus.CONNECTED,
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

export default mapRouteParamsToProps(
  ['id', 'env'],
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageEnvironment)
);
