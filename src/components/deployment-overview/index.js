import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import RunningComponentStatus from './running-component-status';

import Breadcrumb from '../breadcrumb';
import RelativeToNow from '../time/relative-to-now';

import { getDeployment } from '../../state/deployment';
import { routeWithParams, smallJobName } from '../../utils/string';
import * as actionCreators from '../../state/subscriptions/action-creators';
import routes from '../../routes';
import DockerImage from '../docker-image';

import './style.css';

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

    return (
      <React.Fragment>
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            {
              label: 'Deployments',
              to: routeWithParams(routes.appDeployments, { appName }),
            },
            { label: deploymentName },
          ]}
        />
        <main>
          {!deployment && 'No deployment…'}
          {deployment && (
            <React.Fragment>
              <div className="o-layout-columns">
                <section>
                  <h2 className="o-heading-section">Summary</h2>
                  <p>
                    {!deployment.activeTo && (
                      <React.Fragment>
                        <strong>Currently deployed</strong> on environment{' '}
                      </React.Fragment>
                    )}
                    {deployment.activeTo && (
                      <React.Fragment>
                        Was deployed to environment{' '}
                      </React.Fragment>
                    )}
                    <Link
                      to={routeWithParams(routes.appEnvironment, {
                        appName,
                        envName: deployment.environment,
                      })}
                    >
                      {deployment.environment}
                    </Link>
                  </p>
                  <p>
                    Created by job{' '}
                    <Link
                      to={routeWithParams(routes.appJob, {
                        appName,
                        jobName: deployment.createdByJob,
                      })}
                    >
                      {smallJobName(deployment.createdByJob)}
                    </Link>
                  </p>
                  <p>
                    Active from{' '}
                    <strong>
                      <RelativeToNow time={deployment.activeFrom} />
                    </strong>
                  </p>
                  {deployment.activeTo && (
                    <p>
                      Active until{' '}
                      <strong>
                        <RelativeToNow time={deployment.activeTo} />
                      </strong>
                    </p>
                  )}
                </section>
                <section className="deployment-overview__components">
                  <h2 className="o-heading-section">Components</h2>
                  {deployment.components &&
                    deployment.components.map(component => (
                      <p key={component.name}>
                        <Link
                          to={routeWithParams(routes.appComponentNew, {
                            appName,
                            deploymentName: deployment.name,
                            componentName: component.name,
                          })}
                        >
                          {component.name}
                        </Link>
                        {!deployment.activeTo && (
                          <RunningComponentStatus
                            replicas={component.replicaList}
                          />
                        )}
                        <br />
                        image <DockerImage path={component.image} />
                      </p>
                    ))}
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
