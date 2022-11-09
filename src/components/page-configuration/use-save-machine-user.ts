import { usePatchJson } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';
import { ApplicationRegistrationPatchRequestModel } from '../../models/application-registration-patch-request';
import { ApplicationRegistrationPatchRequestModelNormalizer } from '../../models/application-registration-patch-request/normalizer';

export function useSaveMachineUser(
  appName: string
): AsyncRequestResult<void, boolean> {
  const encAppName = encodeURIComponent(appName);

  return usePatchJson(
    `/applications/${encAppName}`,
    (
      newMachineUser: boolean
    ): Partial<ApplicationRegistrationPatchRequestModel> =>
      ApplicationRegistrationPatchRequestModelNormalizer({
        applicationRegistrationPatch: { machineUser: !!newMachineUser },
      } as Partial<ApplicationRegistrationPatchRequestModel>)
  );
}

export default useSaveMachineUser;
