import { useFetchJson } from '../../effects';
import { EnvironmentModel } from '../../models/environment';

export const useGetEnvironment = (appName: string, envName: string) => {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);

  return useFetchJson<EnvironmentModel>(
    `/applications/${encAppName}/environments/${encEnvName}`
  );
};
