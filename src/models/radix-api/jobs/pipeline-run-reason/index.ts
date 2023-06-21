// v0.41.0 v1beta1 referenced by API
// https://github.com/tektoncd/pipeline/blob/v0.41.0/pkg/apis/pipeline/v1beta1/pipelinerun_types.go#L308
export enum PipelineRunReason {
  Started = 'Started',
  Running = 'Running',
  Succeeded = 'Succeeded',
  Completed = 'Completed',
  Failed = 'Failed',
  Cancelled = 'Cancelled',
  PipelineRunPending = 'PipelineRunPending',
  PipelineRunTimeout = 'PipelineRunTimeout',
  PipelineRunStopping = 'PipelineRunStopping',
  CancelledRunningFinally = 'CancelledRunningFinally',
  StoppedRunningFinally = 'StoppedRunningFinally',
}
