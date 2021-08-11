import { Breadcrumbs, Button, Icon, Typography } from '@equinor/eds-core-react';
import { github, trending_up } from '@equinor/eds-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import ComponentList from './component-list';
import Alert from '../alert';
import AsyncResource from '../async-resource';
import DeploymentsList from '../deployments-list';
import EventsList from '../events-list';
import RelativeToNow from '../time/relative-to-now';
import environmentModel from '../../models/environment';
import eventModel from '../../models/event';
import routes from '../../routes';
import { getApplication } from '../../state/application';
import { getEnvironment, getEnvironmentMeta } from '../../state/environment';
import envActions from '../../state/environment/action-creators';
import { getEvents } from '../../state/events';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import configHandler from '../../utils/config';
import { keys as configKeys } from '../../utils/config/keys';
import * as routing from '../../utils/routing';
import {
  linkToGitHubBranch,
  routeWithParams,
  smallDeploymentName,
} from '../../utils/string';

import './style.css';

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
    const sortedEvents = events ? [...events].sort(eventDateSorter) : [];
    const envOrphanActions = isOrphan ? (
      <Button onClick={this.handleDelete}>Delete environment</Button>
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
                <Typography variant="body_short">
                  This environment is orphaned; it is not defined in{' '}
                  <strong>radixconfig.yaml</strong>
                </Typography>
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
                    <Typography variant="h4">Overview</Typography>
                    <div className="env__overview">
                      <div>
                        <Typography variant="body_short">
                          Environment <strong>{envName}</strong>
                        </Typography>
                        {!environment.branchMapping && (
                          <Typography variant="body_short">
                            Not automatically deployed
                          </Typography>
                        )}
                        {environment.branchMapping && (
                          <Typography variant="body_short">
                            Built and deployed from{' '}
                            <Typography
                              link
                              href={linkToGitHubBranch(
                                application.registration.repository,
                                environment.branchMapping
                              )}
                              token={{ textDecoration: 'none' }}
                            >
                              {environment.branchMapping} branch
                              <Icon
                                className="env__overview-link-icon"
                                data={github}
                                size="24"
                              />
                            </Typography>
                          </Typography>
                        )}
                      </div>
                      <div>
                        {!deployment ? (
                          <Typography variant="body_short">
                            No active deployment
                          </Typography>
                        ) : (
                          <React.Fragment>
                            <Typography variant="body_short">
                              Deployment active since{' '}
                              <strong>
                                <RelativeToNow time={deployment.activeFrom} />
                              </strong>
                            </Typography>
                            <Typography Typography="body_short">
                              Active deployment{' '}
                              <Typography link as="span">
                                <NavLink
                                  className="env__link"
                                  to={routing.getAppDeploymentUrl(
                                    appName,
                                    deployment.name
                                  )}
                                >
                                  {smallDeploymentName(deployment.name)}
                                </NavLink>
                              </Typography>{' '}
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
                            </Typography>
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
