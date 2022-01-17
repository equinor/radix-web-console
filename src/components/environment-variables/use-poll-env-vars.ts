import { usePollingJson } from '../../effects';
import { EnvironmentVariableModel } from '../../models/environment-variable';
import { EnvironmentVariableNormaliser } from '../../models/environment-variable/normaliser';
import { PollingStateModel } from '../../models/polling-state';

export function usePollEnvVars(
  appName: string,
  envName: string,
  componentName: string,
  pollingState: PollingStateModel
) {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);

  const [result] = usePollingJson<EnvironmentVariableModel[]>(
    `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/envvars`,
    pollingState.paused ? 0 : 8000
  );

  return [
    {
      ...result,
      data: result.data?.map((envVar) => EnvironmentVariableNormaliser(envVar)),
    },
  ];
}
