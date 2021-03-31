import { usePollingPlain } from '../../effects';

const usePollLogs = (
  appName,
  deploymentName,
  componentName,
  scheduledJobName
) => {
  const encAppName = encodeURIComponent(appName);
  const encDeployName = encodeURIComponent(deploymentName);
  const encComponentName = encodeURIComponent(componentName);
  const encScheduledJobName = encodeURIComponent(scheduledJobName);
  const path = `/applications/${encAppName}/deployments/${encDeployName}/components/${encComponentName}/scheduledjob/${encScheduledJobName}/logs`;

  return usePollingPlain(path, 5000);
};

export default usePollLogs;
