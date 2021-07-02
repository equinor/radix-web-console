import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Alert from '../alert';

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

import { Breadcrumbs, Icon, Button } from '@equinor/eds-core-react';
import { github, trending_up } from '@equinor/eds-icons';

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
                <p className="body_short">
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
                <div className="env__content">
                  <section className="grid">
                    <h4>Overview</h4>
                    <div className="env__overview">
                      <div>
                        <p className="body_short">
                          Environment <strong>{envName}</strong>
                        </p>
                        {!environment.branchMapping && (
                          <p className="body_short">
                            Not automatically deployed
                          </p>
                        )}
                        {environment.branchMapping && (
                          <p className="body_short">
                            Built and deployed from{' '}
                            <a
                              href={linkToGitHubBranch(
                                application.registration.repository,
                                environment.branchMapping
                              )}
                              className="branch_link"
                            >
                              {environment.branchMapping} branch{' '}
                              <Icon data={github} size="24" />
                            </a>{' '}
                          </p>
                        )}
                      </div>
                      <div>
                        {!deployment && (
                          <p className="body_short">No active deployment</p>
                        )}
                        {deployment && (
                          <React.Fragment>
                            <p className="body_short">
                              Deployment active since{' '}
                              <strong>
                                <RelativeToNow time={deployment.activeFrom} />
                              </strong>
                            </p>
                            <p className="body_short">
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
                                <Button
                                  variant="ghost"
                                  href={routeWithParams(
                                    routes.appJobNew,
                                    { appName },
                                    {
                                      pipeline: 'promote',
                                      deploymentName: deployment.name,
                                      fromEnvironment: deployment.environment,
                                    }
                                  )}
                                >
                                  Promote
                                  <Icon data={trending_up} />
                                </Button>
                              )}
                            </p>
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  </section>
                  {deployment && (
                    <ComponentList
                      appName={appName}
                      environment={environment}
                      components={deployment.components}
                    ></ComponentList>
                  )}
                  {events && <EventsList events={sortedEvents} />}
                  {environment.deployments && (
                    <DeploymentsList
                      inEnv
                      appName={appName}
                      deployments={environment.deployments.filter(
                        (deployment) => !!deployment.activeTo
                      )}
                    />
                  )}
                </div>
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
