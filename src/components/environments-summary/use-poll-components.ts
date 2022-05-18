import { useCallback } from 'react';

import { usePollingJson } from '../../effects';
import { AsyncPollingResult } from '../../effects/use-async-polling';
import { ComponentModel } from '../../models/component';
import { ComponentModelNormalizer } from '../../models/component/normalizer';
import { arrayNormalizer } from '../../models/model-utils';

export function usePollComponents(
  appName: string,
  deploymentName: string
): AsyncPollingResult<Array<Readonly<ComponentModel>>> {
  const encAppName = encodeURIComponent(appName);
  const encDeployName = encodeURIComponent(deploymentName);

  return usePollingJson(
    `/applications/${encAppName}/deployments/${encDeployName}/components`,
    undefined,
    useCallback((x: []) => arrayNormalizer(x, ComponentModelNormalizer), [])
  );
}
