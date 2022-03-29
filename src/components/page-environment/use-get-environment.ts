import { useFetchJson } from '../../effects';
import { EnvironmentModel } from '../../models/environment';

export const useGetEnvironment = (appName: string, envName: string) => {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const path = `/applications/${encAppName}/environments/${encEnvName}`;

  return useFetchJson<EnvironmentModel>(path);
};
