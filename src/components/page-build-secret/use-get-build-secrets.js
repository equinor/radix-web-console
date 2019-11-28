import useFetchJson from '../../effects/use-fetch-json';

const UseGetBuildSecrets = appName => {
  const encAppName = encodeURIComponent(appName);
  const url = `/applications/${encAppName}/buildsecrets`;

  return useFetchJson(url);
};

export default UseGetBuildSecrets;
