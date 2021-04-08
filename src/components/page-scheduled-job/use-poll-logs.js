import { usePollingPlain } from '../../effects';

const usePollLogs = (
  appName,
  deploymentName,
  jobComponentName,
  scheduledJobName
) => {
  const encAppName = encodeURIComponent(appName);
  const encDeployName = encodeURIComponent(deploymentName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encScheduledJobName = encodeURIComponent(scheduledJobName);
  const path = `/applications/${encAppName}/deployments/${encDeployName}/jobcomponents/${encJobComponentName}/scheduledjobs/${encScheduledJobName}/logs`;

  return usePollingPlain(path, 5000);
};

export default usePollLogs;
