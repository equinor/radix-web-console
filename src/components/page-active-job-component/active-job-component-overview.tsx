import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { RootState } from '../../init/store';
import {
  ScheduledBatchSummaryModel,
  ScheduledBatchSummaryModelValidationMap,
} from '../../models/radix-api/deployments/scheduled-batch-summary';
import {
  ScheduledJobSummaryModel,
  ScheduledJobSummaryModelValidationMap,
} from '../../models/radix-api/deployments/scheduled-job-summary';
import {
  EnvironmentModel,
  EnvironmentModelValidationMap,
} from '../../models/radix-api/environments/environment';
import { routes } from '../../routes';
import { getMemoizedEnvironment } from '../../state/environment';
import { getMemoizedEnvironmentScheduledBatches } from '../../state/environment-scheduled-batches';
import { getMemoizedEnvironmentScheduledJobs } from '../../state/environment-scheduled-jobs';
import {
  subscribeEnvironment,
  subscribeEnvironmentScheduledJobs,
  subscribeEnvironmentScheduledBatches,
  unsubscribeEnvironment,
  unsubscribeEnvironmentScheduledJobs,
  unsubscribeEnvironmentScheduledBatches,
} from '../../state/subscriptions/action-creators';
import { getEnvsUrl } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';
import AsyncResource from '../async-resource';
import { Breadcrumb } from '../breadcrumb';
import ScheduledBatchList from '../component/scheduled-job/scheduled-batch-list';
import ScheduledJobList from '../component/scheduled-job/scheduled-job-list';
import ActiveComponentSecrets from '../component/secrets/active-component-secrets';
import Toolbar from '../component/toolbar';
import { EnvironmentVariables } from '../environment-variables';
import { ComponentReplicaList } from '../page-active-component/component-replica-list';
import { JobComponentVulnerabilityDetails } from './job-component-vulnerability-details';
import { Overview } from './overview';

interface ActiveScheduledJobOverviewState {
  environment?: EnvironmentModel;
  scheduledBatches?: Array<ScheduledBatchSummaryModel>;
  scheduledJobs?: Array<ScheduledJobSummaryModel>;
}

interface ActiveScheduledJobOverviewDispatch {
  subscribe: (appName: string, envName: string, componentName: string) => void;
  unsubscribe: (
    appName: string,
    envName: string,
    componentName: string
  ) => void;
}

export interface ActiveScheduledJobOverviewProps
  extends ActiveScheduledJobOverviewState,
    ActiveScheduledJobOverviewDispatch {
  appName: string;
  envName: string;
  jobComponentName: string;
}

export class ActiveScheduledJobOverview extends Component<ActiveScheduledJobOverviewProps> {
  static readonly propTypes: PropTypes.ValidationMap<ActiveScheduledJobOverviewProps> =
    {
      appName: PropTypes.string.isRequired,
      envName: PropTypes.string.isRequired,
      jobComponentName: PropTypes.string.isRequired,
      environment: PropTypes.shape(
        EnvironmentModelValidationMap
      ) as PropTypes.Validator<EnvironmentModel>,
      scheduledBatches: PropTypes.arrayOf(
        PropTypes.shape(
          ScheduledBatchSummaryModelValidationMap
        ) as PropTypes.Validator<ScheduledBatchSummaryModel>
      ),
      scheduledJobs: PropTypes.arrayOf(
        PropTypes.shape(
          ScheduledJobSummaryModelValidationMap
        ) as PropTypes.Validator<ScheduledJobSummaryModel>
      ),
      subscribe: PropTypes.func.isRequired,
      unsubscribe: PropTypes.func.isRequired,
    };

  override componentDidMount() {
    this.props.subscribe(
      this.props.appName,
      this.props.envName,
      this.props.jobComponentName
    );
  }

  override componentDidUpdate(
    prevProps: Readonly<ActiveScheduledJobOverviewProps>
  ) {
    const { appName, envName, jobComponentName } = this.props;
    if (
      appName !== prevProps.appName ||
      envName !== prevProps.envName ||
      jobComponentName !== prevProps.jobComponentName
    ) {
      this.props.unsubscribe(
        prevProps.appName,
        prevProps.envName,
        prevProps.jobComponentName
      );
      this.props.subscribe(appName, envName, jobComponentName);
    }
  }

  override componentWillUnmount() {
    this.props.unsubscribe(
      this.props.appName,
      this.props.envName,
      this.props.jobComponentName
    );
  }

  override render() {
    const {
      appName,
      envName,
      jobComponentName,
      environment,
      scheduledJobs,
      scheduledBatches,
    } = this.props;
    const deployment = environment?.activeDeployment;
    const component = deployment?.components?.find(
      ({ name }) => name === jobComponentName
    );

    return (
      <>
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            { label: 'Environments', to: getEnvsUrl(appName) },
            {
              label: envName,
              to: routeWithParams(routes.appEnvironment, { appName, envName }),
            },
            { label: jobComponentName },
          ]}
        />
        <AsyncResource
          resource="ENVIRONMENT"
          resourceParams={[appName, envName]}
        >
          {component && (
            <>
              <Toolbar
                appName={appName}
                envName={envName}
                component={component}
              />
              <Overview component={component} deployment={deployment} />

              <div className="grid grid--gap-large">
                {scheduledJobs && (
                  <ScheduledJobList
                    appName={appName}
                    envName={envName}
                    jobComponentName={jobComponentName}
                    scheduledJobList={scheduledJobs}
                    totalJobCount={0}
                    isDeletable
                  />
                )}
                {scheduledBatches && (
                  <ScheduledBatchList
                    appName={appName}
                    envName={envName}
                    jobComponentName={jobComponentName}
                    scheduledBatchList={scheduledBatches}
                  />
                )}

                <ComponentReplicaList
                  title={'Job manager'}
                  appName={appName}
                  envName={envName}
                  componentName={jobComponentName}
                  replicaList={component.replicaList}
                />

                <JobComponentVulnerabilityDetails
                  appName={appName}
                  envName={envName}
                  componentName={jobComponentName}
                />

                <ActiveComponentSecrets
                  appName={appName}
                  componentName={jobComponentName}
                  envName={envName}
                  secretNames={component.secrets}
                />

                <EnvironmentVariables
                  appName={appName}
                  envName={envName}
                  componentName={jobComponentName}
                  componentType={component.type}
                  hideRadixVars
                />
              </div>
            </>
          )}
        </AsyncResource>
      </>
    );
  }
}

function mapStateToProps(state: RootState): ActiveScheduledJobOverviewState {
  return {
    environment: { ...getMemoizedEnvironment(state) },
    scheduledBatches: [...getMemoizedEnvironmentScheduledBatches(state)],
    scheduledJobs: [...getMemoizedEnvironmentScheduledJobs(state)],
  };
}

function mapDispatchToProps(
  dispatch: Dispatch
): ActiveScheduledJobOverviewDispatch {
  return {
    subscribe: (...args) => {
      const [appName, envName] = args;
      dispatch(subscribeEnvironment(appName, envName));
      dispatch(subscribeEnvironmentScheduledJobs(...args));
      dispatch(subscribeEnvironmentScheduledBatches(...args));
    },
    unsubscribe: (...args) => {
      const [appName, envName] = args;
      dispatch(unsubscribeEnvironment(appName, envName));
      dispatch(unsubscribeEnvironmentScheduledJobs(...args));
      dispatch(unsubscribeEnvironmentScheduledBatches(...args));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveScheduledJobOverview);
