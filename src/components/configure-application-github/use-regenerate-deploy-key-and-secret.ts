import { nanoid } from 'nanoid';

import { usePostJson } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';

export function useRegenerateDeployKeyAndSecret(
  appName: string
): AsyncRequestResult<Readonly<{}>, void> {
  const encAppName = encodeURIComponent(appName);

  return usePostJson(
    `/applications/${encAppName}/regenerate-deploy-key`,
    () => ({ sharedSecret: nanoid() })
  );
}
