// ProgressStatus from RadixJobScheduler Api (radix-job-scheduler/models/common/progress-status.go)
export enum JobSchedulerProgressStatus {
  Running = 'Running',
  Succeeded = 'Succeeded',
  Failed = 'Failed',
  Waiting = 'Waiting',
  Stopping = 'Stopping',
  Stopped = 'Stopped',
  DeadlineExceeded = 'DeadlineExceeded',
  Unsupported = 'Unsupported',
}
