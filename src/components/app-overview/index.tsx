import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { DefaultAppAlias, DefaultAppAliasProps } from './default-app-alias';

import ApplicationCost from '../application-cost';
import { FutureApplicationCost } from '../application-future-cost';
import AsyncResource from '../async-resource';
import { EnvironmentsSummary } from '../environments-summary';
import { JobsList } from '../jobs-list';
import {
  EnvironmentSummaryModel,
  EnvironmentSummaryModelValidationMap,
} from '../../models/environment-summary';
import {
  JobSummaryModel,
  JobSummaryModelValidationMap,
} from '../../models/job-summary';
import {
  getAppAlias,
  getEnvironmentSummaries,
  getJobs,
} from '../../state/application';
import {
  subscribeApplication,
  unsubscribeApplication,
} from '../../state/subscriptions/action-creators';

import './style.css';
import { RootState } from '../../init/store';

const LATEST_JOBS_LIMIT: number = 5;

interface AppOverviewDispatch {
  subscribeApplication: (appName: string) => void;
  unsubscribeApplication: (appName: string) => void;
}

interface AppOverviewState extends Pick<DefaultAppAliasProps, 'appAlias'> {
  envs: Array<EnvironmentSummaryModel>;
  jobs: Array<JobSummaryModel>;
}

export interface AppOverviewProps
  extends AppOverviewDispatch,
    AppOverviewState {
  appName: string;
}

export class AppOverview extends Component<AppOverviewProps> {
  static readonly propTypes: PropTypes.ValidationMap<AppOverviewProps> = {
    appName: PropTypes.string.isRequired,
    appAlias: PropTypes.exact({
      componentName: PropTypes.string.isRequired,
      environmentName: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
    envs: PropTypes.arrayOf(
      PropTypes.shape(
        EnvironmentSummaryModelValidationMap
      ) as PropTypes.Validator<EnvironmentSummaryModel>
    ).isRequired,
    jobs: PropTypes.arrayOf(
      PropTypes.shape(
        JobSummaryModelValidationMap
      ) as PropTypes.Validator<JobSummaryModel>
    ).isRequired,
    subscribeApplication: PropTypes.func.isRequired,
    unsubscribeApplication: PropTypes.func.isRequired,
  };

  constructor(props: AppOverviewProps) {
    super(props);
    props.subscribeApplication(this.props.appName);
  }

  override componentWillUnmount() {
    this.props.unsubscribeApplication(this.props.appName);
  }

  override componentDidUpdate(prevProps: Readonly<AppOverviewProps>) {
    const { appName } = this.props;

    if (appName !== prevProps.appName) {
      this.props.unsubscribeApplication(prevProps.appName);
      this.props.subscribeApplication(appName);
    }
  }

  override render() {
    const { appAlias, appName, envs, jobs } = this.props;
    return (
      <div className="app-overview">
        <main className="grid grid--gap-medium">
          <AsyncResource resource="APP" resourceParams={[appName]}>
            <div className="grid grid--gap-medium grid--overview-columns">
              <div className="grid grid--gap-medium">
                <ApplicationCost appName={appName} />
              </div>
              <div className="grid grid--gap-medium">
                <FutureApplicationCost appName={appName} />
              </div>
            </div>
            {appAlias && (
              <DefaultAppAlias appName={appName} appAlias={appAlias} />
            )}

            {envs.length > 0 && (
              <Typography variant="h4">Environments</Typography>
            )}
            <EnvironmentsSummary appName={appName} envs={envs} />

            {jobs.length > 0 && (
              <Typography variant="h4">Latest pipeline jobs</Typography>
            )}
            <JobsList jobs={jobs} appName={appName} limit={LATEST_JOBS_LIMIT} />
          </AsyncResource>
        </main>
      </div>
    );
  }
}

function mapStateToProps(state: RootState): AppOverviewState {
  return {
    appAlias: getAppAlias(state),
    envs: getEnvironmentSummaries(state),
    jobs: getJobs(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): AppOverviewDispatch {
  return {
    subscribeApplication: (appName) => dispatch(subscribeApplication(appName)),
    unsubscribeApplication: (appName) =>
      dispatch(unsubscribeApplication(appName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppOverview);
