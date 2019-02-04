import { connect } from 'react-redux';
import { EnvironmentSummary, JobSummary } from 'radix-web-console-models';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import EnvironmentsSummary from './environments-summary';

import Breadcrumb from '../breadcrumb';
import Button from '../button';
import JobsList from '../jobs-list';

import { getEnvironmentSummaries, getJobs } from '../../state/application';
import { getAppJobsUrl } from '../../utils/routing';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import appsActions from '../../state/applications/action-creators';

import './style.css';

const CONFIRM_TEXT =
  'This will delete the application from all environments and remove it from Radix. Are you sure?';

const LATEST_JOBS_LIMIT = 5;

export class AppOverview extends React.Component {
  componentWillMount() {
    this.props.subscribeApplication(this.props.appName);
  }

  componentWillUnmount() {
    this.props.unsubscribeApplication(this.props.appName);
  }

  componentDidUpdate(prevProps) {
    const { appName } = this.props;

    if (appName !== prevProps.appName) {
      this.props.unsubscribeApplication(prevProps.appName);
      this.props.subscribeApplication(appName);
    }
  }

  render() {
    const { appName, envs, jobs, deleteApp } = this.props;

    return (
      <div className="app-overview">
        <Breadcrumb links={[{ label: appName }]} />
        <main>
          <EnvironmentsSummary appName={appName} envs={envs} />

          {jobs.length > 0 && (
            <React.Fragment>
              <h2 className="o-heading-section">Latest jobs</h2>
              <nav className="o-toolbar">
                <Link to={getAppJobsUrl(appName)}>View all jobs</Link>
              </nav>
            </React.Fragment>
          )}
          <JobsList jobs={jobs} appName={appName} limit={LATEST_JOBS_LIMIT} />

          <Button
            btnType={['tiny', 'danger']}
            onClick={() => window.confirm(CONFIRM_TEXT) && deleteApp(appName)}
          >
            Delete Application
          </Button>
        </main>
      </div>
    );
  }
}

AppOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  deleteApp: PropTypes.func.isRequired,
  envs: PropTypes.arrayOf(PropTypes.shape(EnvironmentSummary)).isRequired,
  jobs: PropTypes.arrayOf(PropTypes.shape(JobSummary)).isRequired,
};

const mapStateToProps = state => ({
  envs: getEnvironmentSummaries(state),
  jobs: getJobs(state),
});

const mapDispatchToProps = (dispatch, { appName }) => ({
  deleteApp: appName => dispatch(appsActions.deleteAppRequest(appName)),
  subscribeApplication: () =>
    dispatch(subscriptionActions.subscribeApplication(appName)),
  unsubscribeApplication: (oldAppName = appName) =>
    dispatch(subscriptionActions.unsubscribeApplication(oldAppName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppOverview);
