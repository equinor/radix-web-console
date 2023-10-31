import { usePollingPlain } from '../../effects';
import { AsyncPollingResult } from '../../effects/use-async-polling';

export function usePollJobStepLogs(
  appName: string,
  jobName: string,
  stepName: string,
  interval?: number
): AsyncPollingResult<string> {
  const encAppName = encodeURIComponent(appName);
  const encJobName = encodeURIComponent(jobName);
  const encStepName = encodeURIComponent(stepName);

  return usePollingPlain(
    `/applications/${encAppName}/jobs/${encJobName}/logs/${encStepName}?lines=1000`,
    interval
  );
}
