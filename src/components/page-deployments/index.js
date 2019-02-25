import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Breadcrumb from '../breadcrumb';
import DocumentTitle from '../document-title';
import DeploymentsList from '../deployments-list';

import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';
import * as deploymentsState from '../../state/deployments';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import deploymentSummaryModel from '../../models/deployment-summary';
import routes from '../../routes';

class PageDeployments extends React.Component {
  componentDidMount() {
    const { subscribe, appName } = this.props;
    subscribe(appName);
  }

  componentWillUnmount() {
    const { unsubscribe, appName } = this.props;
    unsubscribe(appName);
  }

  componentDidUpdate(prevProps) {
    const { subscribe, unsubscribe, appName } = this.props;

    if (prevProps.appName !== appName) {
      unsubscribe(appName);
      subscribe(appName);
    }
  }

  render() {
    const { appName, deployments } = this.props;
    return (
      <React.Fragment>
        <DocumentTitle title={`${appName} deployments`} />
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            { label: 'Deployments' },
          ]}
        />
        <main>
          <DeploymentsList deployments={deployments} appName={appName} />
        </main>
      </React.Fragment>
    );
  }
}

PageDeployments.propTypes = {
  appName: PropTypes.string.isRequired,
  deployments: PropTypes.arrayOf(PropTypes.shape(deploymentSummaryModel)).isRequired,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  deployments: deploymentsState.getDeployments(state),
});

const mapDispatchToProps = dispatch => ({
  subscribe: appName =>
    dispatch(subscriptionActions.subscribeDeployments(appName)),
  unsubscribe: appName =>
    dispatch(subscriptionActions.unsubscribeDeployments(appName)),
});

export default mapRouteParamsToProps(
  ['appName'],
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageDeployments)
);
