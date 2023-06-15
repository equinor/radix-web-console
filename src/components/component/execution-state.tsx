import { PipelineRunReason } from '../../models/radix-api/jobs/pipeline-run-reason';
import { PipelineTaskRunReason } from '../../models/radix-api/jobs/pipeline-task-run-reason';
import { ProgressStatus } from '../../models/radix-api/jobs/progress-status';

export const getExecutionState = (status: ProgressStatus): string => {
  switch (status) {
    case ProgressStatus.Waiting:
      return 'will execute';
    case ProgressStatus.Running:
    case ProgressStatus.Stopping:
      return 'Executing';
    case ProgressStatus.Failed:
    case ProgressStatus.Stopped:
    case ProgressStatus.StoppedNoChanges:
    case ProgressStatus.Succeeded:
      return 'Executed';
    case ProgressStatus.Unsupported:
      return '';
  }
};

export const getRunExecutionState = (status: PipelineRunReason): string => {
  switch (status) {
    case PipelineRunReason.PipelineRunPending:
    case PipelineRunReason.Started:
      return 'will execute';
    case PipelineRunReason.PipelineRunStopping:
    case PipelineRunReason.Running:
      return 'Executing';
    case PipelineRunReason.Cancelled:
    case PipelineRunReason.CancelledRunningFinally:
    case PipelineRunReason.Completed:
    case PipelineRunReason.Failed:
    case PipelineRunReason.PipelineRunTimeout:
    case PipelineRunReason.StoppedRunningFinally:
    case PipelineRunReason.Succeeded:
      return 'Executed';
  }
};

export const getTaskRunExecutionState = (
  status: PipelineTaskRunReason
): string => {
  switch (status) {
    case PipelineTaskRunReason.AwaitingTaskRunResults:
    case PipelineTaskRunReason.Started:
      return 'will execute';
    case PipelineTaskRunReason.Running:
      return 'Executing';
    case PipelineTaskRunReason.Completed:
    case PipelineTaskRunReason.Failed:
    case PipelineTaskRunReason.Succeeded:
    case PipelineTaskRunReason.TaskRunCancelled:
    case PipelineTaskRunReason.TaskRunImagePullFailed:
    case PipelineTaskRunReason.TaskRunTimeout:
      return 'Executed';
    case PipelineTaskRunReason.ResolvingTaskRef:
    case PipelineTaskRunReason.TaskRunResultsVerificationFailed:
    case PipelineTaskRunReason.TaskRunResultsVerified:
      return '';
  }
};
