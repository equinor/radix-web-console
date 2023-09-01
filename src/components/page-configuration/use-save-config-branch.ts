import { usePatchJson } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';
import { ApplicationRegistrationPatchRequestModel } from '../../models/radix-api/applications/application-registration-patch-request';
import { ApplicationRegistrationPatchRequestModelNormalizer } from '../../models/radix-api/applications/application-registration-patch-request/normalizer';

export function useSaveConfigBranch(
  appName: string
): AsyncRequestResult<void, string> {
  const encAppName = encodeURIComponent(appName);

  return usePatchJson(
    `/applications/${encAppName}`,
    (configBranch): ApplicationRegistrationPatchRequestModel =>
      ApplicationRegistrationPatchRequestModelNormalizer({
        applicationRegistrationPatch: { configBranch },
      })
  );
}
