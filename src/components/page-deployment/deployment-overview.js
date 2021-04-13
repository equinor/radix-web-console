import { connect } from 'react-redux';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import DeploymentBredCrumb from '../page-deployment/deployment-bred-crumb';
import PromoteDeploymentAction from './promote-deployment-action';

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
      <React.Fragment>
        <DeploymentBredCrumb
          appName={appName}
          deploymentName={deploymentName}
        />
        <PromoteDeploymentAction
          appName={appName}
          deploymentName={deploymentName}
          deployment={deployment}
        />
        <main>
          <AsyncResource
            resource="DEPLOYMENT"
            resourceParams={[appName, deploymentName]}
          >
            {!deployment && 'No deployment…'}
            {deployment && (
              <React.Fragment>
                <div className="o-layout-stack">
                  {!deployment.activeTo && (
                    <Alert>
                      <FontAwesomeIcon icon={faInfoCircle} size="lg" />
                      This deployment is active
                    </Alert>
                  )}
                </div>
                <div className="o-layout-columns">
                  <DeploymentSummary
                    appName={appName}
                    deployment={deployment}
                  />
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
      </React.Fragment>
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
