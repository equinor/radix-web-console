import { useGetPlain } from '../../../effects';
import { AsyncRequestResult } from '../../../effects/use-async-request';

export function usePollPayload(
  appName: string,
  envName: string,
  jobComponentName: string,
  jobName: string
): AsyncRequestResult<string, void> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encJobName = encodeURIComponent(jobName);
  return useGetPlain(
    `/applications/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/jobs/${encJobName}/payload`
  );
}
