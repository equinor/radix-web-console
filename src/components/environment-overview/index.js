import { connect } from 'react-redux';
// import { Environment } from 'radix-web-console-models';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import ActiveComponentStatus from './active-component-status';

import Breadcrumb from '../breadcrumb';
import DeploymentsList from '../deployments-list';
import EnvironmentBadge from '../environment-badge';
import RelativeToNow from '../time/relative-to-now';

import { getApplication } from '../../state/application';
import { getEnvironment } from '../../state/environment';
import { linkToGitHubBranch, smallDeploymentName } from '../../utils/string';
import * as routing from '../../utils/routing';
import * as subscriptionActions from '../../state/subscriptions/action-creators';

export class PageEnvironment extends React.Component {
  componentWillMount() {
    this.props.subscribe();
  }

  componentWillUnmount() {
    this.props.unsubscribe();
  }

  componentDidUpdate(prevProps) {
    const { appName, envName } = this.props;

    if (appName !== prevProps.appName || envName !== prevProps.envName) {
      this.props.unsubscribe(prevProps.appName, prevProps.envName);
      this.props.subscribe();
    }
  }

  render() {
    const { appName, application, envName, environment } = this.props;
    const loaded = application && environment;
    const deployment = loaded && environment.activeDeployment;

    return (
      <div className="env-overview">
        <Breadcrumb
          links={[
            { label: appName, to: routing.getAppUrl(appName) },
            {
              label: (
                <React.Fragment>
                  <EnvironmentBadge envName={envName} /> environment
                </React.Fragment>
              ),
            },
          ]}
        />
        {!loaded && 'Loading…'}
        {loaded && (
          <main>
            <div className="o-layout-columns">
              <section>
                <h2 className="o-heading-section">Overview</h2>
                {!environment.branchMapping && (
                  <p>Not automatically deployed</p>
                )}
                {environment.branchMapping && (
                  <p>
                    Built and deployed from{' '}
                    <a
                      href={linkToGitHubBranch(
                        application.registration.repository,
                        environment.branchMapping
                      )}
                    >
                      {environment.branchMapping}
                    </a>{' '}
                    branch
                  </p>
                )}
                {!deployment && <p>No active deployment</p>}
                {deployment && (
                  <React.Fragment>
                    <p>
                      Active deployment{' '}
                      <Link
                        to={routing.getAppDeploymentUrl(
                          appName,
                          deployment.name
                        )}
                      >
                        {smallDeploymentName(deployment.name)}
                      </Link>
                    </p>
                    <p>
                      Active from{' '}
                      <strong>
                        <RelativeToNow time={deployment.activeFrom} />
                      </strong>
                    </p>
                  </React.Fragment>
                )}
              </section>
              {deployment && (
                <section>
                  <h2 className="o-heading-section">Active components</h2>
                  {deployment.components &&
                    deployment.components.map(component => (
                      <p key={component.name}>
                        <Link
                          to={routing.getActiveComponentUrl(
                            appName,
                            envName,
                            component.name
                          )}
                        >
                          {component.name}{' '}
                        </Link>
                        <ActiveComponentStatus
                          componentName={component.name}
                          envSecrets={environment.secrets}
                          replicas={component.replicaList}
                        />
                      </p>
                    ))}
                </section>
              )}
            </div>
            <section>
              <h2 className="o-heading-section">Previous deployments</h2>
              {environment.deployments && (
                <DeploymentsList
                  inEnv
                  appName={appName}
                  deployments={environment.deployments.filter(
                    deployment => !!deployment.activeTo
                  )}
                />
              )}
            </section>
          </main>
        )}
      </div>
    );
  }
}

PageEnvironment.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  //  environment: PropTypes.shape(Environment).isRequired,
};

const mapStateToProps = state => ({
  application: getApplication(state),
  environment: getEnvironment(state),
});

const mapDispatchToProps = (dispatch, { appName, envName }) => ({
  subscribe: () => {
    dispatch(subscriptionActions.subscribeApplication(appName));
    dispatch(subscriptionActions.subscribeEnvironment(appName, envName));
  },
  unsubscribe: (oldAppName = appName, oldEnvName = envName) => {
    dispatch(subscriptionActions.unsubscribeApplication(oldAppName));
    dispatch(
      subscriptionActions.unsubscribeEnvironment(oldAppName, oldEnvName)
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageEnvironment);
