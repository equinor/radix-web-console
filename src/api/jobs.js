import { getJson, getText, subscribeBatchResource } from './api-helpers';

export const subscribeRadixJobs = () =>
  subscribeBatchResource('jobs?labelSelector=radix-build');

export async function getLog(jobName, namespace, component) {
  const podList = await getJson(
    `namespaces/${namespace}/pods?labelSelector=job-name%3D${jobName}`,
    'radix_dev_playground_k8s'
  );
  const pod = podList.items[0].metadata.name;

  return await getText(
    `namespaces/${namespace}/pods/${pod}/log?container=build-${component}`,
    'radix_dev_playground_k8s'
  );
}
