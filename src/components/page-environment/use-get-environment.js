import useFetchJson from '../../effects/use-fetch-json';

const useGetEnvironment = (appName, envName) => {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const path = `/applications/${encAppName}/environments/${encEnvName}`;

  return useFetchJson(path);
};

export default useGetEnvironment;
