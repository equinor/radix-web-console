import { cloneDeep } from 'lodash';
import { nanoid } from 'nanoid';

import { createRadixApiUrl } from './api-config';
import { deleteRequest, patchJson, postJson } from './api-helpers';

import { RawModel } from '../models/model-types';
import { ApplicationRegistrationModel } from '../models/radix-api/applications/application-registration';
import { ApplicationRegistrationModelNormalizer } from '../models/radix-api/applications/application-registration/normalizer';
import { ApplicationRegistrationPatchModel } from '../models/radix-api/applications/application-registration-patch';
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

const guidValidator = new RegExp(
  '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
  'i'
);

function validateCreateRegistrationAdGroups(
  form: AppCreateProps
): ApplicationRegistrationRequestModel {
  const normalizedRegistration = cloneDeep(
    form.appRegistrationRequest.applicationRegistration
  ) as ApplicationRegistrationModel;

  normalizedRegistration.adGroups = normalizeAdGroups(
    normalizedRegistration.adGroups
  );
  form.appRegistrationRequest.applicationRegistration = normalizedRegistration;
  return form.appRegistrationRequest;
}

function validatePatchRegistrationAdGroups(
  form: AppModifyProps
): ApplicationRegistrationPatchRequestModel {
  const normalizedRegistration = cloneDeep(
    form.appRegistrationPatchRequest.applicationRegistrationPatch
  ) as ApplicationRegistrationPatchModel;

  normalizedRegistration.adGroups = normalizeAdGroups(
    normalizedRegistration.adGroups
  );
  form.appRegistrationPatchRequest.applicationRegistrationPatch =
    normalizedRegistration;
  return form.appRegistrationPatchRequest;
}

function normalizeAdGroups(adGroups: Array<string>): Array<string> {
  adGroups = adGroups?.map((x) => x.trim());
  // Validate the AD groups as GUIDs:
  adGroups?.forEach((group) => {
    if (!guidValidator.test(group)) {
      throw new Error(`"${group}" is not a valid AD group ID`);
    }
  });
  return adGroups;
}

export async function createApp(
  form: AppCreateProps
): Promise<RawModel<ApplicationRegistrationUpsertResponseModel>> {
  const request = validateCreateRegistrationAdGroups(form);

  // Generate a shared secret (code splitting: reduce main bundle size)
  request.applicationRegistration.sharedSecret = nanoid();
  request.applicationRegistration = ApplicationRegistrationModelNormalizer(
    request.applicationRegistration
  );

  return await postJson(
    createRadixApiUrl(apiPaths.apps),
    null,
    JSON.stringify(request)
  );
}

export async function modifyApp(
  appName: string,
  form: AppModifyProps
): Promise<RawModel<ApplicationRegistrationUpsertResponseModel>> {
  const encAppName = encodeURIComponent(appName);

  const request = validatePatchRegistrationAdGroups(form);
  request.applicationRegistrationPatch = ApplicationRegistrationModelNormalizer(
    request.applicationRegistrationPatch
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
