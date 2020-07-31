import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Breadcrumb from '../breadcrumb';
import EnvironmentsSummary from '../environments-summary';
import JobsList from '../jobs-list';
import AsyncResource from '../async-resource';

import DefaultAppAlias from './default-app-alias';
import Monitoring from './monitoring';

import {
  getAppAlias,
  getEnvironmentSummaries,
  getJobs,
} from '../../state/application';
import { getApplicationCost } from '../../state/application-cost';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import * as subscriptionCostApiActions from '../../state/subscriptions-cost-api/action-creators';
import * as routing from '../../utils/routing';
import environmentSummaryModel from '../../models/environment-summary';
import jobSummaryModel from '../../models/job-summary';
import applicationCostSet from '../../models/application-cost-set';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea } from '@fortawesome/free-solid-svg-icons';
import { urlToAppMonitoring } from '../../utils/monitoring';
import format from 'date-fns/format';

const LATEST_JOBS_LIMIT = 5;

export class AppOverview extends React.Component {
  constructor(props) {
    super(props);
    props.subscribeApplication(props.appName);
    props.subscribeApplicationCost(props.appName);
  }

  componentWillUnmount() {
    this.props.unsubscribeApplication(this.props.appName);
    this.props.unsubscribeApplicationCost(this.props.appName);
  }

  componentDidUpdate(prevProps) {
    const { appName } = this.props;

    if (appName !== prevProps.appName) {
      this.props.unsubscribeApplication(prevProps.appName);
      this.props.subscribeApplication(appName);
      this.props.unsubscribeApplicationCost(prevProps.appName);
      this.props.subscribeApplicationCost(appName);
    }
  }

  render() {
    const { appAlias, appName, envs, jobs, applicationCostSet } = this.props;

    return (
      <div className="app-overview">
        <Breadcrumb links={[{ label: appName }]} />
        <main>
          <div>
            <AsyncResource resource="APP_COST" resourceParams={[appName]}>
              <div className="app-overview__info-tile">
                <h3 className="app-overview__info-tile-head">Cost</h3>
                <FontAwesomeIcon
                  className="app-overview__info-tile-image"
                  icon={faChartArea}
                  size="6x"
                />
                <React.Fragment>
                  {applicationCostSet !== null &&
                    applicationCostSet.applicationCosts.length > 0 && (
                      <div className="app-overview__info-tile-body">
                        <p>
                          Period:&nbsp;
                          <span>
                            {format(
                              new Date(applicationCostSet.from),
                              'DD.MM.YYYY HH:mm'
                            )}
                          </span>
                          &nbsp;-&nbsp;
                          <span>
                            {format(
                              new Date(applicationCostSet.to),
                              'DD.MM.YYYY HH:mm'
                            )}
                          </span>
                        </p>
                        <table>
                          <tr>
                            <td width="100">CPU</td>
                            <td>
                              {applicationCostSet.applicationCosts[0].costPercentageByCpu.toFixed(
                                4
                              )}
                              &nbsp;%
                            </td>
                          </tr>
                          <tr>
                            <td>Memory</td>
                            <td>
                              {applicationCostSet.applicationCosts[0].costPercentageByMemory.toFixed(
                                4
                              )}
                              &nbsp;%
                            </td>
                          </tr>
                        </table>
                      </div>
                    )}
                  {(applicationCostSet === null ||
                    applicationCostSet.applicationCosts.length === 0) && (
                    <div className="app-overview__info-tile-body">
                      <p>Loading...</p>
                    </div>
                  )}
                </React.Fragment>
              </div>
            </AsyncResource>
          </div>
          <p />
          <div>
            <AsyncResource resource="APP" resourceParams={[appName]}>
              <div className="app-overview__info-tiles">
                <DefaultAppAlias appName={appName} appAlias={appAlias} />
                <Monitoring appName={appName} />
              </div>
              {envs.length > 0 && (
                <h2 className="o-heading-section">Environments</h2>
              )}
              <EnvironmentsSummary appName={appName} envs={envs} />

              {jobs.length > 0 && (
                <React.Fragment>
                  <h2 className="o-heading-section">Latest jobs</h2>
                  <nav className="o-toolbar">
                    <Link to={routing.getAppJobsUrl(appName)}>
                      View all jobs
                    </Link>
                  </nav>
                </React.Fragment>
              )}
              <JobsList
                jobs={jobs}
                appName={appName}
                limit={LATEST_JOBS_LIMIT}
              />
            </AsyncResource>
          </div>
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
  applicationCostSet: PropTypes.shape(applicationCostSet),
};

const mapStateToProps = (state) => ({
  appAlias: getAppAlias(state),
  envs: getEnvironmentSummaries(state),
  jobs: getJobs(state),
  applicationCostSet: getApplicationCost(state),
});

const mapDispatchToProps = (dispatch, { appName }) => ({
  subscribeApplication: () =>
    dispatch(subscriptionActions.subscribeApplication(appName)),
  unsubscribeApplication: (oldAppName = appName) =>
    dispatch(subscriptionActions.unsubscribeApplication(oldAppName)),
  subscribeApplicationCost: () =>
    dispatch(subscriptionCostApiActions.subscribeApplicationCost(appName)),
  unsubscribeApplicationCost: (oldAppName = appName) =>
    dispatch(subscriptionCostApiActions.unsubscribeApplicationCost(oldAppName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppOverview);
