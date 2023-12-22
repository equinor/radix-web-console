import { PipelineRunReason } from '../../models/radix-api/jobs/pipeline-run-reason';
import { PipelineTaskRunReason } from '../../models/radix-api/jobs/pipeline-task-run-reason';
import { RadixJobCondition } from '../../models/radix-api/jobs/radix-job-condition';
import { Job } from '../../store/radix-api';

export function getExecutionState(
  status: Job['status'] | RadixJobCondition
): string {
  switch (status as Job['status']) {
    case 'Waiting':
    case 'Queued':
      return 'Will execute';
    case 'Running':
      return 'Executing';
    case 'Stopping':
      return 'Stopping';
    case 'Failed':
    case 'Stopped':
    case 'StoppedNoChanges':
    case 'Succeeded':
      return 'Executed';
  }
}

export function getRunExecutionState(status: PipelineRunReason): string {
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
}

export function getTaskRunExecutionState(
  status: PipelineTaskRunReason
): string {
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
}
