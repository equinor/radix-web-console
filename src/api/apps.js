import { openWs } from './api-helpers';

export async function subscribeAppsList() {
  const socket = await openWs('namespaces/kube-system/pods');

  socket.onAppsMessage = () => undefined;

  socket.onmessage = ev => {
    let message;

    try {
      message = JSON.parse(ev.data);
    } catch (e) {
      console.error('Apps API: cannot parse subscription message', e, ev);
      return;
    }

    socket.onAppsMessage(message);
  };

  return socket;
}
