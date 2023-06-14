// https://tekton.dev/docs/pipelines/taskruns/#monitoring-execution-status
export enum PipelineTaskRunStatus {
  Started = 'Started', // status: unknown
  Pending = 'Pending', // status: unknown
  Running = 'Running', // status: unknown
  TaskRunCancelled = 'TaskRunCancelled', // status: unknown | false
  Succeeded = 'Succeeded', // status: true
  Failed = 'Failed', // status: false
  TaskRunTimeout = 'TaskRunTimeout', // status: false
  TaskRunImagePullFailed = 'TaskRunImagePullFailed', // status: false
}
