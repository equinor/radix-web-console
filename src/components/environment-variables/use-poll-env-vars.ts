import { useCallback } from 'react';

import { usePollingJson } from '../../effects';
import { AsyncPollingResult } from '../../effects/use-async-polling';
import { arrayNormalizer } from '../../models/model-utils';
import { EnvVarNormalizedModel } from '../../models/radix-api/environmentvariables/env-var';
import { EnvVarModelNormalizer } from '../../models/radix-api/environmentvariables/env-var/normalizer';

export function usePollEnvVars(
  appName: string,
  envName: string,
  componentName: string,
  interval = 0
): AsyncPollingResult<Array<Readonly<EnvVarNormalizedModel>>> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);

  return usePollingJson(
    `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/envvars`,
    interval,
    useCallback((x) => arrayNormalizer(x, EnvVarModelNormalizer), [])
  );
}
