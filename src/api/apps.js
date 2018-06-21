import { openWs } from './api-helpers';

export async function subscribeAppsList() {
  const socket = await openWs('namespaces/kube-system/pods');

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
