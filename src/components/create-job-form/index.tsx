import {
  Button,
  CircularProgress,
  NativeSelect,
  Typography,
} from '@equinor/eds-core-react';
import { pick } from 'lodash';
import * as PropTypes from 'prop-types';
import { ChangeEvent, Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { PipelineFormBuild } from './pipeline-form-build';
import { PipelineFormBuildDeploy } from './pipeline-form-build-deploy';
import { PipelineFormPromote } from './pipeline-form-promote';
import { PipelineFormChangeEvent } from './pipeline-form-types';

import { Alert } from '../alert';
import {
  PipelineNames,
  PipelineParametersBuild,
  PipelineParametersPromote,
} from '../../api/jobs';
import { RootState } from '../../init/store';
import {
  EnvironmentSummaryModel,
  EnvironmentSummaryModelValidationMap,
} from '../../models/environment-summary';
import {
  DeploymentSummaryModel,
  DeploymentSummaryModelValidationMap,
} from '../../models/radix-api/deployments/deployment-summary';
import {
  getEnvironmentBranches,
  getEnvironmentSummaries,
} from '../../state/application';
import { getMemoizedDeployments } from '../../state/deployments';
import { getCreationError, getCreationState } from '../../state/job-creation';
import { actions as jobActions } from '../../state/job-creation/action-creators';
import { RequestState } from '../../state/state-utils/request-states';
import {
  subscribeApplication,
  subscribeDeployments,
  unsubscribeApplication,
  unsubscribeDeployments,
} from '../../state/subscriptions/action-creators';
import { configVariables } from '../../utils/config';

import './style.css';

type PipelineParamState = PipelineParametersBuild | PipelineParametersPromote;

interface CreateJobFormDispatch {
  requestCreate: (
    job: ReturnType<typeof jobActions.addJobRequest>['meta']['job']
  ) => void;
  subscribe: (appName: string) => void;
  unsubscribe: (appName: string) => void;
}

interface CreateJobFormState {
  creationState: RequestState;
  creationError?: string;
  branches: Record<string, Array<string>>;
  deployments?: Array<DeploymentSummaryModel>;
  environments: Array<EnvironmentSummaryModel>;
}

export interface CreateJobFormProps
  extends CreateJobFormDispatch,
    CreateJobFormState {
  appName: string;
}

const pipelines: Partial<
  Record<
    PipelineNames,
    {
      component: (
        ...args: Partial<
          Parameters<
            | typeof PipelineFormBuild
            | typeof PipelineFormBuildDeploy
            | typeof PipelineFormPromote
          >
        >
      ) => JSX.Element;
      description: string;
      props: Array<keyof CreateJobFormState>;
    }
  >
> = {
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
  ...(configVariables.FLAGS.enablePromotionPipeline && {
    promote: {
      component: PipelineFormPromote,
      description: 'Promote an existing deployment to an environment',
      props: ['environments', 'deployments'],
    },
  }),
};

class CreateJobForm extends Component<
  CreateJobFormProps,
  {
    isValid: boolean;
    pipelineName: PipelineNames;
    pipelineState: Partial<PipelineParamState>;
  }
> {
  static readonly propTypes: PropTypes.ValidationMap<CreateJobFormProps> = {
    appName: PropTypes.string.isRequired,
    creationState: PropTypes.oneOf(Object.values(RequestState)).isRequired,
    creationError: PropTypes.string,
    branches: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))
      .isRequired,
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

  constructor(props: CreateJobFormProps) {
    super(props);
    this.state = {
      pipelineName: 'build-deploy',
      pipelineState: {},
      isValid: false,
    };

    this.handleChangePipeline = this.handleChangePipeline.bind(this);
    this.handlePipelineStateChange = this.handlePipelineStateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private handlePipelineStateChange({
    value,
    isValid,
  }: PipelineFormChangeEvent<Partial<PipelineParamState>>): void {
    this.setState({
      pipelineState: { ...this.state.pipelineState, ...value },
      isValid: isValid,
    });
  }

  private handleChangePipeline({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>): void {
    if (pipelines[value]) {
      this.setState({
        pipelineName: value as PipelineNames,
        pipelineState: {},
        isValid: false,
      });
    }
  }

  private handleSubmit(ev: FormEvent<HTMLFormElement>): void {
    ev.preventDefault();

    this.props.requestCreate({
      appName: this.props.appName,
      pipelineName: this.state.pipelineName,
      ...this.state.pipelineState,
    });
  }

  override componentDidMount() {
    this.props.subscribe(this.props.appName);

    // If search params are present, try to initialise the form
    const url = new URL(document.location.href);
    if (url.searchParams.has('pipeline')) {
      const urlPipeline = url.searchParams.get('pipeline') as PipelineNames;

      // Only load state from URL if "pipeline" exists
      if (pipelines[urlPipeline]) {
        const pipelineState: Partial<PipelineParamState> = {};
        for (const [key, value] of url.searchParams.entries()) {
          pipelineState[key] = value;
        }

        this.setState({
          pipelineName: urlPipeline,
          pipelineState: pipelineState,
        });
      }
    }
  }

  override componentWillUnmount() {
    this.props.unsubscribe(this.props.appName);
  }

  override render() {
    const { isValid, pipelineName, pipelineState } = this.state;
    const pipeline = pipelineName && pipelines[pipelineName];

    const { component, description, props } = pipeline;
    const PipelineForm = component;

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
              id="PipelineNameSelect"
              label=""
              value={pipelineName}
              onChange={this.handleChangePipeline}
            >
              <option value="">— Please select —</option>
              {Object.keys(pipelines).map((pipeline) => (
                <option value={pipeline} key={pipeline}>
                  {pipeline}
                </option>
              ))}
            </NativeSelect>

            {description && (
              <Typography
                className="input-label"
                as="span"
                group="navigation"
                variant="label"
                token={{ color: 'currentColor' }}
              >
                {description}
              </Typography>
            )}
          </div>

          {PipelineForm && (
            <PipelineForm
              onChange={this.handlePipelineStateChange}
              {...pick(this.props, props)}
              {...pipelineState}
            />
          )}

          <div className="o-action-bar">
            {this.props.creationState === RequestState.IN_PROGRESS && (
              <div>
                <CircularProgress size={16} /> Creating…
              </div>
            )}
            {this.props.creationState === RequestState.FAILURE && (
              <Alert type="danger">
                Failed to create job. {this.props.creationError}
              </Alert>
            )}
            <div>
              <Button disabled={!isValid} type="submit">
                Create job
              </Button>
            </div>
          </div>
        </fieldset>
      </form>
    );
  }
}

function mapStateToProps(state: RootState): CreateJobFormState {
  return {
    creationState: getCreationState(state),
    creationError: getCreationError(state),
    branches: getEnvironmentBranches(state),
    environments: getEnvironmentSummaries(state),
    deployments: [...getMemoizedDeployments(state)],
  };
}

function mapDispatchToProps(dispatch: Dispatch): CreateJobFormDispatch {
  return {
    requestCreate: (job) => dispatch(jobActions.addJobRequest(job)),
    subscribe: (appName) => {
      dispatch(subscribeApplication(appName));
      dispatch(subscribeDeployments(appName));
    },
    unsubscribe: (appName) => {
      dispatch(unsubscribeApplication(appName));
      dispatch(unsubscribeDeployments(appName));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateJobForm);
