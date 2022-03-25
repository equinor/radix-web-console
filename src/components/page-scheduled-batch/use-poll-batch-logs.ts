import { usePollingPlain } from '../../effects';

export const usePollBatchLogs = (
  appName: string,
  envName: string,
  jobComponentName: string,
  scheduledBatchName: string
) => {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encScheduledBatchName = encodeURIComponent(scheduledBatchName);
  const path = `/applications/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/scheduledjobs/${encScheduledBatchName}/logs`;

  return usePollingPlain<string>(path, 5000);
};
