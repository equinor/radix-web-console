import { Icon, Typography } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

import { DeploymentComponentList } from './deployment-component-list';
import { DeploymentJobComponentList } from './deployment-job-component-list';
import { DeploymentSummary } from './deployment-summary';
import { PromoteDeploymentAction } from './promote-deployment-action';

import { Alert } from '../alert';
import AsyncResource from '../async-resource';
import { DeploymentBreadcrumb } from '../page-deployment/deployment-breadcrumb';
import { buildComponentMap, ComponentType } from '../../models/component-type';
import { DeploymentModelValidationMap } from '../../models/deployment';
import { getDeployment } from '../../state/deployment';
import {
  subscribeDeployment,
  unsubscribeDeployment,
} from '../../state/subscriptions/action-creators';

export class DeploymentOverview extends Component {
  componentDidMount() {
    this.props.subscribe(this.props.appName, this.props.deploymentName);
  }

  componentDidUpdate(prevProps) {
    const { appName, deploymentName } = this.props;

    if (
      appName !== prevProps.appName ||
      deploymentName !== prevProps.deploymentName
    ) {
      this.props.unsubscribe(prevProps.appName, prevProps.deploymentName);
      this.props.subscribe(appName, deploymentName);
    }
  }

  componentWillUnmount() {
    this.props.unsubscribe(this.props.appName, this.props.deploymentName);
  }

  render() {
    const { appName, deploymentName, deployment } = this.props;
    const componentMap = deployment
      ? buildComponentMap(deployment.components)
      : null;

    return (
      <>
        <DeploymentBreadcrumb
          appName={appName}
          deploymentName={deploymentName}
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

DeploymentOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  deployment: PropTypes.shape(DeploymentModelValidationMap),
  deploymentName: PropTypes.string.isRequired,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  deployment: getDeployment(state),
});

const mapDispatchToProps = (dispatch) => ({
  subscribe: (appName, deploymentName) => {
    dispatch(subscribeDeployment(appName, deploymentName));
  },
  unsubscribe: (appName, deploymentName) => {
    dispatch(unsubscribeDeployment(appName, deploymentName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DeploymentOverview);
