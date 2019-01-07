import { connect } from 'react-redux';
import { EnvironmentSummary, JobSummary } from 'radix-web-console-models';
import PropTypes from 'prop-types';
import React from 'react';

import EnvironmentsSummary from './environments-summary';
import LatestJobs from './latest-jobs';

import { getEnvironmentSummaries, getJobs } from '../../state/new_application';
import * as subscriptionActions from '../../state/subscriptions/action-creators';

import './style.css';

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
    const { appName, envs, jobs } = this.props;

    return (
      <React.Fragment>
        <EnvironmentsSummary envs={envs} />
        <h2 className="o-heading-section">Latest jobs</h2>
        <LatestJobs jobs={jobs} appName={appName} />
      </React.Fragment>
    );
  }
}

AppOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  envs: PropTypes.arrayOf(PropTypes.shape(EnvironmentSummary)).isRequired,
  jobs: PropTypes.arrayOf(PropTypes.shape(JobSummary)).isRequired,
};

const mapStateToProps = state => ({
  envs: getEnvironmentSummaries(state),
  jobs: getJobs(state),
});

const mapDispatchToProps = (dispatch, { appName }) => ({
  subscribeApplication: () =>
    dispatch(subscriptionActions.subscribeApplication(appName)),
  unsubscribeApplication: () =>
    dispatch(subscriptionActions.unsubscribeApplication(appName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppOverview);
