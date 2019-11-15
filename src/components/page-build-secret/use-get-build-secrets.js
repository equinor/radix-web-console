import useFetchJson from '../../effects/use-fetch-json';

const UseGetBuildSecrets = appName => {
  const encAppName = encodeURIComponent(appName);
  const url = `/applications/${encAppName}/buildsecrets`;
  const resource = 'radix_api';

  return useFetchJson(url, resource);
};

export default UseGetBuildSecrets;
