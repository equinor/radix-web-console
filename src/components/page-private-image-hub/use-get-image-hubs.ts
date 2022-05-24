import { useCallback } from 'react';

import { usePollingJson } from '../../effects';
import { AsyncPollingResult } from '../../effects/use-async-polling';
import { ImageHubSecretModel } from '../../models/image-hub-secret';
import { ImageHubSecretModelNormalizer } from '../../models/image-hub-secret/normalizer';
import { arrayNormalizer } from '../../models/model-utils';

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
