import { usePollingPlain } from '../../effects';

const usePollLogs = (
  appName,
  envName,
  jobComponentName,
  scheduledBatchName
) => {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encScheduledBatchName = encodeURIComponent(scheduledBatchName);
  const path = `/applications/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/scheduledjobs/${encScheduledBatchName}/logs`;

  return usePollingPlain(path, 5000);
};

export default usePollLogs;
