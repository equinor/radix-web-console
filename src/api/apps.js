import cloneDeep from 'lodash/cloneDeep';

import { postJson, subscribeRadixResource, deleteJson } from './api-helpers';
import { applicationFactory } from './model-factories';

// TODO: Move this somewhere it can be tested against Swagger
const apiPaths = {
  apps: 'platform/registrations',
};

const RES_RADIX_REGISTRATIONS = 'radixregistrations';
const RES_RADIX_APPLICATIONS = 'radixapplications';
const RADIX_PLATFORM_USER_GROUP_ID = '7552642f-ad75-4e9d-a140-3ab8f3742c16';

export function subscribeRadixRegistrations() {
  return subscribeRadixResource(RES_RADIX_REGISTRATIONS);
}

export function subscribeRadixApplications() {
  return subscribeRadixResource(RES_RADIX_APPLICATIONS);
}

export async function createApp(app) {
  const appConfig = cloneDeep(app);

  // Use default AD group if none specified
  // TODO: Move this logic to the API server
  appConfig.adGroups = appConfig.adGroups || RADIX_PLATFORM_USER_GROUP_ID;

  // AD Groups needs to be an array of strings; split on commas
  appConfig.adGroups = appConfig.adGroups.split(',').map(s => s.trim());

  // Generate a shared secret (code splitting: reduce main bundle size)

  const phraseit = await import('phraseit');
  appConfig.sharedSecret = phraseit.make(
    '{{an_adjective}} {{adjective}} {{noun}}'
  );

  const apiApp = applicationFactory(appConfig);
  return await postJson(apiPaths.apps, apiApp, 'radix_api');
}

export async function deleteApp(appName) {
  return await deleteJson(
    `namespaces/default/${RES_RADIX_REGISTRATIONS}/${appName}`
  );
}
