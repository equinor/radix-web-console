import { connect } from 'react-redux';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Breadcrumb from '../breadcrumb';
import DockerImage from '../docker-image';

import { getDeployment } from '../../state/deployment';
import { routeWithParams, smallDeploymentName } from '../../utils/string';
import * as actionCreators from '../../state/subscriptions/action-creators';
import routes from '../../routes';

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
            <div className="o-layout-columns">
              <section>
                <h2 className="o-heading-section">Overview</h2>
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
                <h2 className="o-heading-section">Environment variables</h2>
              </section>
            </div>
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
