import { openWs, postJson } from './api-helpers';

import defaultScript from './default-script';

const RES_RADIX_REGISTRATIONS = 'radixregistrations';
const RES_RADIX_APPLICATIONS = 'radixapplications';

async function subscribeRadixResource(resourcePath) {
  const socket = await openWs(resourcePath);

  // TODO: This isn't the most elegant way to offer subscriptions. We are
  // modifying the socket object, which isn't very clean.

  socket.listeners = [];

  socket.onmessage = ev => {
    let message;

    try {
      message = JSON.parse(ev.data);
    } catch (e) {
      console.error('Apps API: cannot parse subscription message', e, ev);
      return;
    }

    socket.listeners.forEach(listener => {
      listener(message);
    });
  };

  /**
   * Register a listener for applications messages
   * @param {function} callback Callback for receiving messages
   * @returns {function} Unsubscriber function; call to remove the listener
   */
  socket.registerListener = callback => {
    const idx = socket.listeners.push(callback) - 1;
    return () => delete socket.listeners[idx]; // Not great; leaves a hole-y array
  };

  return socket;
}

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
      secrets: {
        DOCKER_PASS: 'qDdUcOPWFeJ4fWYEqFIeZcOqt/BPQONU',
        DOCKER_REGISTRY: 'radixdev.azurecr.io',
        DOCKER_USER: 'radixdev',
      },
      defaultScript,
    },
  };

  return await postJson(`namespaces/default/${RES_RADIX_REGISTRATIONS}`, rr);
}
