import { connect } from 'react-redux';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Breadcrumb from '../breadcrumb';
import EnvironmentsSummary from '../environments-summary';
import JobsList from '../jobs-list';
import ResourceLoading from '../resource-loading';

import {
  getAppAlias,
  getEnvironmentSummaries,
  getJobs,
} from '../../state/application';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import * as routing from '../../utils/routing';
import environmentSummaryModel from '../../models/environment-summary';
import jobSummaryModel from '../../models/job-summary';

import './style.css';

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
    const { appAlias, appName, envs, jobs } = this.props;

    return (
      <div className="app-overview">
        <Breadcrumb links={[{ label: appName }]} />
        <main>
          <ResourceLoading resource="APP" resourceParams={[appName]}>
            {envs.length > 0 && (
              <h2 className="o-heading-section">Environments</h2>
            )}
            {appAlias && (
              <p>
                Component{' '}
                <Link
                  to={routing.getActiveComponentUrl(
                    appName,
                    appAlias.environmentName,
                    appAlias.componentName
                  )}
                >
                  {appAlias.componentName}
                </Link>{' '}
                in environment{' '}
                <Link
                  to={routing.getEnvUrl(
                    appName,
                    appAlias.environmentName,
                    appAlias.componentName
                  )}
                >
                  {appAlias.environmentName}
                </Link>{' '}
                is the{' '}
                <a href={`https://${appAlias.url}`}>
                  default alias <FontAwesomeIcon icon={faLink} size="lg" />
                </a>
              </p>
            )}
            <EnvironmentsSummary appName={appName} envs={envs} />

            {jobs.length > 0 && (
              <React.Fragment>
                <h2 className="o-heading-section">Latest jobs</h2>
                <nav className="o-toolbar">
                  <Link to={routing.getAppJobsUrl(appName)}>View all jobs</Link>
                </nav>
              </React.Fragment>
            )}
            <JobsList jobs={jobs} appName={appName} limit={LATEST_JOBS_LIMIT} />
          </ResourceLoading>
        </main>
      </div>
    );
  }
}

AppOverview.propTypes = {
  appAlias: PropTypes.exact({
    componentName: PropTypes.string.isRequired,
    environmentName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  appName: PropTypes.string.isRequired,
  envs: PropTypes.arrayOf(PropTypes.shape(environmentSummaryModel)).isRequired,
  jobs: PropTypes.arrayOf(PropTypes.shape(jobSummaryModel)).isRequired,
};

const mapStateToProps = state => ({
  appAlias: getAppAlias(state),
  envs: getEnvironmentSummaries(state),
  jobs: getJobs(state),
});

const mapDispatchToProps = (dispatch, { appName }) => ({
  subscribeApplication: () =>
    dispatch(subscriptionActions.subscribeApplication(appName)),
  unsubscribeApplication: (oldAppName = appName) =>
    dispatch(subscriptionActions.unsubscribeApplication(oldAppName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppOverview);
