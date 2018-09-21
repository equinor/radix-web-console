import { connect } from 'react-redux';
import AnsiUp from 'ansi_up';
import format from 'date-fns/format';
import React from 'react';

import Button from '../button';
import Code from '../code';
import DocumentTitle from '../document-title';
import Panel from '../panel';
import Toggler from '../toggler';

import {
  getAppJob,
  getAppComponents,
  getApplication,
} from '../../state/applications';
import {
  jobLogsRequest,
  jobLogsReset,
} from '../../state/job-log/action-creators';
import { getLogs, getLogsStatus, getLogsError } from '../../state/job-log';
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
    if (this.props.job !== prevProps.job || this.props.app !== prevProps.app) {
      this.props.requestJobLog();
    }
  }

  render() {
    const job = this.props.job;

    if (!job) {
      return 'Loading…';
    }

    const status = job.status;
    const getFormattedLog = log => {
      return {
        __html: new AnsiUp().ansi_to_html(log),
      };
    };

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
                <div className="o-key-values__group">
                  <dt>Logs</dt>
                  <dd>
                    {this.props.logsStatus === requestStates.IN_PROGRESS &&
                      'Loading…'}
                    {this.props.logsStatus === requestStates.SUCCESS &&
                      'Loaded'}
                    {this.props.logsStatus === requestStates.FAILURE &&
                      `Failed: ${this.props.logsError}`}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="o-layout-toolbar align-right">
            <Button
              btnType={['default', 'tiny']}
              disabled={this.props.logsStatus === requestStates.IN_PROGRESS}
              onClick={this.props.requestJobLog}
            >
              Refresh logs
            </Button>
          </div>
        </Panel>

        {this.props.logs &&
          Object.keys(this.props.logs).map(logKey => (
            <Panel key={logKey}>
              <Toggler summary={makeHeader(`Log: ${logKey}`)}>
                <Code>
                  <div
                    dangerouslySetInnerHTML={getFormattedLog(
                      this.props.logs[logKey]
                    )}
                  />
                </Code>
              </Toggler>
            </Panel>
          ))}

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
  app: getApplication(state, ownProps.appName),
  job: getAppJob(state, ownProps.appName, ownProps.jobName),
  logs: getLogs(state),
  logsError: getLogsError(state),
  logsStatus: getLogsStatus(state),
  components: getAppComponents(state, ownProps.appName).map(comp => comp.name),
});

const mapDispatchToProps = dispatch => ({
  requestJobLog: (job, components) =>
    dispatch(jobLogsReset()) && dispatch(jobLogsRequest(job, components)),
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  requestJobLog: () =>
    stateProps.job &&
    dispatchProps.requestJobLog(stateProps.job, stateProps.components),
});

export default mapRouteParamsToProps(
  ['appName', 'jobName'],
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(PageApplicationJob)
);
