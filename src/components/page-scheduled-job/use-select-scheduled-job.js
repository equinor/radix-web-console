import { usePollingJson } from '../../effects';
import { ScheduledJobSummaryModelNormalizer } from '../../models/scheduled-job-summary/normalizer';

export const useSelectScheduledJob = (
  appName,
  envName,
  jobComponentName,
  scheduledJobName
) => {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);
  const encScheduledJobName = encodeURIComponent(scheduledJobName);
  const path = `/applications/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/jobs/${encScheduledJobName}`;
  const [state, poll] = usePollingJson(path, 5000);
  return [
    {
      ...state,
      ...{
        data: state.data
          ? ScheduledJobSummaryModelNormalizer(state.data)
          : null,
      },
    },
    poll,
  ];
};

export default useSelectScheduledJob;
