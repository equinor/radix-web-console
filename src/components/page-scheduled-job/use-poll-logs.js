import { usePollingPlain } from '../../effects';

const usePollLogs = (appName, envName, jobComponentName, scheduledJobName) => {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encScheduledJobName = encodeURIComponent(scheduledJobName);
  const path = `/applications/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/scheduledjobs/${encScheduledJobName}/logs`;

  return usePollingPlain(path, 5000);
};

export default usePollLogs;
