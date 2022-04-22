import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { github, trending_up } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { ComponentList } from './component-list';
import EnvironmentAlerting from './environment-alerting';

import { Alert } from '../alert';
import AsyncResource from '../async-resource';
import { Breadcrumb } from '../breadcrumb';
import { DeploymentsList } from '../deployments-list';
import { EventsList } from '../events-list';
import { RelativeToNow } from '../time/relative-to-now';
import { ApplicationModelValidationMap } from '../../models/application';
import { ConfigurationStatus } from '../../models/configuration-status';
import { EnvironmentModelValidationMap } from '../../models/environment';
import { EventModelValidationMap } from '../../models/event';
import { routes } from '../../routes';
import { getApplication } from '../../state/application';
import { getEnvironment, getEnvironmentMeta } from '../../state/environment';
import { actions as envActions } from '../../state/environment/action-creators';
import { getEvents } from '../../state/events';
import {
  subscribeApplication,
  subscribeEnvironment,
  subscribeEvents,
  unsubscribeApplication,
  unsubscribeEnvironment,
  unsubscribeEvents,
} from '../../state/subscriptions/action-creators';
import { configVariables } from '../../utils/config';
import {
  getAppDeploymentUrl,
  getAppUrl,
  getEnvsUrl,
} from '../../utils/routing';
import { sortCompareNumber } from '../../utils/sort-utils';
import {
  linkToGitHubBranch,
  routeWithParams,
  smallDeploymentName,
} from '../../utils/string';

export class EnvironmentOverview extends Component {
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

    const isLoaded = application && environment;
    const isOrphan = environment?.status === ConfigurationStatus.Orphan;
    const deployment = isLoaded && environment.activeDeployment;

    events?.sort((x, y) =>
      sortCompareNumber(x.lastTimestamp, y.lastTimestamp, 'descending')
    );

    return (
      <>
        <Breadcrumb
          links={[
            { label: appName, to: getAppUrl(appName) },
            { label: 'Environments', to: getEnvsUrl(appName) },
            { label: envName },
          ]}
        />
        {((environmentMeta &&
          (environmentMeta.isDeleted || environmentMeta.error)) ||
          isOrphan) && (
          <div className="grid grid--gap-medium">
            {environmentMeta?.isDeleted && (
              <Alert>
                Environment removal has started but it may take a while to be
                completely removed
              </Alert>
            )}
            {environmentMeta?.error && (
              <Alert type="warning">
                Some unexpected error occurred:{' '}
                {environmentMeta.error.toString()}
              </Alert>
            )}
            {isOrphan && (
              <Alert
                type="warning"
                actions={
                  <Button onClick={this.handleDelete}>
                    Delete environment
                  </Button>
                }
              >
                <Typography>
                  This environment is orphaned; it is not defined in{' '}
                  <strong>radixconfig.yaml</strong>
                </Typography>
              </Alert>
            )}
          </div>
        )}
        <AsyncResource
          resource="ENVIRONMENT"
          resourceParams={[appName, envName]}
        >
          {isLoaded && (
            <>
              <section className="grid grid--gap-medium">
                <Typography variant="h4">Overview</Typography>
                <div className="grid grid--gap-medium grid--overview-columns">
                  <div className="grid grid--gap-medium">
                    <Typography>
                      Environment <strong>{envName}</strong>
                    </Typography>
                    {environment.branchMapping ? (
                      <Typography>
                        Built and deployed from{' '}
                        <Typography
                          link
                          href={linkToGitHubBranch(
                            application.registration.repository,
                            environment.branchMapping
                          )}
                          token={{ textDecoration: 'none' }}
                        >
                          {environment.branchMapping} branch{' '}
                          <Icon data={github} size={24} />
                        </Typography>
                      </Typography>
                    ) : (
                      <Typography>Not automatically deployed</Typography>
                    )}
                    <div>
                      <EnvironmentAlerting
                        appName={appName}
                        envName={envName}
                      />
                    </div>
                  </div>
                  <div className="grid grid--gap-medium">
                    {deployment ? (
                      <>
                        <Typography>
                          Deployment active since{' '}
                          <strong>
                            <RelativeToNow time={deployment.activeFrom} />
                          </strong>
                        </Typography>
                        <Typography>
                          Active deployment{' '}
                          <Link
                            to={getAppDeploymentUrl(appName, deployment.name)}
                          >
                            <Typography link as="span">
                              {smallDeploymentName(deployment.name)}
                            </Typography>
                          </Link>{' '}
                          {configVariables.FLAGS.enablePromotionPipeline && (
                            <Button
                              variant="ghost"
                              href={routeWithParams(
                                routes.appJobNew,
                                { appName: appName },
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
                      </>
                    ) : (
                      <Typography>No active deployment</Typography>
                    )}
                  </div>
                </div>
              </section>
              {deployment && (
                <ComponentList
                  appName={appName}
                  environment={environment}
                  components={deployment.components}
                />
              )}
              {events && <EventsList events={events} />}
              {environment.deployments && (
                <div className="grid grid--gap-medium">
                  <Typography variant="h4">Previous deployments</Typography>
                  <DeploymentsList
                    inEnv
                    appName={appName}
                    deployments={environment.deployments.filter(
                      (deployment) => !!deployment.activeTo
                    )}
                  />
                </div>
              )}
            </>
          )}
        </AsyncResource>
      </>
    );
  }
}

EnvironmentOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  application: PropTypes.shape(ApplicationModelValidationMap),
  environment: PropTypes.shape(EnvironmentModelValidationMap),
  environmentMeta: PropTypes.shape({
    isDeleted: PropTypes.bool,
    error: PropTypes.string,
  }),
  events: PropTypes.arrayOf(PropTypes.shape(EventModelValidationMap))
    .isRequired,
};

const mapStateToProps = (state) => ({
  application: getApplication(state),
  environment: getEnvironment(state),
  environmentMeta: getEnvironmentMeta(state),
  events: getEvents(state),
});

const mapDispatchToProps = (dispatch, { appName, envName }) => ({
  subscribe: () => {
    dispatch(subscribeApplication(appName));
    dispatch(subscribeEnvironment(appName, envName));
    dispatch(subscribeEvents(appName, envName));
  },
  unsubscribe: (oldAppName = appName, oldEnvName = envName) => {
    dispatch(unsubscribeApplication(oldAppName));
    dispatch(unsubscribeEnvironment(oldAppName, oldEnvName));
    dispatch(unsubscribeEvents(oldAppName, oldEnvName));
  },
  deleteEnvironment: () =>
    dispatch(envActions.deleteEnvRequest({ appName, envName })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnvironmentOverview);
