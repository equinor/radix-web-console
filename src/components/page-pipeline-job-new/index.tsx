import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Component as ClassComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';

import { Alert } from '../alert';
import { Breadcrumb } from '../breadcrumb';
import CreateJobForm from '../create-job-form';
import { DocumentTitle } from '../document-title';
import { RootState } from '../../init/store';
import {
  JobModel,
  JobModelValidationMap,
} from '../../models/radix-api/jobs/job';
import { routes } from '../../routes';
import { getCreationResult, getCreationState } from '../../state/job-creation';
import { actions as jobActions } from '../../state/job-creation/action-creators';
import { RequestState } from '../../state/state-utils/request-states';
import { connectRouteParams, routeParamLoader } from '../../utils/router';
import { routeWithParams } from '../../utils/string';

interface PagePipelineJobNewDispatch {
  resetCreate: () => void;
}

interface PagePipelineJobNewState {
  creationState: RequestState;
  creationResult: JobModel;
}

interface PagePipelineJobNewProps
  extends PagePipelineJobNewDispatch,
    PagePipelineJobNewState {
  appName: string;
}

class PagePipelineJobNew extends ClassComponent<PagePipelineJobNewProps> {
  static readonly propTypes: PropTypes.ValidationMap<PagePipelineJobNewProps> =
    {
      appName: PropTypes.string.isRequired,
      creationState: PropTypes.oneOf(Object.values(RequestState)).isRequired,
      creationResult: PropTypes.shape(JobModelValidationMap)
        .isRequired as PropTypes.Validator<JobModel>,
      resetCreate: PropTypes.func.isRequired,
    };

  override componentWillUnmount() {
    this.props.resetCreate();
  }

  override render() {
    const { appName, creationState } = this.props;

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
          {creationState === RequestState.SUCCESS ? (
            this.renderSuccess()
          ) : (
            <CreateJobForm appName={appName} />
          )}
        </div>
      </>
    );
  }

  private renderSuccess() {
    const { appName, creationResult } = this.props;

    const jobLink = (
      <Link
        to={routeWithParams(routes.appJob, {
          appName,
          jobName: creationResult.name,
        })}
      >
        <Typography link as="span">
          Pipeline Job
        </Typography>
      </Link>
    );

    const jobsLink = (
      <Link to={routeWithParams(routes.appJobs, { appName })}>
        <Typography link as="span">
          Pipeline Jobs
        </Typography>
      </Link>
    );

    return (
      <div className="grid grid--gap-medium">
        <Alert>
          <Typography>
            The pipeline job "{creationResult.name}" has been created
          </Typography>
        </Alert>
        <Typography>
          View {jobLink} or all {jobsLink}
        </Typography>
      </div>
    );
  }
}

function mapStateToProps(state: RootState): PagePipelineJobNewState {
  return {
    creationState: getCreationState(state),
    creationResult: getCreationResult(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): PagePipelineJobNewDispatch {
  return { resetCreate: () => dispatch(jobActions.addJobReset()) };
}

const ConnectedPagePipelineJobNew = connect(
  mapStateToProps,
  mapDispatchToProps
)(PagePipelineJobNew);

const Component = connectRouteParams(ConnectedPagePipelineJobNew);
export { Component, routeParamLoader as loader };

export default ConnectedPagePipelineJobNew;
