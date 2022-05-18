import { useCallback } from 'react';

import { useFetchJson } from '../../effects';
import { AsyncLoadingResult } from '../../effects/use-async-loading';
import { ComponentModel } from '../../models/component';
import { ComponentModelNormalizer } from '../../models/component/normalizer';
import { arrayNormalizer } from '../../models/model-utils';

export function useGetComponents(
  appName: string,
  deploymentName: string
): AsyncLoadingResult<Array<Readonly<ComponentModel>>> {
  const encAppName = encodeURIComponent(appName);
  const encDeployName = encodeURIComponent(deploymentName);

  return useFetchJson(
    `/applications/${encAppName}/deployments/${encDeployName}/components`,
    useCallback((x: []) => arrayNormalizer(x, ComponentModelNormalizer), [])
  );
}
