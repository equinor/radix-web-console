import { usePollingJson } from '../../effects';
import { AsyncPollingResult } from '../../effects/use-async-polling';
import {
  EnvironmentVariableModel,
  EnvironmentVariableNormalisedModel,
} from '../../models/environment-variable';
import { EnvironmentVariableModelNormaliser } from '../../models/environment-variable/normaliser';
import { PollingStateModel } from '../../models/polling-state';

export function usePollEnvVars(
  appName: string,
  envName: string,
  componentName: string,
  pollingState: PollingStateModel
): AsyncPollingResult<Readonly<EnvironmentVariableNormalisedModel>[]> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);

  const [state, poll] = usePollingJson<EnvironmentVariableModel[]>(
    `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/envvars`,
    pollingState.paused ? 0 : 8000
  );

  return [
    {
      ...state,
      ...{ data: state.data?.map(EnvironmentVariableModelNormaliser) },
    },
    poll,
  ];
}
