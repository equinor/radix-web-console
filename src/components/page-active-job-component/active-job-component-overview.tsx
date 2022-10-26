import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { JobComponentVulnerabilityDetails } from './job-component-vulnerability-details';
import { Overview } from './overview';
import Toolbar from '../component/toolbar';
import AsyncResource from '../async-resource';
import { Breadcrumb } from '../breadcrumb';
import ActiveComponentSecrets from '../component/secrets/active-component-secrets';
import { ScheduledBatchList } from '../component/scheduled-batch-list';
import { ScheduledJobList } from '../component/scheduled-job-list';
import { EnvironmentVariables } from '../environment-variables';
import { RootState } from '../../init/store';
import {
  ComponentModel,
  ComponentModelValidationMap,
} from '../../models/component';
import {
  ScheduledBatchSummaryModel,
  ScheduledBatchSummaryModelValidationMap,
} from '../../models/scheduled-batch-summary';
import {
  ScheduledJobSummaryModel,
  ScheduledJobSummaryModelValidationMap,
} from '../../models/scheduled-job-summary';
import { routes } from '../../routes';
import { getComponent } from '../../state/environment';
import { getMemoizedEnvironmentScheduledBatches } from '../../state/environment-scheduled-batches';
import { getMemoizedEnvironmentScheduledJobs } from '../../state/environment-scheduled-jobs';
import {
  subscribeApplication,
  subscribeEnvironment,
  subscribeEnvironmentScheduledBatches,
  subscribeEnvironmentScheduledJobs,
  unsubscribeApplication,
  unsubscribeEnvironment,
  unsubscribeEnvironmentScheduledBatches,
  unsubscribeEnvironmentScheduledJobs,
} from '../../state/subscriptions/action-creators';
import { getEnvsUrl } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';

interface ActiveScheduledJobOverviewState {
  component?: ComponentModel;
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

interface ActiveScheduledJobOverviewData {
  appName: string;
  envName: string;
  jobComponentName: string;
}

export interface ActiveScheduledJobOverviewProps
  extends ActiveScheduledJobOverviewState,
    ActiveScheduledJobOverviewDispatch,
    ActiveScheduledJobOverviewData {}

export class ActiveScheduledJobOverview extends Component<ActiveScheduledJobOverviewProps> {
  static readonly propTypes: PropTypes.ValidationMap<ActiveScheduledJobOverviewProps> =
    {
      appName: PropTypes.string.isRequired,
      envName: PropTypes.string.isRequired,
      jobComponentName: PropTypes.string.isRequired,
      component: PropTypes.shape(
        ComponentModelValidationMap
      ) as PropTypes.Validator<ComponentModel>,
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
      component,
      scheduledJobs,
      scheduledBatches,
    } = this.props;
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
                startEnabled={false}
                stopEnabled={false}
              />
              <Overview component={component} />
              <JobComponentVulnerabilityDetails
                appName={appName}
                envName={envName}
                componentName={jobComponentName}
              />
              <div className="grid grid--gap-medium">
                <EnvironmentVariables
                  appName={appName}
                  envName={envName}
                  componentName={jobComponentName}
                  componentType={component.type}
                  hideRadixVars
                />
              </div>
              {scheduledJobs && (
                <div className="grid grid--gap-medium">
                  <ScheduledJobList
                    appName={appName}
                    envName={envName}
                    jobComponentName={jobComponentName}
                    scheduledJobList={scheduledJobs}
                    totalJobCount={0}
                    isExpanded={false}
                  />
                </div>
              )}
              {scheduledBatches && (
                <div className="grid grid--gap-medium">
                  <ScheduledBatchList
                    appName={appName}
                    envName={envName}
                    jobComponentName={jobComponentName}
                    scheduledBatchList={scheduledBatches}
                    isExpanded={false}
                  />
                </div>
              )}
              <div className="grid grid--gap-medium">
                <ActiveComponentSecrets
                  appName={appName}
                  componentName={jobComponentName}
                  envName={envName}
                  secretNames={component.secrets}
                />
              </div>
            </>
          )}
        </AsyncResource>
      </>
    );
  }
}

function mapStateToProps(
  state: RootState,
  { jobComponentName }: ActiveScheduledJobOverviewData
): ActiveScheduledJobOverviewState {
  return {
    component: getComponent(state, jobComponentName),
    scheduledBatches: [...getMemoizedEnvironmentScheduledBatches(state)],
    scheduledJobs: [...getMemoizedEnvironmentScheduledJobs(state)],
  };
}

function mapDispatchToProps(
  dispatch: Dispatch
): ActiveScheduledJobOverviewDispatch {
  return {
    subscribe: function (appName, envName, jobComponentName) {
      dispatch(subscribeEnvironment(appName, envName));
      dispatch(subscribeApplication(appName));
      dispatch(
        subscribeEnvironmentScheduledJobs(appName, envName, jobComponentName)
      );
      dispatch(
        subscribeEnvironmentScheduledBatches(appName, envName, jobComponentName)
      );
    },
    unsubscribe: function (appName, envName, jobComponentName) {
      dispatch(unsubscribeEnvironment(appName, envName));
      dispatch(unsubscribeApplication(appName));
      dispatch(
        unsubscribeEnvironmentScheduledJobs(appName, envName, jobComponentName)
      );
      dispatch(
        unsubscribeEnvironmentScheduledBatches(
          appName,
          envName,
          jobComponentName
        )
      );
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveScheduledJobOverview);
