import { connect } from 'react-redux';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import ActionsPage from '../actions-page';
import Alert from '../alert';
import AsyncResource from '../async-resource';
import Breadcrumb from '../breadcrumb';
import DockerImage from '../docker-image';
import LinkButton from '../link-button';
import RelativeToNow from '../time/relative-to-now';

import {
  routeWithParams,
  smallDeploymentName,
  smallJobName,
} from '../../utils/string';
import { getDeployment } from '../../state/deployment';
import * as actionCreators from '../../state/subscriptions/action-creators';
import deploymentModel from '../../models/deployment';
import configHandler from '../../utils/config';
import { keys as configKeys } from '../../utils/config/keys';

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
            { label: smallDeploymentName(deploymentName) },
          ]}
        />
        {configHandler.getConfig(configKeys.FLAGS).enablePromotionPipeline && (
          <ActionsPage>
            <LinkButton
              to={routeWithParams(
                routes.appJobNew,
                { appName },
                {
                  pipeline: 'promote',
                  deployment: deploymentName,
                }
              )}
            >
              Promote deployment…
            </LinkButton>
          </ActionsPage>
        )}
        <main className="o-layout-constrained">
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
                  <section>
                    <h2 className="o-heading-section">Components</h2>
                    {deployment.components &&
                      deployment.components.map(component => (
                        <p key={component.name}>
                          <Link
                            to={routeWithParams(routes.appComponent, {
                              appName,
                              deploymentName: deployment.name,
                              componentName: component.name,
                            })}
                          >
                            {component.name}
                          </Link>
                          <br />
                          image <DockerImage path={component.image} />
                        </p>
                      ))}
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

DeploymentOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  deployment: PropTypes.exact(deploymentModel),
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
