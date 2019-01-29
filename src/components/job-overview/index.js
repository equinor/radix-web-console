import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';

import StepsList from './steps-list';

import Breadcrumb from '../breadcrumb';
import CommitHash from '../commit-hash';
import Duration from '../time/duration';
import RelativeToNow from '../time/relative-to-now';

import { getApplication } from '../../state/application';
import { getJob } from '../../state/job';
import { routeWithParams } from '../../utils/string';
import * as actionCreators from '../../state/subscriptions/action-creators';
import routes from '../../routes';

import './style.css';

const getExecutionState = status => {
  if (status === 'Pending') {
    return 'will execute';
  }

  if (status === 'Running') {
    return 'executing';
  }

  if (status === 'Failed' || status === 'Succeeded') {
    return 'executed';
  }

  return '';
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
                  <p>
                    Job {job.status.toLowerCase()};{' '}
                    {getExecutionState(job.status)} pipeline{' '}
                    <strong>{job.pipeline}</strong>
                  </p>
                  <p>
                    Triggered by <strong>User Name</strong>, commit{' '}
                    <CommitHash commit={job.commitID} repo={repo} />
                  </p>
                  <p>
                    Started{' '}
                    <strong>
                      <RelativeToNow time={job.started} />
                    </strong>
                  </p>
                  {job.ended && (
                    <p>
                      Job took{' '}
                      <strong>
                        <Duration start={job.started} end={job.ended} />
                      </strong>
                    </p>
                  )}
                  {!job.ended && (
                    <p>
                      Duration so far is{' '}
                      <strong>
                        <Duration start={job.started} end={this.state.now} />
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
  },
  unsubscribe: (appName, jobName) => {
    dispatch(actionCreators.unsubscribeApplication(appName));
    dispatch(actionCreators.unsubscribeJob(appName, jobName));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobOverview);
