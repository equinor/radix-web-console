import type {
  Job,
  PipelineRun,
  PipelineRunTask,
  PipelineRunTaskStep,
} from '../../store/radix-api';

type StepRunReason = PipelineRunTaskStep['status'];
type TaskRunReason = PipelineRunTask['status'];
type PipelineRunReason = PipelineRun['status'];
type JobReason = Job['status'];

export function getJobExecutionState(status: JobReason): string {
  switch (status) {
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
    case undefined:
      return 'unknown';
  }
}
export function getPipelineRunExecutionState(
  status: PipelineRunReason
): string {
  switch (status) {
    case 'Started':
    case 'ToBeRetried':
      return 'will execute';

    case 'Running':
      return 'Executing';

    case 'Succeeded':
    case 'Failed':
    case 'TaskRunCancelled':
    case 'TaskRunTimeout':
      return 'Executed';

    case 'TaskRunImagePullFailed':
    case 'TaskRunResultLargerThanAllowedLimit':
    case 'TaskRunStopSidecarFailed':
    case 'InvalidParamValue':
    case 'TaskRunResolutionFailed':
    case 'TaskRunValidationFailed':
    case 'TaskValidationFailed':
    case 'ResourceVerificationFailed':
    case 'FailureIgnored':
      return 'Failed';
    case undefined:
      return 'unknown';
  }
}

export function getTaskRunExecutionState(status: TaskRunReason): string {
  switch (status) {
    case 'Started':
    case 'PipelineRunPending':
    case 'ResolvingPipelineRef':
      return 'will execute';

    case 'Running':
    case 'PipelineRunStopping':
      return 'Executing';

    case 'Succeeded':
    case 'Completed':
    case 'Failed':
    case 'Cancelled':
    case 'CancelledRunningFinally':
    case 'StoppedRunningFinally':
      return 'Executed';

    case 'PipelineRunTimeout':
    case 'CouldntGetPipeline':
    case 'InvalidPipelineResourceBindings':
    case 'InvalidWorkspaceBindings':
    case 'InvalidTaskRunSpecs':
    case 'ParameterTypeMismatch':
    case 'ObjectParameterMissKeys':
    case 'ParamArrayIndexingInvalid':
    case 'CouldntGetTask':
    case 'ParameterMissing':
    case 'PipelineValidationFailed':
    case 'CouldntGetPipelineResult':
    case 'PipelineInvalidGraph':
    case 'PipelineRunCouldntCancel':
    case 'PipelineRunCouldntTimeOut':
    case 'InvalidMatrixParameterTypes':
    case 'InvalidTaskResultReference':
    case 'RequiredWorkspaceMarkedOptional':
    case 'ResourceVerificationFailed':
    case 'CreateRunFailed':
    case 'CELEvaluationFailed':
    case 'InvalidParamValue':
      return 'Failed';
    case undefined:
      return 'unknown';
  }
}

export function getStepTaskRunExecutionState(status: StepRunReason): string {
  switch (status) {
    case 'Started':
    case 'ToBeRetried':
      return 'will execute';

    case 'Running':
      return 'Executing';

    case 'Succeeded':
    case 'Failed':
    case 'TaskRunCancelled':
    case 'TaskRunTimeout':
    case 'TaskRunImagePullFailed':
      return 'Executed';

    case 'TaskRunResultLargerThanAllowedLimit':
    case 'TaskRunStopSidecarFailed':
    case 'InvalidParamValue':
    case 'TaskRunResolutionFailed':
    case 'TaskRunValidationFailed':
    case 'TaskValidationFailed':
    case 'ResourceVerificationFailed':
    case 'FailureIgnored':
      return status;
    case undefined:
      return 'unknown';
  }
}
