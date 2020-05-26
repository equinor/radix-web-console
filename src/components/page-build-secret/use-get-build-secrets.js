import { usePollingJson } from '../../effects';

const UseGetBuildSecrets = (appName) => {
  const encAppName = encodeURIComponent(appName);
  const url = `/applications/${encAppName}/buildsecrets`;

  return usePollingJson(url);
};

export default UseGetBuildSecrets;
