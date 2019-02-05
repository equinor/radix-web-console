import cloneDeep from 'lodash/cloneDeep';

import { ApplicationRegistrationFactory } from 'radix-web-console-models';
import { postJson, deleteRequest } from './api-helpers';

// TODO: Move this somewhere it can be tested against Swagger
const apiPaths = {
  apps: '/applications',
};

const MINIMUM_ADGROUPS_LENGTH = 4;
const RADIX_PLATFORM_USER_GROUP_ID = '7552642f-ad75-4e9d-a140-3ab8f3742c16';

export async function createApp(app) {
  const appConfig = cloneDeep(app);

  // If we have auto mode set for ad group, we assign radix platform user group
  // TODO: Move this logic to the API server
  if (app.adModeAuto) {
    appConfig.adGroups = RADIX_PLATFORM_USER_GROUP_ID;
  } else {
    // we should set the ad groups from values
    // check that it actually has a value
    if (!app.adGroups || !app.adGroups.length || !app.adGroups.length < MINIMUM_ADGROUPS_LENGTH) {
      throw new Error(`My own AD groups are missing.`);
    }
    appConfig.adGroups = app.adGroups;
  }

  // AD Groups needs to be an array of strings; split on commas
  appConfig.adGroups = appConfig.adGroups.split(',').map(s => s.trim());

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
