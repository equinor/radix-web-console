import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { github, trending_up } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';

import { ComponentList } from './component-list';
import EnvironmentAlerting from './environment-alerting';
import EnvironmentToolbar from './environment-toolbar';

import { Alert } from '../alert';
import AsyncResource from '../async-resource';
import { Breadcrumb } from '../breadcrumb';
import { DeploymentsList } from '../deployments-list';
import { EventsList } from '../events-list';
import { GitTagLinks } from '../git-tags/git-tag-links';
import { RelativeToNow } from '../time/relative-to-now';
import { RootState } from '../../init/store';
import {
  ApplicationModel,
  ApplicationModelValidationMap,
} from '../../models/radix-api/applications/application';
import { ConfigurationStatus } from '../../models/radix-api/environments/configuration-status';
import {
  EnvironmentModel,
  EnvironmentModelValidationMap,
} from '../../models/radix-api/environments/environment';
import {
  EventModel,
  EventModelValidationMap,
} from '../../models/radix-api/events/event';
import { routes } from '../../routes';
import { getMemoizedApplication } from '../../state/application';
import {
  getMemoizedEnvironment,
  getMemoizedEnvironmentMeta,
} from '../../state/environment';
import { actions as envActions } from '../../state/environment/action-creators';
import { getMemoizedEvents } from '../../state/events';
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
import { sortCompareDate } from '../../utils/sort-utils';
import {
  linkToGitHubBranch,
  linkToGitHubCommit,
  routeWithParams,
  smallDeploymentName,
  smallGithubCommitHash,
} from '../../utils/string';

import './style.css';

interface EnvironmentOverviewDispatch {
  subscribe: (appName: string, envName: string) => void;
  unsubscribe: (appName: string, envName: string) => void;
  deleteEnvironment: (appName: string, envName: string) => void;
}

interface EnvironmentOverviewState {
  application?: ApplicationModel;
  environment?: EnvironmentModel;
  environmentMeta?: {
    isDeleted?: boolean;
    error?: string;
  };
  events: Array<EventModel>;
}

export interface EnvironmentOverviewProps
  extends EnvironmentOverviewDispatch,
    EnvironmentOverviewState {
  appName: string;
  envName: string;
}

export class EnvironmentOverview extends Component<EnvironmentOverviewProps> {
  static readonly propTypes: PropTypes.ValidationMap<EnvironmentOverviewProps> =
    {
      appName: PropTypes.string.isRequired,
      envName: PropTypes.string.isRequired,
      application: PropTypes.shape(
        ApplicationModelValidationMap
      ) as PropTypes.Validator<ApplicationModel>,
      environment: PropTypes.shape(
        EnvironmentModelValidationMap
      ) as PropTypes.Validator<EnvironmentModel>,
      environmentMeta: PropTypes.shape({
        isDeleted: PropTypes.bool,
        error: PropTypes.string,
      }),
      events: PropTypes.arrayOf(
        PropTypes.shape(
          EventModelValidationMap
        ) as PropTypes.Validator<EventModel>
      ).isRequired,
      subscribe: PropTypes.func.isRequired,
      unsubscribe: PropTypes.func.isRequired,
      deleteEnvironment: PropTypes.func.isRequired,
    };

  constructor(props: EnvironmentOverviewProps) {
    super(props);
    this.props.subscribe(this.props.appName, this.props.envName);
    this.handleDelete = this.handleDelete.bind(this);
  }

  override componentWillUnmount() {
    this.props.unsubscribe(this.props.appName, this.props.envName);
  }

  override componentDidUpdate(prevProps: Readonly<EnvironmentOverviewProps>) {
    const { appName, envName } = this.props;
    if (appName !== prevProps.appName || envName !== prevProps.envName) {
      this.props.unsubscribe(prevProps.appName, prevProps.envName);
      this.props.subscribe(appName, envName);
    }
  }

  private handleDelete(): void {
    const { appName, deleteEnvironment, envName } = this.props;
    if (window.confirm(`Confirm deleting '${envName}' environment.`)) {
      deleteEnvironment(appName, envName);
    }
  }

  override render() {
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
            {environmentMeta.isDeleted && (
              <Alert>
                Environment removal has started but it may take a while to be
                completely removed
              </Alert>
            )}
            {environmentMeta.error && (
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
                <EnvironmentToolbar
                  appName={appName}
                  environment={environment}
                  startEnabled
                  stopEnabled
                />
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
                    {deployment?.gitCommitHash && (
                      <Typography>
                        Built from commit{' '}
                        <Typography
                          link
                          href={linkToGitHubCommit(
                            application.registration.repository,
                            deployment.gitCommitHash
                          )}
                          token={{ textDecoration: 'none' }}
                        >
                          {smallGithubCommitHash(deployment.gitCommitHash)}{' '}
                          <Icon data={github} size={24} />
                        </Typography>
                      </Typography>
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
                          <Typography
                            as={Link}
                            to={getAppDeploymentUrl(appName, deployment.name)}
                            link
                          >
                            {smallDeploymentName(deployment.name)}
                          </Typography>{' '}
                          {configVariables.FLAGS.enablePromotionPipeline && (
                            <Button
                              variant="ghost"
                              as={Link}
                              to={routeWithParams(
                                routes.appJobNew,
                                { appName: appName },
                                {
                                  pipeline: 'promote',
                                  deploymentName: deployment.name,
                                  fromEnvironment: deployment.environment,
                                }
                              )}
                            >
                              Promote <Icon data={trending_up} />
                            </Button>
                          )}
                        </Typography>
                        {deployment.gitTags && (
                          <div className="environment-overview__tags grid grid--gap-x-small grid--auto-columns">
                            <Typography>Tags</Typography>
                            <GitTagLinks
                              gitTags={deployment.gitTags}
                              repository={application.registration.repository}
                            />
                            <Icon data={github} size={24} />
                          </div>
                        )}
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

              {events && (
                <EventsList
                  events={[...events].sort((x, y) =>
                    sortCompareDate(
                      x.lastTimestamp,
                      y.lastTimestamp,
                      'descending'
                    )
                  )}
                />
              )}

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

function mapStateToProps(state: RootState): EnvironmentOverviewState {
  return {
    application: { ...getMemoizedApplication(state) },
    environment: { ...getMemoizedEnvironment(state) },
    environmentMeta: { ...getMemoizedEnvironmentMeta(state) },
    events: [...getMemoizedEvents(state)],
  };
}

function mapDispatchToProps(dispatch: Dispatch): EnvironmentOverviewDispatch {
  return {
    subscribe: (appName, envName) => {
      dispatch(subscribeApplication(appName));
      dispatch(subscribeEnvironment(appName, envName));
      dispatch(subscribeEvents(appName, envName));
    },
    unsubscribe: (appName, envName) => {
      dispatch(unsubscribeApplication(appName));
      dispatch(unsubscribeEnvironment(appName, envName));
      dispatch(unsubscribeEvents(appName, envName));
    },
    deleteEnvironment: (appName, envName) =>
      dispatch(envActions.deleteEnvRequest({ appName, envName })),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnvironmentOverview);
