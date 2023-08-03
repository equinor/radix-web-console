import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { JobStepLogs } from './job-step-logs';

import AsyncResource from '../async-resource';
import { getExecutionState } from '../component/execution-state';
import { Breadcrumb } from '../breadcrumb';
import { DocumentTitle } from '../document-title';
import { PipelineRuns } from '../pipeline-runs';
import { Duration } from '../time/duration';
import { RelativeToNow } from '../time/relative-to-now';
import { RootState } from '../../init/store';
import {
  PipelineRunModel,
  PipelineRunModelValidationMap,
} from '../../models/radix-api/jobs/pipeline-run';
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

interface PagePipelineStepSubscription {
  subscribe: (appName: string, jobName: string) => void;
  unsubscribe: (appName: string, jobName: string) => void;
}

interface PageStepState {
  step?: StepModel;
  pipelineRuns?: Array<PipelineRunModel>;
}

export interface PageStepProps
  extends PagePipelineStepSubscription,
    PageStepState {
  appName: string;
  jobName: string;
  stepName: string;
}

function isStepRunning(props: Pick<StepModel, 'ended' | 'started'>): boolean {
  return !!props && !props.ended && !!props.started;
}

export class PageStep extends Component<PageStepProps, { now: Date }> {
  static readonly propTypes: PropTypes.ValidationMap<PageStepProps> = {
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

  constructor(props: PageStepProps) {
    super(props);
    this.state = { now: new Date() };
  }

  private configureTimerInterval(step: StepModel): void {
    clearInterval(this.interval);
    if (isStepRunning(step)) {
      this.interval = setInterval(
        () => this.setState({ now: new Date() }),
        1000
      );
    }
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

  override componentDidUpdate(prevProps: Readonly<PageStepProps>) {
    const { subscribe, unsubscribe, appName, jobName, step } = this.props;

    if (prevProps.jobName !== jobName || prevProps.appName !== appName) {
      unsubscribe(appName, prevProps.jobName);
      subscribe(appName, jobName);
    }

    this.configureTimerInterval(step);
  }

  override render() {
    const { appName, jobName, pipelineRuns, stepName, step } = this.props;
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
                    {getExecutionState(step.status)} Step{' '}
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
              (pipelineRuns?.length > 0 ? (
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
                    <PipelineRuns {...{ appName, jobName, pipelineRuns }} />
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
              <JobStepLogs {...{ appName, jobName, stepName }} />
            </section>
          </>
        )}
      </>
    );
  }
}

function mapStateToProps(
  state: RootState,
  { stepName }: PageStepProps
): PageStepState {
  return {
    step: getStep(state, stepName),
    pipelineRuns: getPipelineRuns(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): PagePipelineStepSubscription {
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
