import { Typography } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import ScanOutput from './scan-output';
import AsyncResource from '../async-resource';
import Breadcrumb from '../breadcrumb';
import Code from '../code';
import DocumentTitle from '../document-title';
import Duration from '../time/duration';
import RelativeToNow from '../time/relative-to-now';
import { ScanStatusEnum } from '../../models/scan-status';
import stepModel from '../../models/step';
import routes from '../../routes';
import { getStep } from '../../state/job';
import { getJobStepLog } from '../../state/job-logs';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams, smallJobName } from '../../utils/string';

import './style.css';

const isStepRunning = (step) => step && !step.ended && step.started;

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
        {!step ? (
          <Typography>No step…</Typography>
        ) : (
          <>
            <section className="grid grid--gap-medium">
              <Typography variant="h4">Overview</Typography>
              <div className="grid grid--gap-medium grid--overview-columns">
                <div className="grid grid--gap-medium">
                  <Typography>Step {step.status.toLowerCase()}</Typography>
                  {step.started && (
                    <Typography>
                      Started{' '}
                      <strong>
                        <RelativeToNow time={step.started} />
                      </strong>
                    </Typography>
                  )}
                </div>
                <div className="grid grid--gap-medium">
                  {step.ended && (
                    <Typography>
                      Step took{' '}
                      <strong>
                        <Duration start={step.started} end={step.ended} />
                      </strong>
                    </Typography>
                  )}
                  {isStepRunning(step) && (
                    <Typography>
                      Duration so far is{' '}
                      <strong>
                        <Duration start={step.started} end={this.state.now} />
                      </strong>
                    </Typography>
                  )}
                </div>
              </div>
            </section>
            {step.scan && step.scan.status === ScanStatusEnum.SUCCESS && (
              <section className="grid grid--gap-medium">
                <Typography variant="h4">Vulnerabilities</Typography>
                <ScanOutput
                  appName={appName}
                  jobName={jobName}
                  stepName={step.name}
                ></ScanOutput>
              </section>
            )}
            <section className="step-log">
              <Typography variant="h4">Log</Typography>
              <AsyncResource
                resource="JOB_LOGS"
                resourceParams={[appName, jobName]}
              >
                {!stepLog ? (
                  <Typography>No logs</Typography>
                ) : (
                  <Code
                    copy
                    download
                    filename={`${appName}_${jobName}`}
                    autoscroll
                    resizable
                  >
                    {stepLog.replace(/\r/gi, '\n')}
                  </Code>
                )}
              </AsyncResource>
            </section>
          </>
        )}
      </>
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
