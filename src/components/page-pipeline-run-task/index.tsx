import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import AsyncResource from '../async-resource';
import { Breadcrumb } from '../breadcrumb';
import { PipelineRunTask } from '../pipeline-run-task';
import { PipelineRunTaskSteps } from '../pipeline-run-task-steps';
import { PipelineRunTaskStepLog } from '../pipeline-run-task-step-log';
import { RootState } from '../../init/store';
import {
  PipelineRunTaskModel,
  PipelineRunTaskModelValidationMap,
} from '../../models/radix-api/jobs/pipeline-run-task';
import {
  PipelineRunTaskStepModel,
  PipelineRunTaskStepModelValidationMap,
} from '../../models/radix-api/jobs/pipeline-run-task-step';
import { getMemoizedPipelineRunTask } from '../../state/pipeline-run-task';
import { getPipelineRunTaskSteps } from '../../state/pipeline-run-task-steps';
import { routes } from '../../routes';
import {
  subscribePipelineRunTask,
  subscribePipelineRunTaskSteps,
  unsubscribePipelineRunTask,
  unsubscribePipelineRunTaskSteps,
} from '../../state/subscriptions/action-creators';
import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams, smallJobName } from '../../utils/string';

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

export interface PagePipelineRunTaskState {
  task?: PipelineRunTaskModel;
  steps?: Array<PipelineRunTaskStepModel>;
}

export interface PagePipelineRunTaskProps
  extends PageSubscription,
    PagePipelineRunTaskState {
  appName: string;
  jobName: string;
  pipelineRunName: string;
  taskName: string;
}

export class PagePipelineRunTask extends Component<PagePipelineRunTaskProps> {
  static readonly propTypes: PropTypes.ValidationMap<PagePipelineRunTaskProps> =
    {
      appName: PropTypes.string.isRequired,
      jobName: PropTypes.string.isRequired,
      pipelineRunName: PropTypes.string.isRequired,
      taskName: PropTypes.string.isRequired,
      task: PropTypes.shape(
        PipelineRunTaskModelValidationMap
      ) as PropTypes.Validator<PipelineRunTaskModel>,
      steps: PropTypes.arrayOf(
        PropTypes.shape(
          PipelineRunTaskStepModelValidationMap
        ) as PropTypes.Validator<PipelineRunTaskStepModel>
      ),
      subscribe: PropTypes.func.isRequired,
      unsubscribe: PropTypes.func.isRequired,
    };

  override componentDidMount() {
    const { appName, jobName, pipelineRunName, taskName } = this.props;
    this.props.subscribe(appName, jobName, pipelineRunName, taskName);
  }

  override componentWillUnmount() {
    const { appName, jobName, pipelineRunName, taskName } = this.props;
    this.props.unsubscribe(appName, jobName, pipelineRunName, taskName);
  }

  override componentDidUpdate(prevProps: Readonly<PagePipelineRunTaskProps>) {
    const { appName, jobName, pipelineRunName, taskName } = this.props;

    if (prevProps.jobName !== jobName || prevProps.appName !== appName) {
      this.props.unsubscribe(
        appName,
        prevProps.jobName,
        prevProps.pipelineRunName,
        prevProps.taskName
      );
      this.props.subscribe(appName, jobName, pipelineRunName, taskName);
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
              label: 'Run sub-pipeline',
              to: routeWithParams(routes.appJobStep, {
                appName,
                jobName,
                stepName: 'run-pipelines',
              }),
            },
            {
              label: task ? `${task.pipelineRunEnv}:${task.pipelineName}` : '',
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
          <Typography>Loading…</Typography>
        )}

        {steps ? (
          <AsyncResource
            resource="PIPELINE_RUN_TASK_STEPS"
            resourceParams={[appName, jobName, pipelineRunName, taskName]}
          >
            <PipelineRunTaskSteps steps={steps}></PipelineRunTaskSteps>

            {steps.map(({ name }, _, { length }) => (
              <PipelineRunTaskStepLog
                key={name}
                appName={appName}
                jobName={jobName}
                pipelineRunName={pipelineRunName}
                taskName={taskName}
                stepName={name}
                title={length > 1 ? `Log for step: ${name}` : 'Log'}
              />
            ))}
          </AsyncResource>
        ) : (
          <Typography>Loading…</Typography>
        )}
      </>
    );
  }
}

function mapStateToProps(state: RootState): PagePipelineRunTaskState {
  return {
    task: getMemoizedPipelineRunTask(state),
    steps: getPipelineRunTaskSteps(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): PageSubscription {
  return {
    subscribe: (appName, jobName, pipelineRunName, taskName) => {
      dispatch(
        subscribePipelineRunTask(appName, jobName, pipelineRunName, taskName)
      );
      dispatch(
        subscribePipelineRunTaskSteps(
          appName,
          jobName,
          pipelineRunName,
          taskName
        )
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
  };
}

export default mapRouteParamsToProps(
  ['appName', 'jobName', 'pipelineRunName', 'taskName'],
  connect(mapStateToProps, mapDispatchToProps)(PagePipelineRunTask)
);
