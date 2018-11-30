import { getText, subscribeKubernetesResource } from './api-helpers';

export function subscribePodsForComponent(appName, componentName, envName) {
  return subscribeKubernetesResource(
    `namespaces/${appName}-${envName}/pods?labelSelector=radixApp%3D${appName}&labelSelector=radix-component%${componentName}`
  );
}

export async function getLog(podName, namespace) {
  return await getText(
    `namespaces/${namespace}/pods/${podName}/log`,
    'radix_dev_playground_k8s'
  );
}
