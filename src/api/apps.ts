import { cloneDeep } from 'lodash';
import { nanoid } from 'nanoid';

import { createRadixApiUrl } from './api-config';
import { deleteRequest, patchJson, postJson } from './api-helpers';

import { ApplicationRegistrationModelNormalizer } from '../models/application-registration/normalizer';
import { ApplicationRegistrationModel } from '../models/application-registration';

export type AppCreateProps = {
  adModeAuto: boolean;
  appRegistration: ApplicationRegistrationModel;
};

// TODO: Move this somewhere it can be tested against Swagger
const apiPaths = {
  apps: '/applications',
};

const guidValidator = new RegExp(
  '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
  'i'
);

function validateRegistrationAdGroups(
  form: AppCreateProps
): ApplicationRegistrationModel {
  const normalizedRegistration = cloneDeep(form.appRegistration);

  if (form.adModeAuto) {
    // If AD group is automatic we clear the list
    normalizedRegistration.adGroups = [];
  } else {
    normalizedRegistration.adGroups = normalizedRegistration.adGroups.map((x) =>
      x.trim()
    );

    // Validate the AD groups as GUIDs:
    normalizedRegistration.adGroups.forEach((group) => {
      if (!guidValidator.test(group)) {
        throw new Error(`"${group}" is not a valid AD group ID`);
      }
    });
  }

  return normalizedRegistration;
}

export async function createApp(form: AppCreateProps) {
  let appRegistration = validateRegistrationAdGroups(form);

  // Generate a shared secret (code splitting: reduce main bundle size)
  appRegistration.sharedSecret = nanoid();
  appRegistration = ApplicationRegistrationModelNormalizer(appRegistration);

  return await postJson(createRadixApiUrl(apiPaths.apps), appRegistration);
}

export async function modifyApp(appName: string, form: AppCreateProps) {
  const appRegistration = ApplicationRegistrationModelNormalizer(
    validateRegistrationAdGroups(form)
  );

  return await patchJson(
    createRadixApiUrl(`${apiPaths.apps}/${appName}`),
    appRegistration
  );
}

export async function deleteApp(appName: string) {
  return await deleteRequest(createRadixApiUrl(`${apiPaths.apps}/${appName}`));
}
