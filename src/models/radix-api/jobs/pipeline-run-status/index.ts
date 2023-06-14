// https://tekton.dev/docs/pipelines/pipelineruns/#monitoring-execution-status
export enum PipelineRunStatus {
  Started = 'Started', // status: unknown
  Running = 'Running', // status:  unknown
  Cancelled = 'Cancelled', // status:  unknown | false
  Succeeded = 'Succeeded', // status: true
  Completed = 'Completed', // status: true
  Failed = 'Failed', // status: false
  PipelineRunTimeout = 'PipelineRunTimeout', // status: false
  CreateRunFailed = 'CreateRunFailed', // status: false
}
