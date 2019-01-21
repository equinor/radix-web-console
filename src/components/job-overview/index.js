import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import format from 'date-fns/format';
import get from 'lodash/get';
import isToday from 'date-fns/is_today';
import isYesterday from 'date-fns/is_yesterday';
import PropTypes from 'prop-types';
import React from 'react';

import StepsList from './steps-list';

import Breadcrumb from '../breadcrumb';
import CommitHash from '../commit-hash';

import { getApplication } from '../../state/application';
import { getJob } from '../../state/job';
import { routeWithParams, differenceInWords } from '../../utils/string';
import * as actionCreators from '../../state/subscriptions/action-creators';
import routes from '../../routes';

import './style.css';

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
    <time dateTime={timestamp} title={timestamp}>
      {dateText}
    </time>
  );
};

export class JobOverview extends React.Component {
  constructor() {
    super();
    this.state = { now: new Date() };
  }

  componentDidMount() {
    this.props.subscribe(this.props.appName, this.props.jobName);
    this.interval = setInterval(() => this.setState({ now: new Date() }), 1000);
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
    clearInterval(this.interval);
  }

  render() {
    const { appName, jobName, job, repo } = this.props;

    return (
      <React.Fragment>
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
            <React.Fragment>
              <div className="o-layout-columns">
                <section>
                  <h2 className="o-heading-section">Summary</h2>
                  <p>Job {job.status.toLowerCase()}</p>
                  <p>
                    Triggered by <strong>User Name</strong>, commit{' '}
                    <CommitHash commit={job.commitID} repo={repo} />
                  </p>
                  <p>
                    Started <strong>{getStartTime(job.started)}</strong>
                  </p>
                  {job.ended && (
                    <p>
                      Job took{' '}
                      <strong title={format(job.ended, DATETIME_FORMAT)}>
                        {differenceInWords(job.ended, job.started)}
                      </strong>
                    </p>
                  )}
                  {!job.ended && (
                    <p>
                      Duration so far is{' '}
                      <strong>
                        {differenceInWords(this.state.now, job.started)}
                      </strong>
                    </p>
                  )}
                </section>
                <section>
                  <h2 className="o-heading-section">Artefacts</h2>
                  {job.deployments &&
                    job.deployments.map(deployment => (
                      <p key={deployment.name}>
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
              <StepsList
                appName={appName}
                jobName={jobName}
                steps={job.steps}
              />
            </React.Fragment>
          )}
        </main>
      </React.Fragment>
    );
  }
}

JobOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  job: PropTypes.object,
  jobName: PropTypes.string.isRequired,
  repo: PropTypes.string,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  job: getJob(state),
  repo: get(getApplication(state), 'registration.repository'),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobOverview);
