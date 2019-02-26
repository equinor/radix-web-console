import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Breadcrumb from '../breadcrumb';
import DocumentTitle from '../document-title';
import LinkButton from '../link-button';
import JobsList from '../jobs-list';

import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';
import * as jobsState from '../../state/jobs';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import jobSummaryModel from '../../models/job-summary';
import routes from '../../routes';

import './style.css';

const newJobIcon = <FontAwesomeIcon icon={faCog} />;

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
        <main className="page-jobs">
          <nav className="o-toolbar">
            <LinkButton
              to={routeWithParams(routes.appJobNew, { appName })}
              linkBtnType={['icon-compose', 'primary']}
            >
              {newJobIcon} New Job…
            </LinkButton>
          </nav>
          <JobsList jobs={jobs} appName={appName} />
        </main>
      </React.Fragment>
    );
  }
}

PageJobs.propTypes = {
  appName: PropTypes.string.isRequired,
  jobs: PropTypes.arrayOf(PropTypes.shape(jobSummaryModel)).isRequired,
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
