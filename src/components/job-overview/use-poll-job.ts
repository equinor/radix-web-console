import { usePollingJson } from '../../effects';
import { AsyncPollingResult } from '../../effects/use-async-polling';
import { JobModel } from '../../models/job';
import { JobModelNormalizer } from '../../models/job/normalizer';

export function usePollJob(
  appName: string,
  jobName: string
): AsyncPollingResult<Readonly<JobModel>> {
  const encAppName = encodeURIComponent(appName);
  const encJobName = encodeURIComponent(jobName);

  return usePollingJson(
    `/applications/${encAppName}/jobs/${encJobName}`,
    8000,
    JobModelNormalizer
  );
}
