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

export interface PageSubscription {
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

export interface PipelineRunTaskStepLogProps {
  appName?: string;
  jobName?: string;
  pipelineRunName?: string;
  taskName?: string;
  stepName?: string;
  stepLog?: string;
}

export class PipelineRunTaskStepLog extends Component<
  PipelineRunTaskStepLogProps,
  { now: Date }
> {
  static readonly propTypes: PropTypes.ValidationMap<PipelineRunTaskStepLogProps> =
    {
      appName: PropTypes.string,
      jobName: PropTypes.string,
      pipelineRunName: PropTypes.string,
      taskName: PropTypes.string,
      stepName: PropTypes.string,
      stepLog: PropTypes.string,
    };
  constructor(props: PipelineRunTaskStepLogProps) {
    super(props);
    this.state = { now: new Date() };
  }

  override componentDidMount() {
    const { appName, jobName, pipelineRunName, taskName, stepName } =
      this.props;
  }

  override componentWillUnmount() {
    const { appName, jobName, pipelineRunName, taskName, stepName } =
      this.props;
  }

  override componentDidUpdate(prevProps: PipelineRunTaskStepLogProps) {
    const { appName, jobName, pipelineRunName, taskName, stepName } =
      this.props;

    if (
      prevProps.jobName !== jobName ||
      prevProps.appName !== appName ||
      prevProps.pipelineRunName !== pipelineRunName ||
      prevProps.taskName !== taskName ||
      prevProps.stepName !== stepName
    ) {
    }
  }

  override render() {
    const {
      /*appName, jobName, pipelineRunName, taskName, stepName, stepLog*/
    } = this.props;
    return (
      <>
        <main className="grid grid--gap-large">
          <>{this.props.stepName}</>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    stepLog: getPipelineRunTaskStepLog(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch): PageSubscription => ({
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
