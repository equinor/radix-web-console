import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Breadcrumb from '../breadcrumb';
import Code from '../code';
import DocumentTitle from '../document-title';
import Duration from '../time/duration';
import RelativeToNow from '../time/relative-to-now';

import { getJobStepLog } from '../../state/job-logs';
import { getStep } from '../../state/job';
import * as subscriptionActions from '../../state/subscriptions/action-creators';

import { routeWithParams, smallJobName } from '../../utils/string';
import { mapRouteParamsToProps } from '../../utils/routing';
import routes from '../../routes';

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
    const { subscribe, unsubscribe, appName, jobName } = this.props;

    if (prevProps.jobName !== jobName || prevProps.appName !== appName) {
      unsubscribe(appName, prevProps.jobName);
      subscribe(appName, jobName);
    }
  }

  render() {
    const { appName, jobName, stepLog, stepName, step } = this.props;
    return (
      <React.Fragment>
        <DocumentTitle title={stepName} />
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            { label: 'Jobs', to: routeWithParams(routes.appJobs, { appName }) },
            {
              label: smallJobName(jobName),
              to: routeWithParams(routes.appJob, { appName, jobName }),
            },
            { label: stepName },
          ]}
        />
        <main>
          {!step && 'No step…'}
          {step && (
            <React.Fragment>
              <h2 className="o-heading-section">Summary</h2>
              <p>Step {step.status.toLowerCase()}</p>
              <p>
                Started{' '}
                <strong>
                  <RelativeToNow time={step.started} />
                </strong>
              </p>
              {step.ended && (
                <p>
                  Step took{' '}
                  <strong>
                    <Duration start={step.started} end={step.ended} />
                  </strong>
                </p>
              )}
              {!step.ended && (
                <p>
                  Duration so far is{' '}
                  <strong>
                    <Duration start={step.started} end={this.state.now} />
                  </strong>
                </p>
              )}
              {stepLog && (
                <React.Fragment>
                  <h2 className="o-heading-section">Log</h2>
                  <Code copy>{stepLog.replace(/\r/gi, '\n')}</Code>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </main>
      </React.Fragment>
    );
  }
}

PageStep.propTypes = {
  appName: PropTypes.string.isRequired,
  jobName: PropTypes.string.isRequired,
  stepName: PropTypes.string.isRequired,
  stepLog: PropTypes.string,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
  // TODO step: PropTypes.shape(),
};

const mapStateToProps = (state, ownProps) => ({
  step: getStep(state, ownProps.stepName),
  stepLog: getJobStepLog(state, ownProps.stepName),
});

const mapDispatchToProps = dispatch => ({
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageStep)
);
