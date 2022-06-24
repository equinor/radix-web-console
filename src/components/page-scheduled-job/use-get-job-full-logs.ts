import { useGetPlainText, usePollingPlain } from '../../effects';
import { AsyncPollingResult } from '../../effects/use-async-polling';
import { AsyncRequestResult } from '../../effects/use-async-request';

export function useGetFullJobLogs(
  appName: string,
  envName: string,
  jobComponentName: string,
  scheduledJobName: string
): AsyncRequestResult<string, void> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encScheduledJobName = encodeURIComponent(scheduledJobName);

  return useGetPlainText(
    `/applications/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/scheduledjobs/${encScheduledJobName}/logs?file=true`
  );
}
