import { PipelineRunReason } from '../../models/radix-api/jobs/pipeline-run-reason';
import { PipelineTaskRunReason } from '../../models/radix-api/jobs/pipeline-task-run-reason';
import { RadixJobCondition } from '../../models/radix-api/jobs/radix-job-condition';

export const getExecutionState = (status: RadixJobCondition): string => {
  switch (status) {
    case RadixJobCondition.Waiting:
    case RadixJobCondition.Queued:
      return 'Will execute';
    case RadixJobCondition.Running:
      return 'Executing';
    case RadixJobCondition.Stopping:
      return 'Stopping';
    case RadixJobCondition.Failed:
    case RadixJobCondition.Stopped:
    case RadixJobCondition.StoppedNoChanges:
    case RadixJobCondition.Succeeded:
      return 'Executed';
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
