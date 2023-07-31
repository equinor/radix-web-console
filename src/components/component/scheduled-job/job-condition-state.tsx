import { RadixJobCondition } from '../../../models/radix-api/jobs/radix-job-condition';

export const getJobConditionState = (status: RadixJobCondition): string => {
  switch (status) {
    case RadixJobCondition.Queued:
      return 'will execute';
    case RadixJobCondition.Running:
      return 'Executing';
    case RadixJobCondition.Failed:
    case RadixJobCondition.Succeeded:
    case RadixJobCondition.Stopped:
    case RadixJobCondition.StoppedNoChanges:
      return 'Executed';
    default:
      return '';
  }
};
