import { usePatchJson } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';
import { ApplicationRegistrationPatchRequestModelNormalizer } from '../../models/radix-api/applications/application-registration-patch-request/normalizer';

export function useSaveConfigurationItem(
  appName: string
): AsyncRequestResult<void, string> {
  const encAppName = encodeURIComponent(appName);

  return usePatchJson(`/applications/${encAppName}`, (configurationItem) =>
    ApplicationRegistrationPatchRequestModelNormalizer({
      applicationRegistrationPatch: { configurationItem },
    })
  );
}
