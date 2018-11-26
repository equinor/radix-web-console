import { connect } from 'react-redux';
import AnsiUp from 'ansi_up';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import React from 'react';

import Code from '../code';
import DocumentTitle from '../document-title';
import Panel from '../panel';
import Toggler from '../toggler';

import { getJob } from '../../state/job';
import { getJobStepLog } from '../../state/job-logs';
import { getAppComponents } from '../../state/applications';

import {
  subscribeJob,
  subscribeJobLogs,
  unsubscribeJob,
  unsubscribeJobLogs,
} from '../../state/subscriptions/action-creators';

import { mapRouteParamsToProps } from '../../utils/routing';

const TIME_FORMAT = 'YYYY-MM-DD HH:mm';

const makeHeader = text => (
  <h3 className="o-heading-section o-heading--lean">{text}</h3>
);

export class PageApplicationJob extends React.Component {
  // TODO: combine subscribers/unsubscribers in mapDispatchToProps()

  componentWillMount() {
    const { appName, jobName } = this.props;

    this.props.subscribeJob(appName, jobName);
    this.props.subscribeJobLogs(appName, jobName);
  }

  componentDidUpdate(prevProps) {
    const { appName, jobName } = this.props;

    if (appName !== prevProps.appName || jobName !== prevProps.jobName) {
      this.props.unsubscribeJob(prevProps.appName, prevProps.jobName);
      this.props.unsubscribeJobLogs(prevProps.appName, prevProps.jobName);

      this.props.subscribeJob(appName, jobName);
      this.props.subscribeJobLogs(appName, jobName);
    }
  }

  componentWillUnmount() {
    const { appName, jobName } = this.props;

    this.props.unsubscribeJob(appName, jobName);
    this.props.unsubscribeJobLogs(appName, jobName);
  }

  render() {
    const job = this.props.job;

    if (!job) {
      return 'Loading…';
    }

    const getFormattedLog = log => {
      return {
        __html: new AnsiUp().ansi_to_html(log),
      };
    };

    return (
      <section>
        <DocumentTitle title={`${job.name} (job)`} />
        <h1 className="o-heading-page">Job: {job.name}</h1>
        <Panel>
          <h3 className="o-heading-section o-heading--first">Summary</h3>
          <div className="o-layout-columns">
            <div>
              <dl className="o-key-values">
                <div className="o-key-values__group">
                  <dt>Started at</dt>
                  <dd>{format(job.started, TIME_FORMAT)}</dd>
                </div>
                <div className="o-key-values__group">
                  <dt>Finished at</dt>
                  <dd>
                    {job.ended ? format(job.ended, TIME_FORMAT) : 'Pending…'}
                  </dd>
                </div>
              </dl>
            </div>
            <div>
              <dl className="o-key-values">
                <div className="o-key-values__group">
                  <dt>Status</dt>
                  <dd>{job.status}</dd>
                </div>
              </dl>
            </div>
          </div>
        </Panel>

        {this.props.job.steps.map(step => (
          <Panel key={step.name}>
            <Toggler summary={makeHeader(`Log: ${step.name}`)}>
              <Code>
                <div
                  dangerouslySetInnerHTML={getFormattedLog(
                    this.props.getJobStepLog(step.name)
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

PageApplicationJob.propTypes = {
  appName: PropTypes.string.isRequired,
  getJobStepLog: PropTypes.func.isRequired,
  job: PropTypes.object,
  jobName: PropTypes.string.isRequired,
  subscribeJob: PropTypes.func.isRequired,
  subscribeJobLogs: PropTypes.func.isRequired,
  unsubscribeJob: PropTypes.func.isRequired,
  unsubscribeJobLogs: PropTypes.func.isRequired,

  pod: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  job: getJob(state),
  getJobStepLog: stepName => getJobStepLog(state, stepName),
  components: getAppComponents(state, ownProps.appName).map(comp => comp.name),
});

const mapDispatchToProps = dispatch => ({
  subscribeJob: (...args) => dispatch(subscribeJob(...args)),
  unsubscribeJob: (...args) => dispatch(unsubscribeJob(...args)),

  subscribeJobLogs: (...args) => dispatch(subscribeJobLogs(...args)),
  unsubscribeJobLogs: (...args) => dispatch(unsubscribeJobLogs(...args)),
});

export default mapRouteParamsToProps(
  ['appName', 'jobName'],
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageApplicationJob)
);
