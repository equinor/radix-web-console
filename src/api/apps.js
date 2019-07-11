import cloneDeep from 'lodash/cloneDeep';

import { postJson, putJson, deleteRequest } from './api-helpers';
import applicationRegistrationNormaliser from '../models/application-registration/normaliser';

// TODO: Move this somewhere it can be tested against Swagger
const apiPaths = {
  apps: '/applications',
};

const guidValidator = new RegExp(
  '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
  'i'
);

const normaliseRegistrationAdGroups = appRegistration => {
  const normalisedRegistration = cloneDeep(appRegistration);

  if (appRegistration.adModeAuto) {
    // If AD group is automatic we let the API handle that
    delete normalisedRegistration.adGroups;
  } else {
    // AD Groups must be an array of strings; split on commas
    normalisedRegistration.adGroups = normalisedRegistration.adGroups
      .split(',')
      .map(s => s.trim());

    // Validate the AD groups as GUIDs:
    normalisedRegistration.adGroups.forEach(group => {
      if (!guidValidator.test(group)) {
        throw new Error(`"${group}" is not a valid AD group ID`);
      }
    });
  }

  return normalisedRegistration;
};

export async function createApp(registration) {
  let appRegistration = normaliseRegistrationAdGroups(registration);

  // Generate a shared secret (code splitting: reduce main bundle size)
  const phraseit = await import('phraseit');
  appRegistration.sharedSecret = phraseit.make(
    '{{an_adjective}} {{adjective}} {{noun}}'
  );

  appRegistration = applicationRegistrationNormaliser(appRegistration);
  return await postJson(apiPaths.apps, appRegistration, 'radix_api');
}

export async function modifyApp(appName, registration) {
  let appRegistration = normaliseRegistrationAdGroups(registration);

  appRegistration = applicationRegistrationNormaliser(appRegistration);
  return await putJson(
    `${apiPaths.apps}/${appName}`,
    appRegistration,
    'radix_api'
  );
}

export async function deleteApp(appName) {
  return await deleteRequest(`${apiPaths.apps}/${appName}`, 'radix_api');
}
