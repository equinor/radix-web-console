import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import AsyncResource from '../async-resource';
import { getDeployment } from '../../state/deployment';
import * as actionCreators from '../../state/subscriptions/action-creators';
import ComponentSecrets from '../component/component-secrets';
import EnvironmentVariables from '../environment-variables';
import Overview from '../page-active-component/overview';
import Breadcrumb from '../breadcrumb';
import { routeWithParams, smallDeploymentName } from '../../utils/string';
import routes from '../../routes';

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
      <div className="o-layout-constrained">
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
        <main>
          <AsyncResource
            resource="DEPLOYMENT"
            resourceParams={[appName, deploymentName]}
          >
            {deployment && (
              <React.Fragment>
                <Overview
                  componentName={componentName}
                  component={component}
                  envName={deployment.environment}
                />
                <div className="secrets_list">
                  <ComponentSecrets component={component} />
                </div>
                <div className="grid grid--gap-medium">
                  <EnvironmentVariables
                    appName={appName}
                    envName={deployment.environment}
                    componentName={componentName}
                    componentType={component.type}
                    includeRadixVars={false}
                    readonly={true}
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
