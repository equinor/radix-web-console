import usePollingJson from '../../effects/use-polling-json';

const usePollApplication = appName => {
  const encAppName = encodeURIComponent(appName);
  const path = `/applications/${encAppName}`;

  return usePollingJson(path);
};

export default usePollApplication;
