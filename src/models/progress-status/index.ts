export enum ProgressStatus {
  Running = 'Running',
  Succeeded = 'Succeeded',
  Failed = 'Failed',
  Waiting = 'Waiting',
  Stopping = 'Stopping',
  Stopped = 'Stopped',

  // these are not part of ProgressStatus!
  Pending = 'Pending',
  Queued = 'Queued',
  Idle = 'Idle',
}
