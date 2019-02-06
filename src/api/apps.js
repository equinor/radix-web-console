import cloneDeep from 'lodash/cloneDeep';

import { ApplicationRegistrationFactory } from 'radix-web-console-models';
import { postJson, deleteRequest } from './api-helpers';

// TODO: Move this somewhere it can be tested against Swagger
const apiPaths = {
  apps: '/applications',
};

const RADIX_PLATFORM_USER_GROUP_ID = '7552642f-ad75-4e9d-a140-3ab8f3742c16';

const guidValidator = new RegExp(
  '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
  'i'
);

export async function createApp(app) {
  const appConfig = cloneDeep(app);

  // If we have auto mode set for ad group, we assign radix platform user group
  // TODO: Move this logic to the API server
  if (app.adModeAuto) {
    appConfig.adGroups = RADIX_PLATFORM_USER_GROUP_ID;
  } else {
    appConfig.adGroups = app.adGroups;
  }

  // AD Groups needs to be an array of strings; split on commas
  appConfig.adGroups = appConfig.adGroups.split(',').map(s => s.trim());

  // Validate the AD groups as GUIDs:

  appConfig.adGroups.forEach(group => {
    if (!guidValidator.test(group)) {
      throw new Error(`${group} is not a valid AD group GUID.`);
    }
  });

  // Generate a shared secret (code splitting: reduce main bundle size)

  const phraseit = await import('phraseit');
  appConfig.sharedSecret = phraseit.make(
    '{{an_adjective}} {{adjective}} {{noun}}'
  );

  const apiApp = ApplicationRegistrationFactory(appConfig);
  return await postJson(apiPaths.apps, apiApp, 'radix_api');
}

export async function deleteApp(appName) {
  return await deleteRequest(`${apiPaths.apps}/${appName}`, 'radix_api');
}
