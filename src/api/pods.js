import { subscribeKubernetesResource } from './api-helpers';

export function subscribePodsForApp(app) {
  return subscribeKubernetesResource(
    `pods`
    // TODO: use this URL instead when @daft fixes labels:
    // `pods?labelSelector=radixApp%3D${app}&labelSelector=app%3Dbrigade`
  );
}
