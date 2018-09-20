import format from 'date-fns/format';
import React from 'react';
import { connect } from 'react-redux';

import DocumentTitle from '../document-title';
import Code from '../code';
import Panel from '../panel';
import Toggler from '../toggler';

import { getAppJob } from '../../state/applications';
import { getLog, getStatus } from '../../state/job-log';
import { jobLogRequest } from '../../state/job-log/action-creators';
import jobStatuses from '../../state/applications/job-statuses';
import requestStates from '../../state/state-utils/request-states';

import { mapRouteParamsToProps } from '../../utils/routing';

const TIME_FORMAT = 'YYYY-MM-DD HH:mm';

// TODO: This is duplicated in page-application/jobs.js
const getJobStatus = job => {
  const status = job.status;

  if (!status.completionTime) {
    return jobStatuses.BUILDING;
  } else if (status.failed) {
    return jobStatuses.FAILURE;
  } else if (status.succeeded) {
    return jobStatuses.SUCCESS;
  }

  return jobStatuses.IDLE;
};

const makeHeader = text => (
  <h3 className="o-heading-section o-heading--lean">{text}</h3>
);

export class PageApplicationJob extends React.Component {
  componentWillMount() {
    this.props.requestJobLog();
  }

  componentDidUpdate(prevProps) {
    if (this.props.job !== prevProps.job) {
      this.props.requestJobLog();
    }
  }

  render() {
    const job = this.props.job;

    if (!job) {
      return 'Loading…';
    }

    const status = job.status;

    return (
      <section>
        <DocumentTitle title={`${job.metadata.name} (job)`} />
        <h1 className="o-heading-page">Job: {job.metadata.name}</h1>
        <Panel>
          <h3 className="o-heading-section o-heading--first">Summary</h3>
          <div className="o-layout-columns">
            <div>
              <dl className="o-key-values">
                <div className="o-key-values__group">
                  <dt>Started at</dt>
                  <dd>{format(status.startTime, TIME_FORMAT)}</dd>
                </div>
                <div className="o-key-values__group">
                  <dt>Finished at</dt>
                  <dd>
                    {status.completionTime
                      ? format(status.completionTime, TIME_FORMAT)
                      : 'Pending…'}
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <dl className="o-key-values">
                <div className="o-key-values__group">
                  <dt>Status</dt>
                  <dd>{getJobStatus(job)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </Panel>

        <Panel>
          <Toggler summary={makeHeader('Logs')}>
            {this.props.logStatus === requestStates.IN_PROGRESS && (
              <p>Loading…</p>
            )}
            {this.props.logStatus === requestStates.SUCCESS && (
              <Code>{this.props.log || '<empty log>'}</Code>
            )}
          </Toggler>
        </Panel>

        <Panel>
          <Toggler summary={makeHeader('Resource')}>
            <Code>{JSON.stringify(job, null, 2)}</Code>
          </Toggler>
        </Panel>
      </section>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  job: getAppJob(state, ownProps.appName, ownProps.jobName),
  log: getLog(state),
  logStatus: getStatus(state),
});

const mapDispatchToProps = dispatch => ({
  requestJobLog: job => dispatch(jobLogRequest(job)),
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  requestJobLog: () =>
    stateProps.job && dispatchProps.requestJobLog(stateProps.job),
});

export default mapRouteParamsToProps(
  ['appName', 'jobName'],
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(PageApplicationJob)
);
