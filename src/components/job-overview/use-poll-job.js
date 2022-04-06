import { usePollingJson } from '../../effects';
import { normaliser as jobNormaliser } from '../../models/job/normaliser';

export const usePollJob = (appName, jobName) => {
  const encAppName = encodeURIComponent(appName);
  const encJobName = encodeURIComponent(jobName);

  const [state, poll] = usePollingJson(
    `/applications/${encAppName}/jobs/${encJobName}`,
    8000
  );
  state.data = state.data && jobNormaliser(state.data);
  return [state, poll];
};

export default usePollJob;
