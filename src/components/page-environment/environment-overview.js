import { connect } from 'react-redux';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import ActiveComponentStatus from './active-component-status';
import Alert from '../alert';
import Button from '../button';
import LinkButton from '../link-button';

import Breadcrumb from '../breadcrumb';
import DeploymentsList from '../deployments-list';
import EnvironmentBadge from '../environment-badge';
import RelativeToNow from '../time/relative-to-now';
import AsyncResource from '../async-resource';

import { getApplication } from '../../state/application';
import { getEnvironment, getEnvironmentMeta } from '../../state/environment';
import {
  linkToGitHubBranch,
  smallDeploymentName,
  routeWithParams,
} from '../../utils/string';
import * as routing from '../../utils/routing';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import envActions from '../../state/environment/action-creators';
import environmentModel from '../../models/environment';
import configHandler from '../../utils/config';
import { keys as configKeys } from '../../utils/config/keys';

import routes from '../../routes';

import './style.css';

export class EnvironmentOverview extends React.Component {
  constructor(props) {
    super(props);
    this.props.subscribe();
    this.handleDelete = this.handleDelete.bind(this);
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

  handleDelete() {
    const { deleteEnvironment, envName } = this.props;
    if (window.confirm(`Confirm deleting '${envName}' environment.`)) {
      deleteEnvironment();
    }
  }

  render() {
    const {
      appName,
      application,
      envName,
      environment,
      environmentMeta,
    } = this.props;
    const loaded = application && environment;
    const deployment = loaded && environment.activeDeployment;
    const isOrphan = environment && environment.status === 'Orphan';

    const envOrphanActions = isOrphan ? (
      <Button onClick={this.handleDelete} btnType={['small', 'default']}>
        Delete environment
      </Button>
    ) : null;

    return (
      <React.Fragment>
        <Breadcrumb
          links={[
            { label: appName, to: routing.getAppUrl(appName) },
            { label: 'Environments', to: routing.getEnvsUrl(appName) },
            {
              label: <EnvironmentBadge envName={envName} />,
            },
          ]}
        />
        <div className="o-layout-constrained">
          <div className="o-layout-stack">
            {environmentMeta && environmentMeta.isDeleted && (
              <Alert>
                Environment removal has started but it may take a while to be
                completely removed
              </Alert>
            )}
            {environmentMeta && environmentMeta.error && (
              <Alert type="warning">
                Some unexpected error occurred:{' '}
                {environmentMeta.error.toString()}
              </Alert>
            )}
            {isOrphan && (
              <Alert type="warning" actions={envOrphanActions}>
                <p>
                  This environment is orphaned; it is not defined in{' '}
                  <strong>radixconfig.yaml</strong>
                </p>
              </Alert>
            )}
          </div>
          <AsyncResource
            resource="ENVIRONMENT"
            resourceParams={[appName, envName]}
          >
            {loaded && (
              <React.Fragment>
                <main className="o-layout-columns">
                  <section>
                    <h2 className="o-heading-section">Overview</h2>
                    <p>
                      Environment <strong>{envName}</strong>
                    </p>
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
                          {environment.branchMapping}{' '}
                          <FontAwesomeIcon icon={faGithub} size="lg" />
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
                          </Link>{' '}
                          {configHandler.getConfig(configKeys.FLAGS)
                            .enablePromotionPipeline && (
                            <LinkButton
                              btnType={['default', 'tiny']}
                              to={routeWithParams(
                                routes.appJobNew,
                                { appName },
                                {
                                  pipeline: 'promote',
                                  deploymentName: deployment.name,
                                  fromEnvironment: deployment.environment,
                                }
                              )}
                            >
                              Promote…
                            </LinkButton>
                          )}
                        </p>
                        <p>
                          Deployment active since{' '}
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
                </main>
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
              </React.Fragment>
            )}
          </AsyncResource>
        </div>
      </React.Fragment>
    );
  }
}

EnvironmentOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  environment: PropTypes.shape(environmentModel),
};

const mapStateToProps = state => ({
  application: getApplication(state),
  environment: getEnvironment(state),
  environmentMeta: getEnvironmentMeta(state),
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
  deleteEnvironment: () =>
    dispatch(envActions.deleteEnvRequest({ appName, envName })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnvironmentOverview);
