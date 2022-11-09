import { usePatchJson } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';
import { ApplicationRegistrationPatchRequestModel } from '../../models/application-registration-patch-request';
import { ApplicationRegistrationPatchRequestModelNormalizer } from '../../models/application-registration-patch-request/normalizer';

export function useSaveConfigBranch(
  appName: string
): AsyncRequestResult<void, string> {
  const encAppName = encodeURIComponent(appName);

  return usePatchJson(
    `/applications/${encAppName}`,
    (
      newConfigBranch: string
    ): Partial<ApplicationRegistrationPatchRequestModel> =>
      ApplicationRegistrationPatchRequestModelNormalizer({
        applicationRegistrationPatch: { configBranch: newConfigBranch },
      } as Partial<ApplicationRegistrationPatchRequestModel>)
  );
}
