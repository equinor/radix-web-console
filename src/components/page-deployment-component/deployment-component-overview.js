import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import AsyncResource from '../async-resource';
import { getDeployment } from '../../state/deployment';
import * as actionCreators from '../../state/subscriptions/action-creators';
import ComponentSecrets from '../component/component-secrets';
import EnvVariables from '../component/env-variables';
import DeploymentComponentBreadCrumb from '../page-deployment/deployment-component-bread-crumb';
import ComponentPorts from '../component/component-ports';
import Overview from '../page-active-component/overview';

export class DeploymentComponentOverview extends React.Component {
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
    const { appName, deploymentName, componentName, deployment } = this.props;
    const component =
      deployment &&
      deployment.components &&
      deployment.components.find((comp) => comp.name === componentName);
    return (
      <React.Fragment>
        <DeploymentComponentBreadCrumb
          appName={appName}
          deploymentName={deploymentName}
          componentName={componentName}
        />
        <main>
          <AsyncResource
            resource="DEPLOYMENT"
            resourceParams={[appName, deploymentName]}
          >
            {deployment && (
              <React.Fragment>
                <div className="o-layout-columns gap-top">
                  <section>
                    <Overview
                      componentName={componentName}
                      component={component}
                    />
                    <ComponentPorts ports={component.ports} />
                  </section>
                  <ComponentSecrets component={component} />
                </div>
                <div className="o-layout-columns gap-top">
                  <section>
                    <EnvVariables
                      component={component}
                      includeRadixVars={false}
                    />
                  </section>
                </div>
              </React.Fragment>
            )}
          </AsyncResource>
        </main>
      </React.Fragment>
    );
  }
}

DeploymentComponentOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
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
)(DeploymentComponentOverview);
