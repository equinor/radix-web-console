import { useCallback } from 'react';

import { useFetchJson } from '../../../effects';
import { AsyncLoadingResult } from '../../../effects/use-async-loading';
import { arrayNormalizer } from '../../../models/model-utils';
import { DeploymentItemModel } from '../../../models/radix-api/deployments/deployment-item';
import { DeploymentItemModelNormalizer } from '../../../models/radix-api/deployments/deployment-item/normalizer';

export function useGetDeployments(
  appName: string,
  envName: string,
  jobComponentName: string
): AsyncLoadingResult<Array<Readonly<DeploymentItemModel>>> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encJobComponentName = encodeURIComponent(jobComponentName);

  return useFetchJson(
    `/applications/${encAppName}/environments/${encEnvName}/jobcomponents/${encJobComponentName}/deployments`,
    useCallback((x) => arrayNormalizer(x, DeploymentItemModelNormalizer), [])
  );
}
