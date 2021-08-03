import { Breadcrumbs, Button, Icon } from '@equinor/eds-core-react';
import { add } from '@equinor/eds-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import AsyncResource from '../async-resource';
import DocumentTitle from '../document-title';
import JobsList from '../jobs-list';
import jobSummaryModel from '../../models/job-summary';
import routes from '../../routes';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import * as jobsState from '../../state/jobs';
import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';

import './style.css';
import { NavLink } from 'react-router-dom';

class PipelinePageJobs extends React.Component {
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
      <React.Fragment>
        <DocumentTitle title={`${appName} pipeline jobs`} />
        <Breadcrumbs className="pipeline-jobs__breadcrumbs">
          <Breadcrumbs.Breadcrumb
            href={routeWithParams(routes.app, { appName })}
          >
            {appName}
          </Breadcrumbs.Breadcrumb>
          <Breadcrumbs.Breadcrumb>Pipeline Jobs</Breadcrumbs.Breadcrumb>
        </Breadcrumbs>
        <main className="page-jobs">
          <div>
            <NavLink to={routeWithParams(routes.appJobNew, { appName })}>
              <Button as="span" variant="ghost">
                <Icon data={add} size={24}></Icon>
                Create new
              </Button>
            </NavLink>
          </div>
          <AsyncResource resource="JOBS" resourceParams={[appName]}>
            <JobsList jobs={jobs} appName={appName} />
          </AsyncResource>
        </main>
      </React.Fragment>
    );
  }
}

PipelinePageJobs.propTypes = {
  appName: PropTypes.string.isRequired,
  jobs: PropTypes.arrayOf(PropTypes.shape(jobSummaryModel)).isRequired,
};

const mapStateToProps = (state) => ({
  jobs: jobsState.getJobs(state),
});

const mapDispatchToProps = (dispatch) => ({
  subscribeJobs: (appName, envName) =>
    dispatch(subscriptionActions.subscribeJobs(appName, envName)),
  unsubscribeJobs: (appName, envName) =>
    dispatch(subscriptionActions.unsubscribeJobs(appName, envName)),
});

export default mapRouteParamsToProps(
  ['appName'],
  connect(mapStateToProps, mapDispatchToProps)(PipelinePageJobs)
);
