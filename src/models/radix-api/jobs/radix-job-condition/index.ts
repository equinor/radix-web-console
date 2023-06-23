export enum RadixJobCondition {
  Queued = 'Queued',
  Waiting = 'Waiting',
  Running = 'Running',
  Succeeded = 'Succeeded',
  Failed = 'Failed',
  Stopped = 'Stopped',
  StoppedNoChanges = 'StoppedNoChanges',
  Stopping = 'Stopping', // on "specStop && Condition != Stopped"
}
