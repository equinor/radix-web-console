import { usePollingJson } from '../../effects';

export const useSelectScheduledJob = (
  appName,
  envName,
  jobComponentName,
  scheduledJobName
) => {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encScheduledJobName = encodeURIComponent(scheduledJobName);
  const path = `/applications/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/jobs/${encScheduledJobName}`;

  return usePollingJson(path, 5000);
};

export default useSelectScheduledJob;
