import { usePollingJson } from '../../effects';
import jobNormaliser from '../../models/job/normaliser';

const usePollJob = (appName, jobName) => {
  const encAppName = encodeURIComponent(appName);
  const encJobName = encodeURIComponent(jobName);
  const path = `/applications/${encAppName}/jobs/${encJobName}`;

  const [result, poll] = usePollingJson(path, 8000);

  return [
    {
      ...result,
      data: result.data ? jobNormaliser(result.data) : null,
    },
    poll,
  ];
};

export default usePollJob;
