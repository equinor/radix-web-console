import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

import AsyncResource from '../async-resource';
import { Breadcrumb } from '../breadcrumb';
import DeploymentsList from '../deployments-list';
import DocumentTitle from '../document-title';
import deploymentSummaryModel from '../../models/deployment-summary';
import { routes } from '../../routes';
import { getDeployments } from '../../state/deployments';
import {
  subscribeDeployments,
  unsubscribeDeployments,
} from '../../state/subscriptions/action-creators';
import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';

class PageDeployments extends Component {
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
      <>
        <DocumentTitle title={`${appName} deployments`} />
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            { label: 'Deployments' },
          ]}
        />
        <AsyncResource resource="DEPLOYMENTS" resourceParams={[appName]}>
          <DeploymentsList deployments={deployments} appName={appName} />
        </AsyncResource>
      </>
    );
  }
}

PageDeployments.propTypes = {
  appName: PropTypes.string.isRequired,
  deployments: PropTypes.arrayOf(PropTypes.shape(deploymentSummaryModel))
    .isRequired,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  deployments: getDeployments(state),
});

const mapDispatchToProps = (dispatch) => ({
  subscribe: (appName) => dispatch(subscribeDeployments(appName)),
  unsubscribe: (appName) => dispatch(unsubscribeDeployments(appName)),
});

export default mapRouteParamsToProps(
  ['appName'],
  connect(mapStateToProps, mapDispatchToProps)(PageDeployments)
);
