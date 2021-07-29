import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Alert from '../alert';
import AsyncResource from '../async-resource';
import { getDeployment } from '../../state/deployment';
import * as actionCreators from '../../state/subscriptions/action-creators';
import deploymentModel from '../../models/deployment';
import DeploymentSummary from './deployment-summary';
import { buildComponentMap, componentType } from '../../models/component-type';
import DeploymentComponentList from './deployment-component-list';
import DeploymentJobComponentList from './deployment-job-component-list';
import DeploymentBreadcrumb from '../page-deployment/deployment-bread-crumb';
import PromoteDeploymentAction from './promote-deployment-action';
import { Icon, Typography } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';

export class DeploymentOverview extends React.Component {
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
    let componentMap;
    if (deployment) {
      componentMap = buildComponentMap(deployment.components);
    }

    return (
      <div className="o-layout-constrained">
        <DeploymentBreadcrumb
          appName={appName}
          deploymentName={deploymentName}
        />
        <main>
          <AsyncResource
            resource="DEPLOYMENT"
            resourceParams={[appName, deploymentName]}
          >
            {!deployment && 'No deployment…'}
            {deployment && (
              <React.Fragment>
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
                <div>
                  <DeploymentSummary
                    appName={appName}
                    deployment={deployment}
                  />
                </div>
                <div>
                  <DeploymentComponentList
                    appName={appName}
                    deploymentName={deploymentName}
                    components={componentMap[componentType.component]}
                  />
                  <DeploymentJobComponentList
                    appName={appName}
                    deploymentName={deploymentName}
                    components={componentMap[componentType.job]}
                  />
                </div>
              </React.Fragment>
            )}
          </AsyncResource>
        </main>
      </div>
    );
  }
}

DeploymentOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  deployment: PropTypes.exact(deploymentModel),
  deploymentName: PropTypes.string.isRequired,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  deployment: getDeployment(state),
});

const mapDispatchToProps = (dispatch) => ({
  subscribe: (appName, deploymentName) => {
    dispatch(actionCreators.subscribeDeployment(appName, deploymentName));
  },
  unsubscribe: (appName, deploymentName) => {
    dispatch(actionCreators.unsubscribeDeployment(appName, deploymentName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DeploymentOverview);
