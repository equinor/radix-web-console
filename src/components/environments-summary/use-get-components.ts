import { useCallback } from 'react';

import { useFetchJson } from '../../effects';
import { AsyncLoadingResult } from '../../effects/use-async-loading';
import { arrayNormalizer } from '../../models/model-utils';
import { ComponentModel } from '../../models/radix-api/deployments/component';
import { ComponentModelNormalizer } from '../../models/radix-api/deployments/component/normalizer';

export function useGetComponents(
  appName: string,
  deploymentName: string
): AsyncLoadingResult<Array<Readonly<ComponentModel>>> {
  const encAppName = encodeURIComponent(appName);
  const encDeployName = encodeURIComponent(deploymentName);

  return useFetchJson(
    `/applications/${encAppName}/deployments/${encDeployName}/components`,
    useCallback((x) => arrayNormalizer(x, ComponentModelNormalizer), [])
  );
}
