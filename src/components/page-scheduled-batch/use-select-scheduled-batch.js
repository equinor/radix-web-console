import { usePollingJson } from '../../effects';
import { ScheduledBatchSummaryModelNormalizer } from '../../models/scheduled-batch-summary/normalizer';

export const useSelectScheduledBatch = (
  appName,
  envName,
  jobComponentName,
  scheduledBatchName
) => {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encScheduledBatchName = encodeURIComponent(scheduledBatchName);
  const path = `/applications/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/batches/${encScheduledBatchName}`;
  const [state, poll] = usePollingJson(path, 5000);
  return [
    {
      ...state,
      ...{
        data: state.data
          ? ScheduledBatchSummaryModelNormalizer(state.data)
          : null,
      },
    },
    poll,
  ];
};

export default useSelectScheduledBatch;
