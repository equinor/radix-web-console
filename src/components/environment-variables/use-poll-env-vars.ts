import { usePollingJson } from '../../effects';
import { EnvironmentVariableModel } from '../../models/environment-variable';
import { EnvironmentVariableNormaliser } from '../../models/environment-variable/normaliser';
import { PoolingStateModel } from '../../models/pooling-state';

export function usePollEnvVars(
  appName: string,
  envName: string,
  componentName: string,
  poolingState: PoolingStateModel
) {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);

  const [result] = usePollingJson<EnvironmentVariableModel[]>(
    `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/envvars`,
    poolingState.paused ? 0 : 8000
  );

  return [
    {
      ...result,
      data: result.data?.map((envVar) => EnvironmentVariableNormaliser(envVar)),
    },
  ];
}
