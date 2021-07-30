import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import AsyncResource from '../async-resource';
import ComponentSecrets from '../component/component-secrets';
import EnvironmentVariables from '../environment-variables';
import Overview from '../page-active-job-component/overview';
import DeploymentComponentBreadCrumb from '../page-deployment/deployment-component-bread-crumb';
import { getDeployment } from '../../state/deployment';
import * as actionCreators from '../../state/subscriptions/action-creators';

export class DeploymentJobComponentOverview extends React.Component {
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
    const {
      appName,
      jobComponentName,
      deploymentName,
      deployment,
    } = this.props;
    const component =
      deployment &&
      deployment.components &&
      deployment.components.find((comp) => comp.name === jobComponentName);
    return (
      <div className="o-layout-constrained">
        <DeploymentComponentBreadCrumb
          appName={appName}
          deploymentName={deploymentName}
          componentName={jobComponentName}
        />
        <main>
          <AsyncResource
            resource="DEPLOYMENT"
            resourceParams={[appName, deploymentName]}
          >
            {deployment && component && (
              <React.Fragment>
                <div>
                  <section>
                    <Overview component={component} />
                    <ComponentSecrets component={component} />
                  </section>
                </div>
                <div className="o-layout-columns">
                  <section>
                    <EnvironmentVariables
                      appName={appName}
                      envName={component.envName}
                      componentName={jobComponentName}
                      componentType={component.type}
                      includeRadixVars={false}
                    />
                  </section>
                </div>
              </React.Fragment>
            )}
          </AsyncResource>
        </main>
      </div>
    );
  }
}

DeploymentJobComponentOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  deployment: PropTypes.object,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeploymentJobComponentOverview);
