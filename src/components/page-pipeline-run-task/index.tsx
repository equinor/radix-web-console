import routes from '../../routes';
import { mapRouteParamsToProps } from '../../utils/routing';
import { Breadcrumb } from '../breadcrumb';
import { routeWithParams, smallJobName } from '../../utils/string';
import { RootState } from '../../init/store';
import {
  subscribePipelineRunTask,
  subscribePipelineRunTaskSteps,
  unsubscribePipelineRunTask,
  unsubscribePipelineRunTaskSteps,
} from '../../state/subscriptions/action-creators';
import { connect } from 'react-redux';
import AsyncResource from '../async-resource';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { Dispatch } from 'redux';
import { getPipelineRunTask } from '../../state/pipeline-run-task';
import {
  PipelineRunTaskModel,
  PipelineRunTaskModelValidationMap,
} from '../../models/pipeline-run-task';
import { Typography } from '@equinor/eds-core-react';
import PipelineRunTask from '../pipeline-run-task';
import { PipelineRunTaskSteps } from '../pipeline-run-task-steps';
import { getPipelineRunTaskSteps } from '../../state/pipeline-run-task-steps';
import {
  PipelineRunTaskStepModel,
  PipelineRunTaskStepModelValidationMap,
} from '../../models/pipeline-run-task-step';

export interface PageSubscription {
  subscribe: (
    appName: string,
    jobName: string,
    pipelineRunName: string,
    taskName: string
  ) => void;
  unsubscribe: (
    appName: string,
    jobName: string,
    pipelineRunName: string,
    taskName: string
  ) => void;
}

export interface PagePipelineRunTaskProps extends PageSubscription {
  appName: string;
  jobName: string;
  pipelineRunName: string;
  taskName: string;
  task: PipelineRunTaskModel;
  steps: Array<PipelineRunTaskStepModel>;
}

export class PagePipelineRunTask extends Component<
  PagePipelineRunTaskProps,
  { now: Date }
> {
  static readonly propTypes: PropTypes.ValidationMap<PagePipelineRunTaskProps> =
    {
      appName: PropTypes.string.isRequired,
      jobName: PropTypes.string.isRequired,
      pipelineRunName: PropTypes.string.isRequired,
      taskName: PropTypes.string.isRequired,
      task: PropTypes.shape(
        PipelineRunTaskModelValidationMap
      ) as PropTypes.Requireable<PipelineRunTaskModel>,
      steps: PropTypes.arrayOf(
        PropTypes.shape(
          PipelineRunTaskStepModelValidationMap
        ) as PropTypes.Requireable<PipelineRunTaskStepModel>
      ),
      subscribe: PropTypes.func.isRequired,
      unsubscribe: PropTypes.func.isRequired,
    };

  constructor(props: PagePipelineRunTaskProps) {
    super(props);
    this.state = { now: new Date() };
  }

  override componentDidMount() {
    const { subscribe, appName, jobName, pipelineRunName, taskName } =
      this.props;
    subscribe(appName, jobName, pipelineRunName, taskName);
  }

  override componentWillUnmount() {
    const { unsubscribe, appName, jobName, pipelineRunName, taskName } =
      this.props;
    unsubscribe(appName, jobName, pipelineRunName, taskName);
  }

  override componentDidUpdate(prevProps: PagePipelineRunTaskProps) {
    const {
      subscribe,
      unsubscribe,
      appName,
      jobName,
      pipelineRunName,
      taskName,
    } = this.props;

    if (prevProps.jobName !== jobName || prevProps.appName !== appName) {
      unsubscribe(
        appName,
        prevProps.jobName,
        prevProps.pipelineRunName,
        prevProps.taskName
      );
      subscribe(appName, jobName, pipelineRunName, taskName);
    }
  }

  override render() {
    const { appName, jobName, pipelineRunName, taskName, task, steps } =
      this.props;
    return (
      <>
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            {
              label: 'Pipeline Jobs',
              to: routeWithParams(routes.appJobs, { appName }),
            },
            {
              label: smallJobName(jobName),
              to: routeWithParams(routes.appJob, { appName, jobName }),
            },
            {
              label: 'Run pipelines',
              to: routeWithParams(routes.appJobStep, {
                appName,
                jobName,
                stepName: 'run-pipelines',
              }),
            },
            {
              label: task ? task.pipelineRunEnv + ':' + task.pipelineName : '',
              to: routeWithParams(routes.appPipelineRun, {
                appName,
                jobName,
                pipelineRunName,
              }),
            },
            { label: task?.name },
          ]}
        />
        {task ? (
          <AsyncResource
            resource="PIPELINE_RUN_TASK"
            resourceParams={[appName, jobName, pipelineRunName, taskName]}
          >
            <PipelineRunTask task={task} />
          </AsyncResource>
        ) : (
          <Typography>Loading...</Typography>
        )}
        {steps ? (
          <AsyncResource
            resource="PIPELINE_RUN_TASK_STEPS"
            resourceParams={[appName, jobName, pipelineRunName, taskName]}
          >
            <PipelineRunTaskSteps steps={steps}></PipelineRunTaskSteps>
          </AsyncResource>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </>
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  task: getPipelineRunTask(state),
  steps: getPipelineRunTaskSteps(state),
});

const mapDispatchToProps = (dispatch: Dispatch): PageSubscription => ({
  subscribe: (appName, jobName, pipelineRunName, taskName) => {
    dispatch(
      subscribePipelineRunTask(appName, jobName, pipelineRunName, taskName)
    );
    dispatch(
      subscribePipelineRunTaskSteps(appName, jobName, pipelineRunName, taskName)
    );
  },
  unsubscribe: (appName, jobName, pipelineRunName, taskName) => {
    dispatch(
      unsubscribePipelineRunTask(appName, jobName, pipelineRunName, taskName)
    );
    dispatch(
      unsubscribePipelineRunTaskSteps(
        appName,
        jobName,
        pipelineRunName,
        taskName
      )
    );
  },
});

export default mapRouteParamsToProps(
  ['appName', 'jobName', 'pipelineRunName', 'taskName'],
  connect(mapStateToProps, mapDispatchToProps)(PagePipelineRunTask)
);
