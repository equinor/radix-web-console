import { Button, Icon } from '@equinor/eds-core-react';
import { add } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';

import ApplicationAlerting from './application-alerting';

import AsyncResource from '../async-resource';
import { Breadcrumb } from '../breadcrumb';
import { DocumentTitle } from '../document-title';
import { JobsList } from '../jobs-list';
import { RootState } from '../../init/store';
import {
  JobSummaryModel,
  JobSummaryModelValidationMap,
} from '../../models/job-summary';
import { routes } from '../../routes';
import { getMemoizedJobs } from '../../state/jobs';
import {
  subscribeJobs,
  unsubscribeJobs,
} from '../../state/subscriptions/action-creators';
import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';

import './style.css';

interface PipelinePageJobsDispatch {
  subscribeJobs: (appName: string) => void;
  unsubscribeJobs: (appName: string) => void;
}

interface PipelinePageJobsState {
  jobs: Array<JobSummaryModel>;
}

export interface PipelinePageJobsProps
  extends PipelinePageJobsDispatch,
    PipelinePageJobsState {
  appName: string;
}

class PipelinePageJobs extends Component<PipelinePageJobsProps> {
  static readonly propTypes: PropTypes.ValidationMap<PipelinePageJobsProps> = {
    appName: PropTypes.string.isRequired,
    jobs: PropTypes.arrayOf(
      PropTypes.shape(
        JobSummaryModelValidationMap
      ) as PropTypes.Validator<JobSummaryModel>
    ).isRequired,
  };

  override componentDidMount() {
    this.props.subscribeJobs(this.props.appName);
  }

  override componentWillUnmount() {
    this.props.unsubscribeJobs(this.props.appName);
  }

  override componentDidUpdate(prevProps: Readonly<PipelinePageJobsProps>) {
    const { appName, subscribeJobs, unsubscribeJobs } = this.props;
    if (prevProps.appName !== appName) {
      unsubscribeJobs(appName);
      subscribeJobs(appName);
    }
  }

  override render() {
    const { appName, jobs } = this.props;
    return (
      <>
        <DocumentTitle title={`${appName} pipeline jobs`} />
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            { label: 'Pipeline Jobs' },
          ]}
        />
        <main className="grid grid--gap-medium">
          <div className="pipeline-job-actions">
            <div>
              <Link to={routeWithParams(routes.appJobNew, { appName })}>
                <Button variant="ghost">
                  <Icon data={add} size={24} />
                  Create new
                </Button>
              </Link>
            </div>
            <div className="pipeline-job-action__action--justify-end">
              <ApplicationAlerting appName={appName} />
            </div>
          </div>
          <AsyncResource resource="JOBS" resourceParams={[appName]}>
            <JobsList jobs={jobs} appName={appName} />
          </AsyncResource>
        </main>
      </>
    );
  }
}

function mapStateToProps(state: RootState): PipelinePageJobsState {
  return { jobs: getMemoizedJobs(state) };
}

function mapDispatchToProps(dispatch: Dispatch): PipelinePageJobsDispatch {
  return {
    subscribeJobs: (appName) => dispatch(subscribeJobs(appName)),
    unsubscribeJobs: (appName) => dispatch(unsubscribeJobs(appName)),
  };
}

export default mapRouteParamsToProps(
  ['appName'],
  connect(mapStateToProps, mapDispatchToProps)(PipelinePageJobs)
);
