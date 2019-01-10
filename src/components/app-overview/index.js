import { connect } from 'react-redux';
import { EnvironmentSummary, JobSummary } from 'radix-web-console-models';
import PropTypes from 'prop-types';
import React from 'react';

import Button from '../button';
import EnvironmentsSummary from './environments-summary';
import LatestJobs from './latest-jobs';

import Breadcrumb from '../breadcrumb';

import { getEnvironmentSummaries, getJobs } from '../../state/new_application';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import appsActions from '../../state/applications/action-creators';

import './style.css';

const CONFIRM_TEXT =
  'This will delete the application from all environments and remove it from Radix. Are you sure?';

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
      <React.Fragment>
        <Breadcrumb links={[{ label: appName }]} />
        <h2 className="o-heading-section">Environments</h2>
        <EnvironmentsSummary appName={appName} envs={envs} />
        <h2 className="o-heading-section">Latest jobs</h2>
        <LatestJobs jobs={jobs} appName={appName} />
        <Button
          btnType={['tiny', 'danger']}
          onClick={() => window.confirm(CONFIRM_TEXT) && deleteApp(appName)}
        >
          Delete Application
        </Button>
      </React.Fragment>
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
  unsubscribeApplication: () =>
    dispatch(subscriptionActions.unsubscribeApplication(appName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppOverview);
