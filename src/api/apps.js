import { postJson, subscribeRadixResource, deleteJson } from './api-helpers';

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
  const adGroup = request.adGroup
    ? request.adGroup
    : RADIX_PLATFORM_USER_GROUP_ID;
  const rr = {
    apiVersion: 'radix.equinor.com/v1',
    kind: 'RadixRegistration',
    metadata: {
      name: request.name,
    },
    spec: {
      repository: request.repository,
      cloneURL: request.cloneUrl,
      sharedSecret: request.sharedSecret,
      deployKey: request.privateDeployKey,
      adGroups: [adGroup],
      defaultScriptName: 'radix-script',
    },
  };

  return await postJson(`namespaces/default/${RES_RADIX_REGISTRATIONS}`, rr);
}

export async function deleteApp(appName) {
  return await deleteJson(
    `namespaces/default/${RES_RADIX_REGISTRATIONS}/${appName}`
  );
}
