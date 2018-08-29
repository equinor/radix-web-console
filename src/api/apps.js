import { postJson, subscribeRadixResource, deleteJson } from './api-helpers';

const RES_RADIX_REGISTRATIONS = 'radixregistrations';
const RES_RADIX_APPLICATIONS = 'radixapplications';

export function subscribeRadixRegistrations() {
  return subscribeRadixResource(RES_RADIX_REGISTRATIONS);
}

export function subscribeRadixApplications() {
  return subscribeRadixResource(RES_RADIX_APPLICATIONS);
}

export async function createApp(request) {
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
      adGroups: [request.adGroup],
      secrets: {
        DOCKER_PASS: 'qDdUcOPWFeJ4fWYEqFIeZcOqt/BPQONU',
        DOCKER_REGISTRY: 'radixdev.azurecr.io',
        DOCKER_USER: 'radixdev',
      },
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
