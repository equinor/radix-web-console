import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import AsyncResource from '../async-resource';
import { Breadcrumb } from '../breadcrumb';
import { ComponentSecrets } from '../component/component-secrets';
import { EnvironmentVariables } from '../environment-variables';
import { Overview } from '../page-active-component/overview';
import { RootState } from '../../init/store';
import {
  DeploymentModel,
  DeploymentModelValidationMap,
} from '../../models/radix-api/deployments/deployment';
import { routes } from '../../routes';
import { getMemoizedDeployment } from '../../state/deployment';
import {
  subscribeDeployment,
  unsubscribeDeployment,
} from '../../state/subscriptions/action-creators';
import { routeWithParams, smallDeploymentName } from '../../utils/string';

interface DeploymentComponentOverviewDispatch {
  subscribe: (appName: string, deploymentName: string) => void;
  unsubscribe: (appName: string, deploymentName: string) => void;
}

interface DeploymentComponentOverviewState {
  deployment?: DeploymentModel;
}

export interface DeploymentComponentOverviewProps
  extends DeploymentComponentOverviewDispatch,
    DeploymentComponentOverviewState {
  appName: string;
  deploymentName: string;
  componentName: string;
}

export class DeploymentComponentOverview extends Component<DeploymentComponentOverviewProps> {
  static readonly propTypes: PropTypes.ValidationMap<DeploymentComponentOverviewProps> =
    {
      appName: PropTypes.string.isRequired,
      deploymentName: PropTypes.string.isRequired,
      componentName: PropTypes.string.isRequired,
      deployment: PropTypes.shape(
        DeploymentModelValidationMap
      ) as PropTypes.Validator<DeploymentModel>,
      subscribe: PropTypes.func.isRequired,
      unsubscribe: PropTypes.func.isRequired,
    };

  override componentDidMount() {
    this.props.subscribe(this.props.appName, this.props.deploymentName);
  }

  override componentDidUpdate(
    prevProps: Readonly<DeploymentComponentOverviewProps>
  ) {
    const { appName, deploymentName } = this.props;
    if (
      appName !== prevProps.appName ||
      deploymentName !== prevProps.deploymentName
    ) {
      this.props.unsubscribe(prevProps.appName, prevProps.deploymentName);
      this.props.subscribe(appName, deploymentName);
    }
  }

  override componentWillUnmount() {
    this.props.unsubscribe(this.props.appName, this.props.deploymentName);
  }

  override render() {
    const { appName, deploymentName, componentName, deployment } = this.props;
    const component = deployment?.components?.find(
      ({ name }) => name === componentName
    );

    return (
      <>
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            {
              label: 'Deployments',
              to: routeWithParams(routes.appDeployments, { appName }),
            },
            {
              label: smallDeploymentName(deploymentName),
              to: routeWithParams(routes.appDeployment, {
                appName,
                deploymentName,
              }),
            },
            { label: componentName },
          ]}
        />
        <AsyncResource
          resource="DEPLOYMENT"
          resourceParams={[appName, deploymentName]}
        >
          {deployment && (
            <>
              <Overview
                component={component}
                envName={deployment.environment}
                deployment={deployment}
              />
              <div>
                <ComponentSecrets component={component} />
              </div>
              <div className="grid grid--gap-medium">
                <EnvironmentVariables
                  appName={appName}
                  envName={deployment.environment}
                  componentName={componentName}
                  componentType={component.type}
                  hideRadixVars
                  readonly
                />
              </div>
            </>
          )}
        </AsyncResource>
      </>
    );
  }
}

function mapStateToProps(state: RootState): DeploymentComponentOverviewState {
  return { deployment: { ...getMemoizedDeployment(state) } };
}

function mapDispatchToProps(
  dispatch: Dispatch
): DeploymentComponentOverviewDispatch {
  return {
    subscribe: (appName, deploymentName) =>
      dispatch(subscribeDeployment(appName, deploymentName)),
    unsubscribe: (appName, deploymentName) =>
      dispatch(unsubscribeDeployment(appName, deploymentName)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeploymentComponentOverview);
