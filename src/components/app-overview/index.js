import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import EnvironmentsSummary from '../environments-summary';
import JobsList from '../jobs-list';
import AsyncResource from '../async-resource';
import DefaultAppAlias from './default-app-alias';
import ApplicationCost from '../application-cost';
import FutureApplicationCost from '../application-future-cost';
import {
  getAppAlias,
  getEnvironmentSummaries,
  getJobs,
} from '../../state/application';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import * as routing from '../../utils/routing';
import environmentSummaryModel from '../../models/environment-summary';
import jobSummaryModel from '../../models/job-summary';
import { Button } from '@equinor/eds-core-react';
import './style.css';

const LATEST_JOBS_LIMIT = 5;

export class AppOverview extends React.Component {
  constructor(props) {
    super(props);
    props.subscribeApplication(props.appName);
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
        <main className="grid grid--gap-medium">
          <AsyncResource resource="APP" resourceParams={[appName]}>
            <div className="grid grid--gap-medium grid--overview-columns">
              <div className="grid grid--gap-medium">
                <ApplicationCost appName={appName} />
              </div>
              <div className="grid grid--gap-medium">
                <FutureApplicationCost appName={appName} />
              </div>
            </div>
            {appAlias != null && (
              <DefaultAppAlias appName={appName} appAlias={appAlias} />
            )}
            {envs.length > 0 && <h4>Environments</h4>}
            <EnvironmentsSummary appName={appName} envs={envs} />

            {jobs.length > 0 && (
              <React.Fragment>
                <div className="section__heading">
                  <h4>Latest pipeline jobs</h4>
                  <nav className="o-toolbar">
                    <Button
                      variant="ghost"
                      href={routing.getAppJobsUrl(appName)}
                    >
                      Go to pipeline jobs
                    </Button>
                  </nav>
                </div>
              </React.Fragment>
            )}
            <JobsList jobs={jobs} appName={appName} limit={LATEST_JOBS_LIMIT} />
          </AsyncResource>
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

const mapStateToProps = (state) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(AppOverview);
