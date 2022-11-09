import { usePatchJson } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';
import { ApplicationRegistrationPatchRequestModel } from '../../models/application-registration-patch-request';
import { ApplicationRegistrationPatchRequestModelNormalizer } from '../../models/application-registration-patch-request/normalizer';
import { ApplicationRegistrationUpsertResponseModel } from '../../models/application-registration-upsert-response';
import { ApplicationRegistrationUpsertResponseModelNormalizer } from '../../models/application-registration-upsert-response/normalizer';

export function usePatchApplicationRegistration(
  appName: string
): AsyncRequestResult<
  Readonly<ApplicationRegistrationUpsertResponseModel>,
  Readonly<ApplicationRegistrationPatchRequestModel>
> {
  const encAppName = encodeURIComponent(appName);

  return usePatchJson(
    `/applications/${encAppName}`,
    ApplicationRegistrationPatchRequestModelNormalizer,
    ApplicationRegistrationUpsertResponseModelNormalizer
  );
}
