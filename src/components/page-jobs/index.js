import { connect } from 'react-redux';
import { JobSummary } from 'radix-web-console-models';
import PropTypes from 'prop-types';
import React from 'react';

import Breadcrumb from '../breadcrumb';
import DocumentTitle from '../document-title';
import JobsList from '../jobs-list';

import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';
import * as jobsState from '../../state/jobs';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import routes from '../../routes';

class PageJobs extends React.Component {
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
        <DocumentTitle title={`${appName} jobs`} />
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            { label: 'Jobs' },
          ]}
        />
        <main>
          <JobsList jobs={jobs} appName={appName} />
        </main>
      </React.Fragment>
    );
  }
}

PageJobs.propTypes = {
  appName: PropTypes.string.isRequired,
  jobs: PropTypes.arrayOf(PropTypes.shape(JobSummary)).isRequired,
};

const mapStateToProps = state => ({
  jobs: jobsState.getJobs(state),
});

const mapDispatchToProps = dispatch => ({
  subscribeJobs: (appName, envName) =>
    dispatch(subscriptionActions.subscribeJobs(appName, envName)),
  unsubscribeJobs: (appName, envName) =>
    dispatch(subscriptionActions.unsubscribeJobs(appName, envName)),
});

export default mapRouteParamsToProps(
  ['appName'],
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageJobs)
);
