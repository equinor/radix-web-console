import { useCallback } from 'react';

import { usePollingJson } from '../../effects';
import { AsyncPollingResult } from '../../effects/use-async-polling';
import { EnvironmentVariableNormalizedModel } from '../../models/environment-variable';
import { EnvironmentVariableModelNormalizer } from '../../models/environment-variable/normalizer';
import { arrayNormalizer } from '../../models/model-utils';
import { PollingStateModel } from '../../models/polling-state';

export function usePollEnvVars(
  appName: string,
  envName: string,
  componentName: string,
  pollingState: PollingStateModel
): AsyncPollingResult<Array<Readonly<EnvironmentVariableNormalizedModel>>> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);

  return usePollingJson(
    `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/envvars`,
    pollingState.paused ? 0 : 8000,
    useCallback(
      (x: []) => arrayNormalizer(x, EnvironmentVariableModelNormalizer),
      []
    )
  );
}
