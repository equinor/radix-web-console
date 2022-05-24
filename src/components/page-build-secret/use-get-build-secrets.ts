import { useCallback } from 'react';

import { usePollingJson } from '../../effects';
import { AsyncPollingResult } from '../../effects/use-async-polling';
import { BuildSecretModel } from '../../models/build-secret';
import { BuildSecretModelNormalizer } from '../../models/build-secret/normalizer';
import { arrayNormalizer } from '../../models/model-utils';

export function useGetBuildSecrets(
  appName: string
): AsyncPollingResult<Array<Readonly<BuildSecretModel>>> {
  const encAppName = encodeURIComponent(appName);

  return usePollingJson(
    `/applications/${encAppName}/buildsecrets`,
    undefined,
    useCallback((x: []) => arrayNormalizer(x, BuildSecretModelNormalizer), [])
  );
}
