import { ProgressStatus } from '../../models/progress-status';
import { PipelineRunStatus } from '../../models/radix-api/jobs/pipeline-run-status';
import { PipelineTaskRunStatus } from '../../models/radix-api/jobs/pipeline-task-run-status';

export const getExecutionState = (status: ProgressStatus): string => {
  switch (status) {
    case ProgressStatus.Queued:
      return 'will execute';
    case ProgressStatus.Running:
      return 'Executing';
    case ProgressStatus.Failed:
    case ProgressStatus.Succeeded:
    case ProgressStatus.Stopped:
      return 'Executed';
    default:
      return '';
  }
};

export const getRunExecutionState = (status: PipelineRunStatus): string => {
  switch (status) {
    case PipelineRunStatus.Started:
      return 'will execute';
    case PipelineRunStatus.Running:
      return 'Executing';
    case PipelineRunStatus.Failed:
    case PipelineRunStatus.Completed:
    case PipelineRunStatus.CreateRunFailed:
    case PipelineRunStatus.PipelineRunTimeout:
    case PipelineRunStatus.Succeeded:
    case PipelineRunStatus.Cancelled:
      return 'Executed';
  }
};

export const getTaskRunExecutionState = (
  status: PipelineTaskRunStatus
): string => {
  switch (status) {
    case PipelineTaskRunStatus.Started:
    case PipelineTaskRunStatus.Pending:
      return 'will execute';
    case PipelineTaskRunStatus.Running:
      return 'Executing';
    case PipelineTaskRunStatus.Succeeded:
    case PipelineTaskRunStatus.Failed:
    case PipelineTaskRunStatus.TaskRunImagePullFailed:
    case PipelineTaskRunStatus.TaskRunCancelled:
    case PipelineTaskRunStatus.TaskRunTimeout:
      return 'Executed';
  }
};
