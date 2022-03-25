import { usePollingPlain } from '../../effects';

export const usePollJobLogs = (
  appName: string,
  envName: string,
  jobComponentName: string,
  scheduledJobName: string
) => {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encScheduledJobName = encodeURIComponent(scheduledJobName);
  const path = `/applications/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/scheduledjobs/${encScheduledJobName}/logs`;

  return usePollingPlain<string>(path, 5000);
};
