import { ProgressStatus } from '../../models/progress-status';

export const getExecutionState = (status: ProgressStatus): string => {
  switch (status) {
    case ProgressStatus.Queued:
      return 'will execute';
    case ProgressStatus.Running:
      return 'Executing';
    case ProgressStatus.Failed:
    case ProgressStatus.Succeeded:
    case ProgressStatus.Stopped:
      return 'Executed';
    default:
      return '';
  }
};
