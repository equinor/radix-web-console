import { useFetchPlain } from '../../../effects';
import { AsyncLoadingResult } from '../../../effects/use-async-loading';

export function useFetchPayload(
  appName: string,
  envName: string,
  jobComponentName: string,
  jobName: string
): AsyncLoadingResult<string> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encJobName = encodeURIComponent(jobName);

  return useFetchPlain(
    `/applications/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/jobs/${encJobName}/payload`
  );
}
