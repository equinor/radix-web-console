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

export async function createApp(request) {
  // Use default AD group if none specified
  // TODO: Move this logic to the API server
  request.adGroups = request.adGroups || RADIX_PLATFORM_USER_GROUP_ID;

  // AD Groups needs to be an array of strings; split on commas
  request.adGroups = request.adGroups.split(',').map(s => s.trim());

  const app = applicationFactory(request);
  return await postJson(apiPaths.apps, app, 'radix_api');
}

export async function deleteApp(appName) {
  return await deleteJson(
    `namespaces/default/${RES_RADIX_REGISTRATIONS}/${appName}`
  );
}
