import { usePatchJson } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';
import { ApplicationRegistrationUpsertResponseModel } from '../../models/application-registration-upsert-response';
import { ApplicationRegistrationPatchRequestModel } from '../../models/application-registration-patch-request';

export function useSaveRepository(
  appName: string
): AsyncRequestResult<
  ApplicationRegistrationUpsertResponseModel,
  ApplicationRegistrationPatchRequestModel
> {
  const path = `/applications/${appName}`;
  return usePatchJson(path);
}
