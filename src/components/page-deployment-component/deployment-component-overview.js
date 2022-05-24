import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

import AsyncResource from '../async-resource';
import { Breadcrumb } from '../breadcrumb';
import { ComponentSecrets } from '../component/component-secrets';
import { EnvironmentVariables } from '../environment-variables';
import { Overview } from '../page-active-component/overview';
import { routes } from '../../routes';
import { getMemoizedDeployment } from '../../state/deployment';
import {
  subscribeDeployment,
  unsubscribeDeployment,
} from '../../state/subscriptions/action-creators';
import { routeWithParams, smallDeploymentName } from '../../utils/string';

export class DeploymentComponentOverview extends Component {
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
    const component = deployment?.components?.find(
      (x) => x.name === componentName
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
                componentName={componentName}
                component={component}
                envName={deployment.environment}
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

DeploymentComponentOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  deployment: PropTypes.object,
  deploymentName: PropTypes.string.isRequired,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  deployment: getMemoizedDeployment(state),
});

const mapDispatchToProps = (dispatch) => ({
  subscribe: (appName, deploymentName) => {
    dispatch(subscribeDeployment(appName, deploymentName));
  },
  unsubscribe: (appName, deploymentName) => {
    dispatch(unsubscribeDeployment(appName, deploymentName));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeploymentComponentOverview);
