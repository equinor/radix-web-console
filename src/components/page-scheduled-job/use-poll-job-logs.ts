import { usePollingPlain } from '../../effects';
import { AsyncPollingResult } from '../../effects/use-async-polling';

export function usePollJobLogs(
  appName: string,
  envName: string,
  jobComponentName: string,
  scheduledJobName: string
): AsyncPollingResult<string> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encScheduledJobName = encodeURIComponent(scheduledJobName);

  return usePollingPlain(
    `/applications/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/scheduledjobs/${encScheduledJobName}/logs?lines=1000`,
    5000
  );
}
