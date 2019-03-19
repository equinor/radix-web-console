import cloneDeep from 'lodash/cloneDeep';

import { postJson, deleteRequest } from './api-helpers';
import applicationRegistrationNormaliser from '../models/application-registration/normaliser';

// TODO: Move this somewhere it can be tested against Swagger
const apiPaths = {
  apps: '/applications',
};

const guidValidator = new RegExp(
  '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
  'i'
);

export async function createApp(app) {
  const appConfig = cloneDeep(app);

  // If we have auto mode set for ad group, we assign radix platform user group

  if (app.adModeAuto) {
    delete appConfig.adGroups;
  } else {
    // AD Groups needs to be an array of strings; split on commas
    appConfig.adGroups = appConfig.adGroups.split(',').map(s => s.trim());

    // Validate the AD groups as GUIDs:
    appConfig.adGroups.forEach(group => {
      if (!guidValidator.test(group)) {
        throw new Error(`"${group}" is not a valid AD group ID`);
      }
    });
  }

  // Generate a shared secret (code splitting: reduce main bundle size)

  const phraseit = await import('phraseit');
  appConfig.sharedSecret = phraseit.make(
    '{{an_adjective}} {{adjective}} {{noun}}'
  );

  const apiApp = applicationRegistrationNormaliser(appConfig);
  return await postJson(apiPaths.apps, apiApp, 'radix_api');
}

export async function deleteApp(appName) {
  return await deleteRequest(`${apiPaths.apps}/${appName}`, 'radix_api');
}
