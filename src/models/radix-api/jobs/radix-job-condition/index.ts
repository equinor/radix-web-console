export enum RadixJobCondition {
  Queued = 'Queued',
  Waiting = 'Waiting',
  Running = 'Running',
  Succeeded = 'Succeeded',
  Failed = 'Failed',
  Stopped = 'Stopped',
  Stopping = 'Stopping', // on "specStop && Condition != Stopped"
  StoppedNoChanges = 'StoppedNoChanges',
}
