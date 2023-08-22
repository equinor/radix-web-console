import * as PropTypes from 'prop-types';
import { Component as ClassComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import AsyncResource from '../async-resource';
import { Breadcrumb } from '../breadcrumb';
import { DeploymentsList } from '../deployments-list';
import { DocumentTitle } from '../document-title';
import { RootState } from '../../init/store';
import {
  DeploymentSummaryModel,
  DeploymentSummaryModelValidationMap,
} from '../../models/radix-api/deployments/deployment-summary';
import { routes } from '../../routes';
import { getMemoizedDeployments } from '../../state/deployments';
import {
  subscribeDeployments,
  unsubscribeDeployments,
} from '../../state/subscriptions/action-creators';
import { connectRouteParams, routeParamLoader } from '../../utils/router';
import { routeWithParams } from '../../utils/string';

interface PageDeploymentsSubscription {
  subscribe: (name: string) => void;
  unsubscribe: (name: string) => void;
}

interface PageDeploymentsStateProps {
  deployments: Array<DeploymentSummaryModel>;
}

export interface PageDeploymentsProps
  extends PageDeploymentsStateProps,
    PageDeploymentsSubscription {
  appName: string;
}

class PageDeployments extends ClassComponent<PageDeploymentsProps> {
  static readonly propTypes: PropTypes.ValidationMap<PageDeploymentsProps> = {
    appName: PropTypes.string.isRequired,
    deployments: PropTypes.arrayOf(
      PropTypes.shape(
        DeploymentSummaryModelValidationMap
      ) as PropTypes.Validator<DeploymentSummaryModel>
    ).isRequired,
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
  };

  override componentDidMount() {
    const { subscribe, appName } = this.props;
    subscribe(appName);
  }

  override componentWillUnmount() {
    const { unsubscribe, appName } = this.props;
    unsubscribe(appName);
  }

  override componentDidUpdate(prevProps: Readonly<PageDeploymentsProps>) {
    const { subscribe, unsubscribe, appName } = this.props;
    if (prevProps.appName !== appName) {
      unsubscribe(appName);
      subscribe(appName);
    }
  }

  override render() {
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
          <DeploymentsList appName={appName} deployments={deployments} />
        </AsyncResource>
      </>
    );
  }
}

const mapStateToProps = (state: RootState): PageDeploymentsStateProps => ({
  deployments: [...getMemoizedDeployments(state)],
});

const mapDispatchToProps = (
  dispatch: Dispatch
): PageDeploymentsSubscription => ({
  subscribe: (appName) => dispatch(subscribeDeployments(appName)),
  unsubscribe: (appName) => dispatch(unsubscribeDeployments(appName)),
});

const ConnectedPageDeployments = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageDeployments);

const Component = connectRouteParams(ConnectedPageDeployments);
export { Component, routeParamLoader as loader };

export default ConnectedPageDeployments;
