import { usePollingJson } from '../../effects';
import { AsyncState } from '../../effects/effect-types';
import { AsyncPollingResult } from '../../effects/use-async-polling';
import {
  EnvironmentVariableModel,
  EnvironmentVariableNormalizedModel,
} from '../../models/environment-variable';
import { EnvironmentVariableModelNormalizer } from '../../models/environment-variable/normalizer';
import { PollingStateModel } from '../../models/polling-state';

export function usePollEnvVars(
  appName: string,
  envName: string,
  componentName: string,
  pollingState: PollingStateModel
): AsyncPollingResult<Readonly<EnvironmentVariableNormalizedModel>[]> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);

  const [state, poll] = usePollingJson<EnvironmentVariableModel[]>(
    `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/envvars`,
    pollingState.paused ? 0 : 8000
  );
  state.data = state.data?.map(EnvironmentVariableModelNormalizer);
  return [
    state as AsyncState<Readonly<EnvironmentVariableNormalizedModel>[]>,
    poll,
  ];
}
