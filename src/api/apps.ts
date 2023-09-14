import { cloneDeep } from 'lodash';
import { nanoid } from 'nanoid';

import { createRadixApiUrl } from './api-config';
import { deleteRequest, patchJson, postJson } from './api-helpers';

import { RawModel } from '../models/model-types';
import { objectNormalizer } from '../models/model-utils';
import { ApplicationRegistrationModelNormalizer } from '../models/radix-api/applications/application-registration/normalizer';
import { ApplicationRegistrationPatchModelNormalizer } from '../models/radix-api/applications/application-registration-patch/normalizer';
import { ApplicationRegistrationPatchRequestModel } from '../models/radix-api/applications/application-registration-patch-request';
import { ApplicationRegistrationRequestModel } from '../models/radix-api/applications/application-registration-request';
import { ApplicationRegistrationUpsertResponseModel } from '../models/radix-api/applications/application-registration-upsert-response';

export type AppCreateProps = {
  appRegistrationRequest: ApplicationRegistrationRequestModel;
};

export type AppModifyProps = {
  appRegistrationPatchRequest: Partial<ApplicationRegistrationPatchRequestModel>;
};

// TODO: Move this somewhere it can be tested against Swagger
const apiPaths = {
  apps: '/applications',
};

function normalizeAdGroups(adGroups: Array<string>): Array<string> {
  if (!(adGroups?.length > 0)) return adGroups;

  const guidValidator = new RegExp(
    '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
    'i'
  );
  adGroups = adGroups.map((x) => x.trim());
  // Validate the AD groups as GUIDs:
  adGroups.forEach((group) => {
    if (!guidValidator.test(group)) {
      throw new Error(`"${group}" is not a valid AD group ID`);
    }
  });

  return adGroups;
}

function validateRegistrationAdGroups(
  request: ApplicationRegistrationRequestModel
): ApplicationRegistrationRequestModel {
  const registration = cloneDeep(request.applicationRegistration);
  registration.adGroups = normalizeAdGroups(registration.adGroups);
  registration.readerAdGroups = normalizeAdGroups(registration.readerAdGroups);

  request.applicationRegistration = registration;
  return request;
}

function validateRegistrationPatchAdGroups(
  request: ApplicationRegistrationPatchRequestModel
): ApplicationRegistrationPatchRequestModel {
  const registration = cloneDeep(request.applicationRegistrationPatch);
  registration.adGroups = normalizeAdGroups(registration.adGroups);
  registration.readerAdGroups = normalizeAdGroups(registration.readerAdGroups);

  request.applicationRegistrationPatch = registration;
  return request;
}

export async function createApp({
  appRegistrationRequest,
}: AppCreateProps): Promise<
  RawModel<ApplicationRegistrationUpsertResponseModel>
> {
  const request = objectNormalizer(
    validateRegistrationAdGroups(appRegistrationRequest),
    {
      applicationRegistration: ApplicationRegistrationModelNormalizer,
    }
  );

  // Generate a shared secret (code splitting: reduce main bundle size)
  request.applicationRegistration.sharedSecret = nanoid();

  return await postJson(
    createRadixApiUrl(apiPaths.apps),
    null,
    JSON.stringify(request)
  );
}

export async function modifyApp(
  appName: string,
  { appRegistrationPatchRequest }: AppModifyProps
): Promise<RawModel<ApplicationRegistrationUpsertResponseModel>> {
  const encAppName = encodeURIComponent(appName);
  const request = objectNormalizer(
    validateRegistrationPatchAdGroups(appRegistrationPatchRequest),
    {
      applicationRegistrationPatch: ApplicationRegistrationPatchModelNormalizer,
    }
  );

  return await patchJson(
    createRadixApiUrl(`${apiPaths.apps}/${encAppName}`),
    null,
    JSON.stringify(request)
  );
}

export async function deleteApp(appName: string): Promise<string> {
  const encAppName = encodeURIComponent(appName);

  return await deleteRequest(
    createRadixApiUrl(`${apiPaths.apps}/${encAppName}`)
  );
}
