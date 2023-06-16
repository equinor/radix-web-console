import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Alert } from '../alert';
import { Breadcrumb } from '../breadcrumb';
import CreateJobForm from '../create-job-form';
import { DocumentTitle } from '../document-title';
import { routes } from '../../routes';
import { getCreationResult, getCreationState } from '../../state/job-creation';
import { actions as jobActions } from '../../state/job-creation/action-creators';
import { RequestState } from '../../state/state-utils/request-states';
import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';

class PagePipelineJobNew extends Component {
  componentWillUnmount() {
    this.props.resetCreate();
  }

  render() {
    const { appName } = this.props;
    return (
      <>
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
        <div className="grid grid--gap-medium">
          <div className="grid grid--gap-small">
            <Typography variant="h4">New pipeline job</Typography>
            <Typography>
              Pipeline jobs perform different actions in Radix. The pipeline of
              the job defines what action to take, and it may require specific
              parameters.
            </Typography>
          </div>
          {this.props.creationState === RequestState.SUCCESS ? (
            this.renderSuccess()
          ) : (
            <CreateJobForm appName={appName} />
          )}
        </div>
      </>
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
        <Typography link as="span">
          Pipeline Job
        </Typography>
      </Link>
    );

    const jobsLink = (
      <Link to={routeWithParams(routes.appJobs, { appName: appName })}>
        <Typography link as="span">
          Pipeline Jobs
        </Typography>
      </Link>
    );

    return (
      <div className="grid grid--gap-medium">
        <Alert>
          <Typography>
            The pipeline job "{this.props.creationResult.name}" has been created
          </Typography>
        </Alert>
        <Typography>
          View {jobLink} or all {jobsLink}
        </Typography>
      </div>
    );
  }
}

PagePipelineJobNew.propTypes = {
  appName: PropTypes.string.isRequired,
  creationState: PropTypes.oneOf(Object.values(RequestState)).isRequired,
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
