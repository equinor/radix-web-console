import { usePollingJson } from '../../effects';
import { AsyncPollingResult } from '../../effects/use-async-polling';
import { normaliser as jobNormaliser } from '../../models/job/normaliser';

// TODO: Type JobModel
export function usePollJob(
  appName: string,
  jobName: string
): AsyncPollingResult<Readonly<any>> {
  const encAppName = encodeURIComponent(appName);
  const encJobName = encodeURIComponent(jobName);

  return usePollingJson(
    `/applications/${encAppName}/jobs/${encJobName}`,
    8000,
    jobNormaliser
  );
}
