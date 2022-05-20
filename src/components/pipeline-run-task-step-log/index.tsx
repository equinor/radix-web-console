import * as PropTypes from 'prop-types';
import './style.css';
import { RootState } from '../../init/store';
import { Dispatch } from 'redux';
import {
  subscribePipelineRunTaskStepLog,
  unsubscribePipelineRunTaskStepLog,
} from '../../state/subscriptions/action-creators';
import { mapRouteParamsToProps } from '../../utils/routing';
import { connect } from 'react-redux';
import { getPipelineRunTaskStepLog } from '../../state/pipeline-run-task-step-log';
import { Component } from 'react';

export interface PagePipelineRunTaskStepLogSubscription {
  subscribe: (
    appName: string,
    jobName: string,
    pipelineRunName: string,
    taskName: string,
    stepName: string
  ) => void;
  unsubscribe: (
    appName: string,
    jobName: string,
    pipelineRunName: string,
    taskName: string,
    stepName: string
  ) => void;
}

export interface PipelineRunTaskStepLogProps
  extends PagePipelineRunTaskStepLogSubscription {
  appName: string;
  jobName: string;
  pipelineRunName: string;
  taskName: string;
  stepName: string;
  stepLog?: string;
}

export class PipelineRunTaskStepLog extends Component<
  PipelineRunTaskStepLogProps,
  { now: Date }
> {
  static readonly propTypes: PropTypes.ValidationMap<PipelineRunTaskStepLogProps> =
    {
      appName: PropTypes.string.isRequired,
      jobName: PropTypes.string.isRequired,
      pipelineRunName: PropTypes.string.isRequired,
      taskName: PropTypes.string.isRequired,
      stepName: PropTypes.string.isRequired,
      stepLog: PropTypes.string,
      subscribe: PropTypes.func.isRequired,
      unsubscribe: PropTypes.func.isRequired,
    };
  constructor(props: PipelineRunTaskStepLogProps) {
    super(props);
    this.state = { now: new Date() };
  }

  override componentDidMount() {
    const { subscribe, appName, jobName, pipelineRunName, taskName, stepName } =
      this.props;
    subscribe(appName, jobName, pipelineRunName, taskName, stepName);
  }

  override componentWillUnmount() {
    const {
      unsubscribe,
      appName,
      jobName,
      pipelineRunName,
      taskName,
      stepName,
    } = this.props;
    unsubscribe(appName, jobName, pipelineRunName, taskName, stepName);
  }

  override componentDidUpdate(prevProps: PipelineRunTaskStepLogProps) {
    const {
      subscribe,
      unsubscribe,
      appName,
      jobName,
      pipelineRunName,
      taskName,
      stepName,
    } = this.props;

    if (
      prevProps.jobName !== jobName ||
      prevProps.appName !== appName ||
      prevProps.pipelineRunName !== pipelineRunName ||
      prevProps.taskName !== taskName ||
      prevProps.stepName !== stepName
    ) {
      unsubscribe(
        appName,
        prevProps.jobName,
        prevProps.pipelineRunName,
        prevProps.taskName,
        prevProps.stepName
      );
      subscribe(appName, jobName, pipelineRunName, taskName, stepName);
    }
  }

  override render() {
    const { appName, jobName, pipelineRunName, taskName, stepName, stepLog } =
      this.props;
    return (
      <>
        <main className="grid grid--gap-large">
          <></>
        </main>
      </>
    );
  }
}

const mapStateToProps = (
  state: RootState,
  ownProps: PipelineRunTaskStepLog
) => {
  return {
    stepLog: getPipelineRunTaskStepLog(state),
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch
): PagePipelineRunTaskStepLogSubscription => ({
  subscribe: (appName, jobName, pipelineRunName, taskName, stepName) => {
    dispatch(
      subscribePipelineRunTaskStepLog(
        appName,
        jobName,
        pipelineRunName,
        taskName,
        stepName
      )
    );
  },
  unsubscribe: (appName, jobName, pipelineRunName, taskName, stepName) => {
    dispatch(
      unsubscribePipelineRunTaskStepLog(
        appName,
        jobName,
        pipelineRunName,
        taskName,
        stepName
      )
    );
  },
});

export default mapRouteParamsToProps(
  ['appName', 'jobName', 'pipelineRunName', 'taskName', 'stepName'],
  connect(mapStateToProps, mapDispatchToProps)(PipelineRunTaskStepLog)
);
