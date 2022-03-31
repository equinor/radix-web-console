import { usePollingJson } from '../../effects';
import { AsyncPollingResult } from '../../effects/use-async-polling';
import { ScheduledJobSummaryModel } from '../../models/scheduled-job-summary';
import { ScheduledJobSummaryModelNormalizer } from '../../models/scheduled-job-summary/normalizer';

export const useSelectScheduledJob = (
  appName: string,
  envName: string,
  jobComponentName: string,
  scheduledJobName: string
): AsyncPollingResult<Readonly<ScheduledJobSummaryModel>> => {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encScheduledJobName = encodeURIComponent(scheduledJobName);

  const [state, poll] = usePollingJson<ScheduledJobSummaryModel>(
    `/applications/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/jobs/${encScheduledJobName}`,
    5000
  );
  state.data = state.data && ScheduledJobSummaryModelNormalizer(state.data);
  return [state, poll];
};
