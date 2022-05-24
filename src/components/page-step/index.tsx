import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { mapRouteParamsToProps } from '../../utils/routing';
import { connect } from 'react-redux';

import { Breadcrumb } from '../breadcrumb';
import { DocumentTitle } from '../document-title';
import { routes } from '../../routes';
import {
  subscribeJob,
  subscribeJobLogs,
  subscribePipelineRuns,
  unsubscribeJob,
  unsubscribeJobLogs,
  unsubscribePipelineRuns,
} from '../../state/subscriptions/action-creators';
import { routeWithParams, smallJobName } from '../../utils/string';

import './style.css';
import { Dispatch } from 'redux';
import { RootState } from '../../init/store';
import AsyncResource from '../async-resource';
import { ScanOutput } from './scan-output';
import { ScanStatus } from '../../models/scan-status';
import { Code } from '../code';
import { StepModel, StepModelValidationMap } from '../../models/step';
import { PipelineRuns } from '../pipeline-runs';
import { getPipelineRuns } from '../../state/pipeline-runs';
import {
  PipelineRunModel,
  PipelineRunModelValidationMap,
} from '../../models/pipeline-run';
import {
  getPipelineStepDescription,
  getPipelineStepTitle,
} from '../../utils/pipeline';
import RelativeToNow from '../time/relative-to-now';
import Duration from '../time/duration';
import { getJobConditionState } from '../component/job-condition-state';
import { getStep } from '../../state/job';
import { getJobStepLog } from '../../state/job-logs';

const isStepRunning = (step: StepModel): boolean => step && !step.ended && !!step.started;

export interface PagePipelineStepsSubscription {
  subscribe: (appName: string, jobName: string) => void;
  unsubscribe: (appName: string, jobName: string) => void;
}

export interface PageStepsProps extends PagePipelineStepsSubscription {
  appName: string;
  jobName: string;
  step: StepModel;
  pipelineRuns: Array<PipelineRunModel>;
  stepName: string;
  stepLog?: string;
}

export class PageStep extends Component<PageStepsProps, { now: Date }> {
  static readonly propTypes: PropTypes.ValidationMap<PageStepsProps> = {
    appName: PropTypes.string.isRequired,
    jobName: PropTypes.string.isRequired,
    step: PropTypes.shape(
      StepModelValidationMap
    ) as PropTypes.Requireable<StepModel>,
    stepName: PropTypes.string.isRequired,
    stepLog: PropTypes.string,
    pipelineRuns: PropTypes.arrayOf(
      PropTypes.shape(
        PipelineRunModelValidationMap
      ) as PropTypes.Validator<PipelineRunModel>
    ),
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
  };
  private interval;

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
            {this.props.step.scan &&
              this.props.step.scan.status === ScanStatus.Success && (
                <section className="grid grid--gap-medium">
                  <Typography variant="h4">Vulnerabilities</Typography>
                  <ScanOutput
                    appName={appName}
                    jobName={jobName}
                    stepName={step.name}
                  />
                </section>
              )}
            {this.props.stepName === 'run-pipelines' &&
              (this.props.pipelineRuns && this.props.pipelineRuns.length > 0 ? (
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
                    ></PipelineRuns>
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
              <Typography
                variant="h4"
                className={`step-log-header${
                  this.props.stepLog ? '-absolute' : ''
                }`}
              >
                Log
              </Typography>
              <AsyncResource
                resource="JOB_LOGS"
                resourceParams={[appName, jobName]}
              >
                {this.props.stepLog ? (
                  <Code
                    copy
                    download
                    filename={`${appName}_${jobName}`}
                    autoscroll
                    resizable
                  >
                    {this.props.stepLog.replace(/\r/gi, '\n')}
                  </Code>
                ) : (
                  <Typography>No logs</Typography>
                )}
              </AsyncResource>
            </section>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: PageStepsProps) => {
  return {
    step: getStep(state, ownProps.stepName),
    stepLog: getJobStepLog(state, ownProps.stepName),
    pipelineRuns: getPipelineRuns(state),
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch
): PagePipelineStepsSubscription => ({
  subscribe: (appName, jobName) => {
    dispatch(subscribeJob(appName, jobName));
    dispatch(subscribeJobLogs(appName, jobName));
    dispatch(subscribePipelineRuns(appName, jobName));
  },
  unsubscribe: (appName, jobName) => {
    dispatch(unsubscribeJob(appName, jobName));
    dispatch(unsubscribeJobLogs(appName, jobName));
    dispatch(unsubscribePipelineRuns(appName, jobName));
  },
});

export default mapRouteParamsToProps(
  ['appName', 'jobName', 'stepName'],
  connect(mapStateToProps, mapDispatchToProps)(PageStep)
);
