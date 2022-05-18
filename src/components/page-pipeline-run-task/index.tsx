import DocumentTitle from '../document-title';
import routes from '../../routes';
import { mapRouteParamsToProps } from '../../utils/routing';
import { Breadcrumb } from '../breadcrumb';
import { routeWithParams, smallJobName } from '../../utils/string';
import { RootState } from '../../init/store';
import {
  subscribePipelineRunTask,
  unsubscribePipelineRunTask,
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
import RelativeToNow from '../time/relative-to-now';
import pipelineRun from '../pipeline-run';
import PipelineRunTask from '../pipeline-run-task';

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
    const { appName, jobName, pipelineRunName, taskName, task } = this.props;
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
        {task && (
          <AsyncResource
            resource="PIPELINE_RUN_TASK"
            resourceParams={[appName, jobName, pipelineRunName, taskName]}
          >
            <PipelineRunTask task={task} />
          </AsyncResource>
        )}
      </>
    );
  }
}
const mapStateToProps = (state: RootState) => ({
  task: getPipelineRunTask(state),
});

const mapDispatchToProps = (dispatch: Dispatch): PageSubscription => ({
  subscribe: (appName, jobName, pipelineRunName, taskName) => {
    dispatch(
      subscribePipelineRunTask(appName, jobName, pipelineRunName, taskName)
    );
  },
  unsubscribe: (appName, jobName, pipelineRunName, taskName) => {
    dispatch(
      unsubscribePipelineRunTask(appName, jobName, pipelineRunName, taskName)
    );
  },
});

export default mapRouteParamsToProps(
  ['appName', 'jobName', 'pipelineRunName', 'taskName'],
  connect(mapStateToProps, mapDispatchToProps)(PagePipelineRunTask)
);
