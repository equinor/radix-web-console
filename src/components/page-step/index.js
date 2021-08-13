import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Code from '../code';
import DocumentTitle from '../document-title';
import Duration from '../time/duration';
import RelativeToNow from '../time/relative-to-now';
import AsyncResource from '../async-resource';
import ScanOutput from './scan-output';

import { getJobStepLog } from '../../state/job-logs';
import { getStep } from '../../state/job';
import stepModel from '../../models/step';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import { ScanStatusEnum } from '../../models/scan-status';
import { routeWithParams, smallJobName } from '../../utils/string';
import { mapRouteParamsToProps } from '../../utils/routing';
import routes from '../../routes';
import { Typography } from '@equinor/eds-core-react';
import Breadcrumb from '../breadcrumb';
import './style.css';

const isStepRunning = (step) => {
  return step && !step.ended && step.started;
};

export class PageStep extends React.Component {
  constructor() {
    super();
    this.state = { now: new Date() };
  }

  componentDidMount() {
    const { subscribe, appName, jobName } = this.props;
    subscribe(appName, jobName);
    this.interval = setInterval(() => this.setState({ now: new Date() }), 1000);
  }

  componentWillUnmount() {
    const { unsubscribe, appName, jobName } = this.props;
    unsubscribe(appName, jobName);
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps) {
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

  render() {
    const { appName, jobName, stepLog, stepName, step } = this.props;
    return (
      <div className="o-layout-constrained">
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
        <main className="o-layout-content">
          {!step && 'No step…'}
          {step && (
            <React.Fragment>
              <div className="step-overview">
                <Typography variant="h4">Overview</Typography>
                <span>
                  <Typography variant="body_long">
                    Step {step.status.toLowerCase()}
                  </Typography>
                </span>
                <span>
                  {step.started && (
                    <Typography variant="body_long">
                      Started{' '}
                      <strong>
                        <RelativeToNow time={step.started} />
                      </strong>
                    </Typography>
                  )}
                  {step.ended && (
                    <Typography variant="body_long">
                      Step took{' '}
                      <strong>
                        <Duration start={step.started} end={step.ended} />
                      </strong>
                    </Typography>
                  )}
                  {isStepRunning(step) && (
                    <Typography variant="body_long">
                      Duration so far is{' '}
                      <strong>
                        <Duration start={step.started} end={this.state.now} />
                      </strong>
                    </Typography>
                  )}
                </span>
              </div>
              {step.scan && step.scan.status === ScanStatusEnum.SUCCESS && (
                <div className="scan-output">
                  <Typography variant="h4">Vulnerabilities</Typography>
                  <ScanOutput
                    appName={appName}
                    jobName={jobName}
                    stepName={step.name}
                  ></ScanOutput>
                </div>
              )}
              <div className="step-log">
                <Typography variant="h4">Log</Typography>
                <AsyncResource
                  resource="JOB_LOGS"
                  resourceParams={[appName, jobName]}
                >
                  {!stepLog && 'No logs…'}
                  {stepLog && (
                    <React.Fragment>
                      <Code copy download filename={appName + '_' + jobName}>
                        {stepLog.replace(/\r/gi, '\n')}
                      </Code>
                    </React.Fragment>
                  )}
                </AsyncResource>
              </div>
            </React.Fragment>
          )}
        </main>
      </div>
    );
  }
}

PageStep.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  step: PropTypes.exact(stepModel),
  stepName: PropTypes.string.isRequired,
  stepLog: PropTypes.string,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  step: getStep(state, ownProps.stepName),
  stepLog: getJobStepLog(state, ownProps.stepName),
});

const mapDispatchToProps = (dispatch) => ({
  subscribe: (appName, jobName) => {
    dispatch(subscriptionActions.subscribeJob(appName, jobName));
    dispatch(subscriptionActions.subscribeJobLogs(appName, jobName));
  },
  unsubscribe: (appName, jobName) => {
    dispatch(subscriptionActions.unsubscribeJob(appName, jobName));
    dispatch(subscriptionActions.unsubscribeJobLogs(appName, jobName));
  },
});

export default mapRouteParamsToProps(
  ['appName', 'jobName', 'stepName'],
  connect(mapStateToProps, mapDispatchToProps)(PageStep)
);
