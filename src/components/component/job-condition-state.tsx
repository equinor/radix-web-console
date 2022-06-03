import { RadixJobCondition } from '../../models/radix-job-condition';

export const getJobConditionState = (status: RadixJobCondition): string => {
  switch (status) {
    case RadixJobCondition.Queued:
      return 'will execute';
    case RadixJobCondition.Running:
      return 'Executing';
    case RadixJobCondition.Failed:
    case RadixJobCondition.Succeeded:
    case RadixJobCondition.Stopped:
      return 'Executed';
    default:
      return '';
  }
};
