import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { mapRouteParamsToProps } from '../../utils/routing';
import { connect } from 'react-redux';

import { Breadcrumb } from '../breadcrumb';
import DocumentTitle from '../document-title';
import { routes } from '../../routes';
import { getStep } from '../../state/job';
import { getJobStepLog } from '../../state/job-logs';
import {
  subscribeJob,
  subscribeJobLogs,
  unsubscribeJob,
  unsubscribeJobLogs,
} from '../../state/subscriptions/action-creators';
import { routeWithParams, smallJobName } from '../../utils/string';

import './style.css';
import { Dispatch } from 'redux';
import { RootState } from '../../init/store';
import AsyncResource from '../async-resource';
import ScanOutput from './scan-output';
import { ScanStatus } from '../../models/scan-status';
import { Code } from '../code';
import { StepModel, StepModelValidationMap } from '../../models/step';

const isStepRunning = (step: any) => step && !step.ended && step.started;

export interface PagePipelineStepsSubscription {
  subscribe: (props: string, string) => void;
  unsubscribe: (props: string, string) => void;
}

export interface PageStepsProps extends PagePipelineStepsSubscription {
  appName: string;
  jobName: string;
  step: any;
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
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
  };

  private interval;

  constructor(props: PageStepsProps) {
    // console.log(props);
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

  override componentDidUpdate(prevProps: PageStepsProps) {
    const { subscribe, unsubscribe, appName, jobName, step } = this.props;

    if (prevProps.jobName !== jobName || prevProps.appName !== appName) {
      unsubscribe(appName, prevProps.jobName);
      subscribe(appName, jobName);
    }

    this.configureTimerInterval(step);
  }

  configureTimerInterval(step) {
    clearInterval(this.interval);
    if (isStepRunning(step)) {
      this.interval = setInterval(
        () => this.setState({ now: new Date() }),
        1000
      );
    }
  }

  override render() {
    const { appName, jobName, stepName } = this.props;
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
            { label: stepName },
          ]}
        />
        {!this.props.step ? (
          <Typography>No step…</Typography>
        ) : (
          <>
            <section className="grid grid--gap-medium">
              <Typography variant="h4">Overview</Typography>
              <div className="grid grid--gap-medium grid--overview-columns"></div>
            </section>
            {this.props.step.scan &&
              this.props.step.scan.status === ScanStatus.Success && (
                <section className="grid grid--gap-medium">
                  <Typography variant="h4">Vulnerabilities</Typography>
                  <ScanOutput
                    appName={this.props.appName}
                    jobName={this.props.jobName}
                    stepName={this.props.step.name}
                  />
                </section>
              )}
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
  // console.log(ownProps);
  return {
    step: getStep(state, ownProps.stepName),
    stepLog: getJobStepLog(state, ownProps.stepName),
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch
): PagePipelineStepsSubscription => ({
  subscribe: (appName, jobName) => {
    dispatch(subscribeJob(appName, jobName));
    dispatch(subscribeJobLogs(appName, jobName));
  },
  unsubscribe: (appName, jobName) => {
    dispatch(unsubscribeJob(appName, jobName));
    dispatch(unsubscribeJobLogs(appName, jobName));
  },
});

export default mapRouteParamsToProps(
  ['appName', 'jobName', 'stepName'],
  connect(mapStateToProps, mapDispatchToProps)(PageStep)
);
