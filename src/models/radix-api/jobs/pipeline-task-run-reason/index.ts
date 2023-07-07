// v0.41.0 v1beta1 referenced by API
// https://github.com/tektoncd/pipeline/blob/v0.41.0/pkg/apis/pipeline/v1beta1/taskrun_types.go#L158
export enum PipelineTaskRunReason {
  Completed = 'Completed', // exclusive reason for Sidecar or Step
  Started = 'Started',
  Running = 'Running',
  Succeeded = 'Succeeded',
  Failed = 'Failed',
  TaskRunCancelled = 'TaskRunCancelled',
  TaskRunTimeout = 'TaskRunTimeout',
  ResolvingTaskRef = 'ResolvingTaskRef',
  TaskRunImagePullFailed = 'TaskRunImagePullFailed',
  TaskRunResultsVerified = 'TaskRunResultsVerified',
  TaskRunResultsVerificationFailed = 'TaskRunResultsVerificationFailed',
  AwaitingTaskRunResults = 'AwaitingTaskRunResults',
}
