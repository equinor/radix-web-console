import { useFetchJson } from '../../effects';

const UseGetBuildSecrets = appName => {
  const encAppName = encodeURIComponent(appName);
  const url = `/applications/${encAppName}/buildsecrets`;

  return useFetchJson(url);
};

export default UseGetBuildSecrets;
