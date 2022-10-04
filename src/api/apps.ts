import { cloneDeep } from 'lodash';
import { nanoid } from 'nanoid';

import { createRadixApiUrl } from './api-config';
import { deleteRequest, patchJson, postJson } from './api-helpers';
import { ApplicationRegistrationModelNormalizer } from '../models/application-registration/normalizer';
import { ApplicationRegistrationRequestModel } from '../models/application-registration-request';
import { ApplicationRegistrationPatchRequestModel } from '../models/application-registration-patch-request';
import { ApplicationRegistrationPatchModel } from '../models/application-registration-patch';
import { ApplicationRegistrationModel } from '../models/application-registration';

export type AppCreateProps = {
  adModeAuto: boolean;
  appRegistrationRequest: ApplicationRegistrationRequestModel;
};

export type AppModifyProps = {
  adModeAuto?: boolean;
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
    form.adModeAuto,
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
    form.adModeAuto,
    normalizedRegistration.adGroups
  );
  form.appRegistrationPatchRequest.applicationRegistrationPatch =
    normalizedRegistration;
  return form.appRegistrationPatchRequest;
}

function normalizeAdGroups(
  adModeAuto: boolean,
  adGroups: Array<string>
): Array<string> {
  if (adModeAuto || !(adGroups?.length > 0)) {
    // If the application is administrated by all users - clear the list
    return adModeAuto ? [] : undefined;
  }

  adGroups = adGroups.map((x) => x.trim());
  // Validate the AD groups as GUIDs:
  adGroups.forEach((group) => {
    if (!guidValidator.test(group)) {
      throw new Error(`"${group}" is not a valid AD group ID`);
    }
  });
  return adGroups;
}

export async function createApp(form: AppCreateProps) {
  const request = validateCreateRegistrationAdGroups(form);

  // Generate a shared secret (code splitting: reduce main bundle size)
  request.applicationRegistration.sharedSecret = nanoid();
  request.applicationRegistration = ApplicationRegistrationModelNormalizer(
    request.applicationRegistration
  );

  return await postJson(
    createRadixApiUrl(apiPaths.apps),
    JSON.stringify(request)
  );
}

export async function modifyApp(appName: string, form: AppModifyProps) {
  const request = validatePatchRegistrationAdGroups(form);
  request.applicationRegistrationPatch = ApplicationRegistrationModelNormalizer(
    request.applicationRegistrationPatch
  );

  return await patchJson(
    createRadixApiUrl(`${apiPaths.apps}/${appName}`),
    JSON.stringify(request)
  );
}

export async function deleteApp(appName: string) {
  return await deleteRequest(createRadixApiUrl(`${apiPaths.apps}/${appName}`));
}
