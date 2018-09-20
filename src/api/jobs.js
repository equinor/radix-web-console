import { getJson, getText, subscribeBatchResource } from './api-helpers';

export const subscribeRadixJobs = () =>
  subscribeBatchResource('jobs?labelSelector=build');

export async function getLog(jobName, namespace) {
  const podList = await getJson(
    `namespaces/${namespace}/pods?labelSelector=job-name%3D${jobName}`,
    'radix_dev_playground_k8s'
  );
  return await getText(
    `namespaces/${namespace}/pods/${podList.items[0].metadata.name}/log`,
    'radix_dev_playground_k8s'
  );
}
