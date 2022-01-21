import { Button, Icon } from '@equinor/eds-core-react';
import { add } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AsyncResource from '../async-resource';
import { Breadcrumb } from '../breadcrumb';
import DocumentTitle from '../document-title';
import { JobsList } from '../jobs-list';
import { JobSummaryModelValidationMap } from '../../models/job-summary';
import { routes } from '../../routes';
import * as jobsState from '../../state/jobs';
import {
  subscribeJobs,
  unsubscribeJobs,
} from '../../state/subscriptions/action-creators';
import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';
import ApplicationAlerting from './application-alerting';
import './style.css';

class PipelinePageJobs extends Component {
  componentDidMount() {
    const { subscribeJobs, appName, envName } = this.props;
    subscribeJobs(appName, envName);
  }

  componentWillUnmount() {
    const { unsubscribeJobs, appName, envName } = this.props;
    unsubscribeJobs(appName, envName);
  }

  componentDidUpdate(prevProps) {
    const { subscribeJobs, unsubscribeJobs, appName, envName } = this.props;
    if (prevProps.envName !== envName || prevProps.appName !== appName) {
      unsubscribeJobs(appName, prevProps.envName);
      subscribeJobs(appName, envName);
    }
  }

  render() {
    const { appName, jobs } = this.props;
    return (
      <>
        <DocumentTitle title={`${appName} pipeline jobs`} />
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            { label: 'Pipeline Jobs' },
          ]}
        />
        <main className="grid grid--gap-medium">
          <div className="pipeline-job-actions">
            <div>
              <Link to={routeWithParams(routes.appJobNew, { appName })}>
                <Button variant="ghost">
                  <Icon data={add} size={24} />
                  Create new
                </Button>
              </Link>
            </div>
            <div className="pipeline-job-action__action--justify-end">
              <ApplicationAlerting appName={appName} />
            </div>
          </div>
          <AsyncResource resource="JOBS" resourceParams={[appName]}>
            <JobsList jobs={jobs} appName={appName} />
          </AsyncResource>
        </main>
      </>
    );
  }
}

PipelinePageJobs.propTypes = {
  appName: PropTypes.string.isRequired,
  jobs: PropTypes.arrayOf(PropTypes.shape(JobSummaryModelValidationMap))
    .isRequired,
};

const mapStateToProps = (state) => ({
  jobs: jobsState.getJobs(state),
});

const mapDispatchToProps = (dispatch) => ({
  subscribeJobs: (appName, envName) =>
    dispatch(subscribeJobs(appName, envName)),
  unsubscribeJobs: (appName, envName) =>
    dispatch(unsubscribeJobs(appName, envName)),
});

export default mapRouteParamsToProps(
  ['appName'],
  connect(mapStateToProps, mapDispatchToProps)(PipelinePageJobs)
);
