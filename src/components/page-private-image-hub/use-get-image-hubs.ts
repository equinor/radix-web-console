import { useCallback } from 'react';

import { usePollingJson } from '../../effects';
import { AsyncPollingResult } from '../../effects/use-async-polling';
import { arrayNormalizer } from '../../models/model-utils';
import { ImageHubSecretModel } from '../../models/radix-api/privateimagehubs/image-hub-secret';
import { ImageHubSecretModelNormalizer } from '../../models/radix-api/privateimagehubs/image-hub-secret/normalizer';

export function useGetImageHubs(
  appName: string
): AsyncPollingResult<Array<Readonly<ImageHubSecretModel>>> {
  const encAppName = encodeURIComponent(appName);

  return usePollingJson(
    `/applications/${encAppName}/privateimagehubs`,
    undefined,
    useCallback(
      (x: []) => arrayNormalizer(x, ImageHubSecretModelNormalizer),
      []
    )
  );
}
