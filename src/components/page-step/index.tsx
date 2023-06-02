import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { JobStepLogs } from './job-step-logs';

import AsyncResource from '../async-resource';
import { Breadcrumb } from '../breadcrumb';
import { getJobConditionState } from '../component/job-condition-state';
import { DocumentTitle } from '../document-title';
import { PipelineRuns } from '../pipeline-runs';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { RootState } from '../../init/store';
import {
  PipelineRunModel,
  PipelineRunModelValidationMap,
} from '../../models/pipeline-run';
import {
  StepModel,
  StepModelValidationMap,
} from '../../models/radix-api/jobs/step';
import { routes } from '../../routes';
import { getStep } from '../../state/job';
import { getPipelineRuns } from '../../state/pipeline-runs';
import {
  subscribeJob,
  subscribePipelineRuns,
  unsubscribeJob,
  unsubscribePipelineRuns,
} from '../../state/subscriptions/action-creators';
import {
  getPipelineStepDescription,
  getPipelineStepTitle,
} from '../../utils/pipeline';
import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams, smallJobName } from '../../utils/string';

import './style.css';

const isStepRunning = ({ ended, started }: StepModel): boolean =>
  !ended && !!started;

export interface PagePipelineStepsSubscription {
  subscribe: (appName: string, jobName: string) => void;
  unsubscribe: (appName: string, jobName: string) => void;
}

export interface PageStepsState {
  step?: StepModel;
  pipelineRuns?: Array<PipelineRunModel>;
}

export interface PageStepsProps
  extends PagePipelineStepsSubscription,
    PageStepsState {
  appName: string;
  jobName: string;
  stepName: string;
}

export class PageStep extends Component<PageStepsProps, { now: Date }> {
  static readonly propTypes: PropTypes.ValidationMap<PageStepsProps> = {
    appName: PropTypes.string.isRequired,
    jobName: PropTypes.string.isRequired,
    step: PropTypes.shape(
      StepModelValidationMap
    ) as PropTypes.Validator<StepModel>,
    stepName: PropTypes.string.isRequired,
    pipelineRuns: PropTypes.arrayOf(
      PropTypes.shape(
        PipelineRunModelValidationMap
      ) as PropTypes.Validator<PipelineRunModel>
    ),
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
  };
  private interval: NodeJS.Timer;

  constructor(props: PageStepsProps) {
    super(props);
    this.state = { now: new Date() };
  }

  override componentDidMount() {
    const { subscribe, appName, jobName } = this.props;
    subscribe(appName, jobName);
    this.interval = setInterval(() => this.setState({ now: new Date() }), 1000);
  }

  override componentWillUnmount() {
    const { unsubscribe, appName, jobName } = this.props;
    unsubscribe(appName, jobName);
    clearInterval(this.interval);
  }

  override componentDidUpdate(prevProps: Readonly<PageStepsProps>) {
    const { subscribe, unsubscribe, appName, jobName, step } = this.props;

    if (prevProps.jobName !== jobName || prevProps.appName !== appName) {
      unsubscribe(appName, prevProps.jobName);
      subscribe(appName, jobName);
    }

    this.configureTimerInterval(step);
  }

  configureTimerInterval(step: StepModel): void {
    clearInterval(this.interval);
    if (isStepRunning(step)) {
      this.interval = setInterval(
        () => this.setState({ now: new Date() }),
        1000
      );
    }
  }

  override render() {
    const { appName, jobName, stepName, step } = this.props;
    return (
      <>
        <DocumentTitle title={stepName} />
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            {
              label: 'Pipeline Jobs',
              to: routeWithParams(routes.appJobs, { appName }),
            },
            {
              label: smallJobName(jobName),
              to: routeWithParams(routes.appJob, { appName, jobName }),
            },
            { label: getPipelineStepDescription(stepName) },
          ]}
        />
        {!step ? (
          <Typography>No step…</Typography>
        ) : (
          <>
            <section className="grid grid--gap-medium">
              <Typography variant="h4">Overview</Typography>
              <div className="grid grid--gap-medium grid--overview-columns">
                <div className="grid grid--gap-medium">
                  <Typography>
                    Pipeline Step <strong>{step.status.toLowerCase()}</strong>{' '}
                  </Typography>
                  <Typography>
                    {getJobConditionState(step.status)} Step{' '}
                    <strong>{getPipelineStepTitle(step.name)}</strong>
                  </Typography>
                </div>
                {step.started && (
                  <div className="grid grid--gap-medium">
                    <Typography>
                      Started{' '}
                      <strong>
                        <RelativeToNow time={step.started} />
                      </strong>
                    </Typography>
                    {step.ended ? (
                      <Typography>
                        Step took{' '}
                        <strong>
                          <Duration start={step.started} end={step.ended} />
                        </strong>
                      </Typography>
                    ) : (
                      <Typography>
                        Duration so far is{' '}
                        <strong>
                          <Duration start={step.started} end={this.state.now} />
                        </strong>
                      </Typography>
                    )}
                  </div>
                )}
              </div>
            </section>
            {stepName === 'run-pipelines' &&
              (this.props.pipelineRuns?.length > 0 ? (
                <section className="step-log">
                  <Typography
                    variant="h4"
                    className={`pipeline-run-header-absolute'`}
                  >
                    Environment pipelines
                  </Typography>
                  <AsyncResource
                    resource="PIPELINE_RUNS"
                    resourceParams={[appName, jobName]}
                  >
                    <PipelineRuns
                      appName={appName}
                      jobName={jobName}
                      pipelineRuns={this.props.pipelineRuns}
                    />
                  </AsyncResource>
                </section>
              ) : (
                <Typography
                  variant="h4"
                  className={`pipeline-run-header-absolute'`}
                >
                  No environment pipelines
                </Typography>
              ))}
            <section className="step-log">
              <JobStepLogs
                appName={appName}
                jobName={jobName}
                stepName={stepName}
              />
            </section>
          </>
        )}
      </>
    );
  }
}

function mapStateToProps(
  state: RootState,
  ownProps: PageStepsProps
): PageStepsState {
  return {
    step: getStep(state, ownProps.stepName),
    pipelineRuns: getPipelineRuns(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): PagePipelineStepsSubscription {
  return {
    subscribe: (appName, jobName) => {
      dispatch(subscribeJob(appName, jobName));
      dispatch(subscribePipelineRuns(appName, jobName));
    },
    unsubscribe: (appName, jobName) => {
      dispatch(unsubscribeJob(appName, jobName));
      dispatch(unsubscribePipelineRuns(appName, jobName));
    },
  };
}

export default mapRouteParamsToProps(
  ['appName', 'jobName', 'stepName'],
  connect(mapStateToProps, mapDispatchToProps)(PageStep)
);
