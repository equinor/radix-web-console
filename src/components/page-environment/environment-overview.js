import { connect } from 'react-redux';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Alert from '../alert';
import Button from '../button';
import LinkButton from '../link-button';

import DeploymentsList from '../deployments-list';
import EventsList from '../events-list';
import RelativeToNow from '../time/relative-to-now';
import AsyncResource from '../async-resource';

import { getEvents } from '../../state/events';
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
import eventModel from '../../models/event';
import configHandler from '../../utils/config';
import { keys as configKeys } from '../../utils/config/keys';

import routes from '../../routes';

import './style.css';
import ComponentList from './component-list';

import { Breadcrumbs } from '@equinor/eds-core-react';

const eventDateSorter = (a, b) => {
  if (a.lastTimestamp > b.lastTimestamp) {
    return -1;
  } else if (a.lastTimestamp < b.lastTimestamp) {
    return 1;
  }
  return 0;
};

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
      events,
    } = this.props;
    const loaded = application && environment;
    const deployment = loaded && environment.activeDeployment;
    const isOrphan = environment && environment.status === 'Orphan';
    const sortedEvents = (events ? [...events] : []).sort(eventDateSorter);
    const envOrphanActions = isOrphan ? (
      <Button onClick={this.handleDelete} btnType={['small', 'default']}>
        Delete environment
      </Button>
    ) : null;

    return (
      <React.Fragment>
        <div className="o-layout-constrained">
          <Breadcrumbs>
            <Breadcrumbs.Breadcrumb href={routing.getAppUrl(appName)}>
              {appName}
            </Breadcrumbs.Breadcrumb>
            <Breadcrumbs.Breadcrumb href={routing.getEnvsUrl(appName)}>
              Environments
            </Breadcrumbs.Breadcrumb>
            <Breadcrumbs.Breadcrumb>{envName}</Breadcrumbs.Breadcrumb>
          </Breadcrumbs>
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
                    <ComponentList
                      appName={appName}
                      environment={environment}
                      components={deployment.components}
                    ></ComponentList>
                  )}
                </main>
                <section>
                  <h2 className="o-heading-section">Previous deployments</h2>
                  {environment.deployments && (
                    <DeploymentsList
                      inEnv
                      appName={appName}
                      deployments={environment.deployments.filter(
                        (deployment) => !!deployment.activeTo
                      )}
                    />
                  )}
                </section>
                <section>
                  <h2 className="o-heading-section">Events</h2>
                  {events && <EventsList events={sortedEvents} />}
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
  events: PropTypes.arrayOf(PropTypes.exact(eventModel)).isRequired,
};

const mapStateToProps = (state) => ({
  application: getApplication(state),
  environment: getEnvironment(state),
  environmentMeta: getEnvironmentMeta(state),
  events: getEvents(state),
});

const mapDispatchToProps = (dispatch, { appName, envName }) => ({
  subscribe: () => {
    dispatch(subscriptionActions.subscribeApplication(appName));
    dispatch(subscriptionActions.subscribeEnvironment(appName, envName));
    dispatch(subscriptionActions.subscribeEvents(appName, envName));
  },
  unsubscribe: (oldAppName = appName, oldEnvName = envName) => {
    dispatch(subscriptionActions.unsubscribeApplication(oldAppName));
    dispatch(
      subscriptionActions.unsubscribeEnvironment(oldAppName, oldEnvName)
    );
    dispatch(subscriptionActions.unsubscribeEvents(oldAppName, oldEnvName));
  },
  deleteEnvironment: () =>
    dispatch(envActions.deleteEnvRequest({ appName, envName })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnvironmentOverview);
