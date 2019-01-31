import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Breadcrumb from '../breadcrumb';
import DockerImage from '../docker-image';

import { getDeployment } from '../../state/deployment';
import { routeWithParams, smallDeploymentName } from '../../utils/string';
import * as actionCreators from '../../state/subscriptions/action-creators';
import routes from '../../routes';

/**
 * Filter for removing Radix-injected variables; those should not be displayed
 * in a deployment coponent (only in a running component under an environment)
 */
const filterRadixVariables = (() => {
  const radixVarRegEx = /^RADIX_/;
  return varName => !varName.match(radixVarRegEx);
})();

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
    const { appName, componentName, deploymentName, deployment } = this.props;
    const component =
      deployment &&
      deployment.components &&
      deployment.components.find(comp => comp.name === componentName);
    const envVarNames =
      component &&
      Object.keys(component.variables).filter(filterRadixVariables);

    return (
      <React.Fragment>
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
            {
              label: componentName,
            },
          ]}
        />
        <main>
          {!deployment && 'No deployment…'}
          {deployment && (
            <React.Fragment>
              <section>
                <h2 className="o-heading-section">Overview</h2>
                <p>
                  Component <strong>{component.name}</strong>
                </p>
                <p>
                  Image <DockerImage path={component.image} />
                </p>
                {component.ports.length > 0 && (
                  <React.Fragment>
                    <p>Open ports:</p>
                    <ul className="o-indent-list">
                      {component.ports.map(port => (
                        <li key={port.port}>
                          {port.port} ({port.name})
                        </li>
                      ))}
                    </ul>
                  </React.Fragment>
                )}
                {component.ports.length === 0 && <p>No open ports</p>}
              </section>
              <div className="o-layout-columns gap-top">
                <section>
                  <h2 className="o-heading-section">Environment variables</h2>
                  {envVarNames.length === 0 && (
                    <p>This component uses no environment variables</p>
                  )}
                  {envVarNames.length > 0 && (
                    <dl className="o-key-values">
                      {envVarNames.map(varName => (
                        <React.Fragment key={varName}>
                          <dt>{varName}</dt>
                          <dd>{component.variables[varName]}</dd>
                        </React.Fragment>
                      ))}
                    </dl>
                  )}
                </section>
                <section>
                  <h2 className="o-heading-section">Secrets</h2>
                  {component.secrets.length === 0 && (
                    <p>This component uses no secrets</p>
                  )}
                  {component.secrets.length > 0 && (
                    <ul className="o-indent-list">
                      {component.secrets.map(secret => (
                        <li key={secret}>{secret}</li>
                      ))}
                    </ul>
                  )}
                </section>
              </div>
            </React.Fragment>
          )}
        </main>
      </React.Fragment>
    );
  }
}

DeploymentOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  deployment: PropTypes.object,
  deploymentName: PropTypes.string.isRequired,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  deployment: getDeployment(state),
});

const mapDispatchToProps = dispatch => ({
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
)(DeploymentOverview);
