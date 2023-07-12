import { Icon, Typography } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { DeploymentComponentList } from './deployment-component-list';
import { DeploymentJobComponentList } from './deployment-job-component-list';
import { DeploymentSummary } from './deployment-summary';
import { PromoteDeploymentAction } from './promote-deployment-action';

import { Alert } from '../alert';
import AsyncResource from '../async-resource';
import { Breadcrumb } from '../breadcrumb';
import { RootState } from '../../init/store';
import {
  buildComponentMap,
  ComponentType,
} from '../../models/radix-api/deployments/component-type';
import {
  DeploymentModel,
  DeploymentModelValidationMap,
} from '../../models/radix-api/deployments/deployment';
import { getMemoizedDeployment } from '../../state/deployment';
import {
  subscribeDeployment,
  unsubscribeDeployment,
} from '../../state/subscriptions/action-creators';
import { routes } from '../../routes';
import { routeWithParams, smallDeploymentName } from '../../utils/string';

interface DeploymentOverviewDispatch {
  subscribe: (appName: string, deploymentName: string) => void;
  unsubscribe: (appName: string, deploymentName: string) => void;
}

interface DeploymentOverviewState {
  deployment?: DeploymentModel;
}

export interface DeploymentOverviewProps
  extends DeploymentOverviewDispatch,
    DeploymentOverviewState {
  appName: string;
  deploymentName: string;
}

export class DeploymentOverview extends Component<DeploymentOverviewProps> {
  static readonly propTypes: PropTypes.ValidationMap<DeploymentOverviewProps> =
    {
      appName: PropTypes.string.isRequired,
      deploymentName: PropTypes.string.isRequired,
      deployment: PropTypes.shape(
        DeploymentModelValidationMap
      ) as PropTypes.Validator<DeploymentModel>,
      subscribe: PropTypes.func.isRequired,
      unsubscribe: PropTypes.func.isRequired,
    };

  override componentDidMount() {
    this.props.subscribe(this.props.appName, this.props.deploymentName);
  }

  override componentDidUpdate(prevProps: Readonly<DeploymentOverviewProps>) {
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
    const { appName, deploymentName, deployment } = this.props;
    const componentMap = deployment && buildComponentMap(deployment.components);

    return (
      <>
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            {
              label: 'Deployments',
              to: routeWithParams(routes.appDeployments, { appName }),
            },
            { label: smallDeploymentName(deploymentName) },
          ]}
        />

        <main className="grid grid--gap-medium">
          <AsyncResource
            resource="DEPLOYMENT"
            resourceParams={[appName, deploymentName]}
          >
            {!deployment ? (
              'No deployment…'
            ) : (
              <>
                {!deployment.activeTo && (
                  <Alert className="icon">
                    <Icon data={info_circle} />
                    <Typography>This deployment is active</Typography>
                  </Alert>
                )}

                <PromoteDeploymentAction
                  appName={appName}
                  deploymentName={deploymentName}
                  deployment={deployment}
                />

                <DeploymentSummary appName={appName} deployment={deployment} />

                <div>
                  <DeploymentComponentList
                    appName={appName}
                    deploymentName={deploymentName}
                    components={componentMap[ComponentType.component]}
                  />
                </div>

                <div>
                  <DeploymentJobComponentList
                    appName={appName}
                    deploymentName={deploymentName}
                    components={componentMap[ComponentType.job]}
                  />
                </div>
              </>
            )}
          </AsyncResource>
        </main>
      </>
    );
  }
}

function mapStateToProps(state: RootState): DeploymentOverviewState {
  return { deployment: { ...getMemoizedDeployment(state) } };
}

function mapDispatchToProps(dispatch: Dispatch): DeploymentOverviewDispatch {
  return {
    subscribe: (appName, deploymentName) =>
      dispatch(subscribeDeployment(appName, deploymentName)),
    unsubscribe: (appName, deploymentName) =>
      dispatch(unsubscribeDeployment(appName, deploymentName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeploymentOverview);
