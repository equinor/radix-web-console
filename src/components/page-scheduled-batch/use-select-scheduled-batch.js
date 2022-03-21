import { usePollingJson } from '../../effects';

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

  return usePollingJson(path, 5000);
};

export default useSelectScheduledBatch;
