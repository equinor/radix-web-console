import { useCallback } from 'react';

import { usePollingJson } from '../../effects';
import { AsyncPollingResult } from '../../effects/use-async-polling';
import { arrayNormalizer } from '../../models/model-utils';
import { BuildSecretModel } from '../../models/radix-api/buildsecrets/build-secret';
import { BuildSecretModelNormalizer } from '../../models/radix-api/buildsecrets/build-secret/normalizer';

export function useGetBuildSecrets(
  appName: string
): AsyncPollingResult<Array<Readonly<BuildSecretModel>>> {
  const encAppName = encodeURIComponent(appName);

  return usePollingJson(
    `/applications/${encAppName}/buildsecrets`,
    undefined,
    useCallback((x) => arrayNormalizer(x, BuildSecretModelNormalizer), [])
  );
}
