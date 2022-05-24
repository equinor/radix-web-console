import {
  Button,
  CircularProgress,
  NativeSelect,
  Typography,
} from '@equinor/eds-core-react';
import { pick } from 'lodash';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

import { PipelineFormBuild } from './pipeline-form-build';
import { PipelineFormBuildDeploy } from './pipeline-form-build-deploy';
import { PipelineFormPromote } from './pipeline-form-promote';

import { Alert } from '../alert';
import { DeploymentSummaryModelValidationMap } from '../../models/deployment-summary';
import { EnvironmentSummaryModelValidationMap } from '../../models/environment-summary';
import {
  getEnvironmentBranches,
  getEnvironmentSummaries,
} from '../../state/application';
import { getMemoizedDeployments } from '../../state/deployments';
import { getCreationError, getCreationState } from '../../state/job-creation';
import { actions as jobActions } from '../../state/job-creation/action-creators';
import { RequestState } from '../../state/state-utils/request-states';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import { configVariables } from '../../utils/config';

import './style.css';

const pipelines = {
  build: {
    component: PipelineFormBuild,
    description: 'Build (but do not deploy) a git branch',
    props: ['branches'],
  },
  'build-deploy': {
    component: PipelineFormBuildDeploy,
    description:
      'Build a git branch and deploy to environments mapped in radixconfig.yaml',
    props: ['branches'],
  },
};

if (configVariables.FLAGS.enablePromotionPipeline) {
  pipelines.promote = {
    component: PipelineFormPromote,
    description: 'Promote an existing deployment to an environment',
    props: ['environments', 'deployments'],
  };
}

class CreateJobForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pipelineName: 'build-deploy',
      pipelineState: {},
      isValid: false,
    };

    props.subscribe(props.appName);

    this.handleChangePipeline = this.handleChangePipeline.bind(this);
    this.handlePipelineStateChange = this.handlePipelineStateChange.bind(this);
    this.renderPipelineForm = this.renderPipelineForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // If search params are present, try to initialise the form
    const url = new URL(document.location.href);
    if (url.searchParams.has('pipeline')) {
      const urlPipeline = url.searchParams.get('pipeline');

      // Only load state from URL if "pipeline" exists
      if (pipelines[urlPipeline]) {
        const pipelineState = {};
        for (const paramEntry of url.searchParams.entries()) {
          pipelineState[paramEntry[0]] = paramEntry[1];
        }

        this.setState({ pipelineName: urlPipeline, pipelineState });
      }
    }
  }

  componentWillUnmount() {
    this.props.unsubscribe(this.props.appName);
  }

  handlePipelineStateChange(newState, isValid) {
    const pipelineState = Object.assign({}, this.state.pipelineState, newState);
    this.setState({ pipelineState, isValid });
  }

  handleChangePipeline(ev) {
    this.setState({
      pipelineName: ev.target.value,
      pipelineState: {},
      isValid: false,
    });
  }

  handleSubmit(ev) {
    const { appName } = this.props;
    ev.preventDefault();
    this.props.requestCreate({
      appName,
      pipelineName: this.state.pipelineName,
      ...this.state.pipelineState,
    });
  }

  renderPipelineForm() {
    if (!this.state.pipelineName) {
      return null;
    }

    const chosenPipeline = pipelines[this.state.pipelineName];
    const PipelineForm = chosenPipeline.component;
    const pipelineProps = pick(this.props, chosenPipeline.props);
    return (
      <PipelineForm
        onChange={this.handlePipelineStateChange}
        {...pipelineProps}
        {...this.state.pipelineState}
      />
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset
          disabled={this.props.creationState === RequestState.IN_PROGRESS}
          className="grid grid--gap-medium"
        >
          <div className="grid grid--gap-small input">
            <Typography
              group="input"
              variant="text"
              token={{ color: 'currentColor' }}
            >
              Pipeline
            </Typography>
            <NativeSelect
              value={this.state.pipelineName}
              onChange={this.handleChangePipeline}
            >
              <option value="">— Please select —</option>
              {Object.keys(pipelines).map((pipeline) => (
                <option value={pipeline} key={pipeline}>
                  {pipeline}
                </option>
              ))}
            </NativeSelect>
            <Typography
              group="navigation"
              variant="label"
              as="span"
              token={{ color: 'currentColor' }}
              className="input-label"
            >
              {this.state.pipelineName &&
                pipelines[this.state.pipelineName].description}
            </Typography>
          </div>
          {this.renderPipelineForm()}
          <div className="o-action-bar">
            {this.props.creationState === RequestState.IN_PROGRESS && (
              <div>
                <CircularProgress size={16}></CircularProgress>
                {'  '}Creating…
              </div>
            )}
            {this.props.creationState === RequestState.FAILURE && (
              <Alert type="danger">
                Failed to create job. {this.props.creationError}
              </Alert>
            )}
            <div>
              <Button disabled={!this.state.isValid} type="submit">
                Create job
              </Button>
            </div>
          </div>
        </fieldset>
      </form>
    );
  }
}

CreateJobForm.propTypes = {
  appName: PropTypes.string.isRequired,
  creationState: PropTypes.oneOf(Object.values(RequestState)).isRequired,
  creationError: PropTypes.string,
  branches: PropTypes.object.isRequired,
  deployments: PropTypes.arrayOf(
    PropTypes.exact(DeploymentSummaryModelValidationMap)
  ),
  environments: PropTypes.arrayOf(
    PropTypes.exact(EnvironmentSummaryModelValidationMap)
  ).isRequired,
  requestCreate: PropTypes.func.isRequired,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
};

// -----------------------------------------------------------------------------

const mapStateToProps = (state) => ({
  creationState: getCreationState(state),
  creationError: getCreationError(state),
  branches: getEnvironmentBranches(state),
  environments: getEnvironmentSummaries(state),
  deployments: getMemoizedDeployments(state),
});

const mapDispatchToProps = (dispatch, { appName }) => ({
  requestCreate: (job) => dispatch(jobActions.addJobRequest(job)),
  subscribe: () => {
    dispatch(subscriptionActions.subscribeApplication(appName));
    dispatch(subscriptionActions.subscribeDeployments(appName));
  },
  unsubscribe: () => {
    dispatch(subscriptionActions.unsubscribeApplication(appName));
    dispatch(subscriptionActions.unsubscribeDeployments(appName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateJobForm);
