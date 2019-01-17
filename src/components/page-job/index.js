import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Breadcrumb from '../breadcrumb';
import CommitHash from '../commit-hash';
import DocumentTitle from '../document-title';

import { getJob } from '../../state/job';
import { getJobStepLog } from '../../state/job-logs';
import { routeWithParams } from '../../utils/string';
import routes from '../../routes';

import {
  subscribeJob,
  subscribeJobLogs,
  unsubscribeJob,
  unsubscribeJobLogs,
} from '../../state/subscriptions/action-creators';

import { mapRouteParamsToProps } from '../../utils/routing';

export class PageApplicationJob extends React.Component {
  componentWillMount() {
    this.props.subscribe(this.props.appName, this.props.jobName);
  }

  componentDidUpdate(prevProps) {
    const { appName, jobName } = this.props;

    if (appName !== prevProps.appName || jobName !== prevProps.jobName) {
      this.props.unsubscribe(prevProps.appName, prevProps.jobName);
      this.props.subscribe(appName, jobName);
    }
  }

  componentWillUnmount() {
    this.props.unsubscribe(this.props.appName, this.props.jobName);
  }

  render() {
    const { appName, jobName, job } = this.props;

    return (
      <React.Fragment>
        <DocumentTitle title={`Job ${jobName}`} />
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            { label: 'Jobs', to: routeWithParams(routes.appJobs, { appName }) },
            { label: jobName },
          ]}
        />
        <main>
          {!job && 'No job…'}
          {job && (
            <div className="o-layout-columns">
              <section>
                <h2 className="o-heading-section">Summary</h2>
                <p>Triggered by</p>
                <p>
                  <strong>User Name</strong>
                  <CommitHash commit={job.commitID} />
                </p>
                <p>Started</p>
                <p>{job.started}</p>
                <p>Ended</p>
                <p>{job.ended} (diff)</p>
              </section>
              <section>
                <h2 className="o-heading-section">Artefacts</h2>
                {job.deployments &&
                  job.deployments.map(deployment => (
                    <p>
                      Deployment {deployment.name} to {deployment.environment}
                    </p>
                  ))}
              </section>
            </div>
          )}
        </main>
      </React.Fragment>
    );
  }
}

PageApplicationJob.propTypes = {
  appName: PropTypes.string.isRequired,
  getJobStepLog: PropTypes.func.isRequired,
  job: PropTypes.object,
  jobName: PropTypes.string.isRequired,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,

  pod: PropTypes.object,
};

const mapStateToProps = state => ({
  job: getJob(state),
  getJobStepLog: stepName => getJobStepLog(state, stepName),
});

const mapDispatchToProps = dispatch => ({
  subscribe: (...args) => {
    dispatch(subscribeJob(...args));
    dispatch(subscribeJobLogs(...args));
  },
  unsubscribe: (...args) => {
    dispatch(unsubscribeJob(...args));
    dispatch(unsubscribeJobLogs(...args));
  },
});

export default mapRouteParamsToProps(
  ['appName', 'jobName'],
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageApplicationJob)
);
