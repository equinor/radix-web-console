import { subscribeKubernetesResource } from './api-helpers';

export function subscribePodsForApp(app) {
  return subscribeKubernetesResource(
    `pods`
//    `pods?labelSelector=radixApp%3D${app}&labelSelector=app%3Dbrigade`
  );
}
