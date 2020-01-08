import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Alert from '../alert';
import Breadcrumb from '../breadcrumb';
import CreateJobForm from '../create-job-form';
import DocumentTitle from '../document-title';
import Panel from '../panel';

import { routeWithParams } from '../../utils/string';
import { mapRouteParamsToProps } from '../../utils/routing';
import requestStates from '../../state/state-utils/request-states';
import routes from '../../routes';

import jobActions from '../../state/job-creation/action-creators';
import { getCreationResult, getCreationState } from '../../state/job-creation';

class PageJobNew extends React.Component {
  componentWillUnmount() {
    this.props.resetCreate();
  }

  render() {
    const { appName } = this.props;

    return (
      <React.Fragment>
        <DocumentTitle title="New job" />
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            { label: 'Jobs', to: routeWithParams(routes.appJobs, { appName }) },
            { label: 'New job' },
          ]}
        />
        <main className="o-layout-constrained">
          <div className="o-body-text">
            <h1 className="o-heading-section">New job</h1>
            <p>
              Jobs perform different actions in Radix. The pipeline of the job
              defines what action to take, and it may require specific
              parameters.
            </p>
          </div>
          <Panel>
            {this.props.creationState !== requestStates.SUCCESS && (
              <CreateJobForm appName={appName} />
            )}
            {this.props.creationState === requestStates.SUCCESS &&
              this.renderSuccess()}
          </Panel>
        </main>
      </React.Fragment>
    );
  }

  renderSuccess() {
    const { appName } = this.props;

    const jobLink = (
      <Link
        to={routeWithParams(routes.appJob, {
          appName: appName,
          jobName: this.props.creationResult.name,
        })}
      >
        Job
      </Link>
    );

    const jobsLink = (
      <Link
        to={routeWithParams(routes.appJobs, {
          appName: appName,
        })}
      >
        jobs
      </Link>
    );

    return (
      <div>
        <Alert>
          The job "{this.props.creationResult.name}" has been created
        </Alert>
        <p>
          View {jobLink} or all {jobsLink}
        </p>
      </div>
    );
  }
}

PageJobNew.propTypes = {
  appName: PropTypes.string.isRequired,
  creationState: PropTypes.oneOf(Object.values(requestStates)).isRequired,
  resetCreate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  creationState: getCreationState(state),
  creationResult: getCreationResult(state),
});

const mapDispatchToProps = dispatch => ({
  resetCreate: () => dispatch(jobActions.addJobReset()),
});

export default mapRouteParamsToProps(
  ['appName'],
  connect(mapStateToProps, mapDispatchToProps)(PageJobNew)
);
