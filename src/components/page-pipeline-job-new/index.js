import { Typography } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Alert from '../alert';
import Breadcrumb from '../breadcrumb';
import CreateJobForm from '../create-job-form';
import DocumentTitle from '../document-title';
import Panel from '../panel';
import routes from '../../routes';
import { getCreationResult, getCreationState } from '../../state/job-creation';
import jobActions from '../../state/job-creation/action-creators';
import requestStates from '../../state/state-utils/request-states';
import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';

class PagePipelineJobNew extends React.Component {
  componentWillUnmount() {
    this.props.resetCreate();
  }

  render() {
    const { appName } = this.props;

    return (
      <React.Fragment>
        <DocumentTitle title="New pipeline job" />
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            {
              label: 'Pipeline Jobs',
              to: routeWithParams(routes.appJobs, { appName }),
            },
            { label: 'New pipeline job' },
          ]}
        />
        <main className="o-layout-constrained">
          <div>
            <Typography variant="h1">New pipeline job</Typography>
            <p>
              <Typography variant="h6" as="span">
                Pipeline jobs perform different actions in Radix. The pipeline
                of the job defines what action to take, and it may require
                specific parameters.
              </Typography>
            </p>
          </div>
          <Panel>
            {this.props.creationState === requestStates.SUCCESS ? (
              this.renderSuccess()
            ) : (
              <CreateJobForm appName={appName} />
            )}
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
        Pipeline Job
      </Link>
    );

    const jobsLink = (
      <Link
        to={routeWithParams(routes.appJobs, {
          appName: appName,
        })}
      >
        Pipeline Jobs
      </Link>
    );

    return (
      <div>
        <Alert>
          <Typography variant="h6">
            The pipeline job "{this.props.creationResult.name}" has been created
          </Typography>
        </Alert>
        <Typography variant="h6">
          View {jobLink} or all {jobsLink}
        </Typography>
      </div>
    );
  }
}

PagePipelineJobNew.propTypes = {
  appName: PropTypes.string.isRequired,
  creationState: PropTypes.oneOf(Object.values(requestStates)).isRequired,
  resetCreate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  creationState: getCreationState(state),
  creationResult: getCreationResult(state),
});

const mapDispatchToProps = (dispatch) => ({
  resetCreate: () => dispatch(jobActions.addJobReset()),
});

export default mapRouteParamsToProps(
  ['appName'],
  connect(mapStateToProps, mapDispatchToProps)(PagePipelineJobNew)
);
