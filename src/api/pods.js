import { getText, subscribeKubernetesResource } from './api-helpers';

export function subscribePodsForApp(app) {
  return subscribeKubernetesResource(
    `pods?labelSelector=radixApp%3D${app}&labelSelector=app%3Dbrigade`
  );
}

export async function getLog(podName, namespace) {
  return await getText(
    `namespaces/${namespace}/pods/${podName}/log`,
    'radix_dev_playground_k8s'
  );
}
