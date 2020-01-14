import usePollingJson from '../../effects/use-polling-json';

const usePollJob = (appName, jobName) => {
  const encAppName = encodeURIComponent(appName);
  const encJobName = encodeURIComponent(jobName);
  const path = `/applications/${encAppName}/jobs/${encJobName}`;

  return usePollingJson(path);
};

export default usePollJob;
