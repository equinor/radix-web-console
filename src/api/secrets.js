import { subscribeKubernetesResource } from './api-helpers';

export function subscribeSecretsForApp(app) {
  return subscribeKubernetesResource(
    `secrets?labelSelector=radixApp%3D${app}&labelSelector=app%3Dbrigade`
  );
}
