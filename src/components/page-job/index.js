import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import distanceInWords from 'date-fns/distance_in_words';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import format from 'date-fns/format';
import get from 'lodash/get';
import isToday from 'date-fns/is_today';
import isYesterday from 'date-fns/is_yesterday';
import PropTypes from 'prop-types';
import React from 'react';

import Breadcrumb from '../breadcrumb';
import CommitHash from '../commit-hash';
import DocumentTitle from '../document-title';

import { getApplication } from '../../state/application';
import { getJob } from '../../state/job';
import { getJobStepLog } from '../../state/job-logs';
import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';
import * as actionCreators from '../../state/subscriptions/action-creators';
import routes from '../../routes';

const TIME_FORMAT = 'HH:mm:ss';
const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ssZ';

const getStartTime = startTime => {
  const date = new Date(startTime); // TODO: `startTime` should be a date (set by the Job factory)
  let dateText;

  if (isToday(date)) {
    dateText = `today at ${format(date, TIME_FORMAT)}`;
  } else if (isYesterday(date)) {
    dateText = `yesterday at ${format(date, TIME_FORMAT)}`;
  } else {
    dateText = distanceInWordsToNow(date, { addSuffix: true });
  }

  const timestamp = format(date, DATETIME_FORMAT);

  return (
    <time datetime={timestamp} title={timestamp}>
      {dateText}
    </time>
  );
};

const getDuration = (start, end) => {
  const timestamp = format(end, DATETIME_FORMAT);
  return <span title={timestamp}>{distanceInWords(start, end)}</span>;
};

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
    const { appName, jobName, job, repo } = this.props;

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
                <p>
                  Triggered by <strong>User Name</strong>, commit{' '}
                  <CommitHash commit={job.commitID} repo={repo} />
                </p>
                <p>
                  Started <strong>{getStartTime(job.started)}</strong>
                </p>
                <p>
                  Job took{' '}
                  <strong>{getDuration(job.started, job.ended)}</strong>
                </p>
              </section>
              <section>
                <h2 className="o-heading-section">Artefacts</h2>
                {job.deployments &&
                  job.deployments.map(deployment => (
                    <p>
                      Deployment{' '}
                      <Link
                        to={routeWithParams(routes.appDeployment, {
                          appName,
                          deploymentName: deployment.name,
                        })}
                      >
                        {deployment.name}
                      </Link>{' '}
                      to{' '}
                      <Link
                        to={routeWithParams(routes.appEnvironment, {
                          appName,
                          envName: deployment.environment,
                        })}
                      >
                        {deployment.environment}
                      </Link>
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
  repo: PropTypes.string,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,

  pod: PropTypes.object,
};

const mapStateToProps = state => ({
  repo: get(getApplication(state), 'registration.repository'),
  job: getJob(state),
  getJobStepLog: stepName => getJobStepLog(state, stepName),
});

const mapDispatchToProps = dispatch => ({
  subscribe: (appName, jobName) => {
    dispatch(actionCreators.subscribeApplication(appName));
    dispatch(actionCreators.subscribeJob(appName, jobName));
    dispatch(actionCreators.subscribeJobLogs(appName, jobName));
  },
  unsubscribe: (appName, jobName) => {
    dispatch(actionCreators.unsubscribeApplication(appName));
    dispatch(actionCreators.unsubscribeJob(appName, jobName));
    dispatch(actionCreators.unsubscribeJobLogs(appName, jobName));
  },
});

export default mapRouteParamsToProps(
  ['appName', 'jobName'],
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageApplicationJob)
);
