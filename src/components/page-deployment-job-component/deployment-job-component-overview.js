import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

import AsyncResource from '../async-resource';
import { Breadcrumb } from '../breadcrumb';
import ComponentSecrets from '../component/component-secrets';
import { EnvironmentVariables } from '../environment-variables';
import Overview from '../page-active-job-component/overview';
import { routes } from '../../routes';
import { getDeployment } from '../../state/deployment';
import * as actionCreators from '../../state/subscriptions/action-creators';
import { routeWithParams, smallDeploymentName } from '../../utils/string';

export class DeploymentJobComponentOverview extends Component {
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
    const { appName, jobComponentName, deploymentName, deployment } =
      this.props;
    const component = deployment?.components?.find(
      (comp) => comp.name === jobComponentName
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
            { label: jobComponentName },
          ]}
        />
        <AsyncResource
          resource="DEPLOYMENT"
          resourceParams={[appName, deploymentName]}
        >
          {deployment && component && (
            <>
              <Overview component={component} />
              <div className="secrets_list">
                <ComponentSecrets component={component} />
              </div>
              <div className="grid grid--gap-medium">
                <EnvironmentVariables
                  appName={appName}
                  envName={deployment.environment}
                  componentName={jobComponentName}
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
  subscribe: (appName, deploymentName) =>
    dispatch(actionCreators.subscribeDeployment(appName, deploymentName)),
  unsubscribe: (appName, deploymentName) =>
    dispatch(actionCreators.unsubscribeDeployment(appName, deploymentName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeploymentJobComponentOverview);
