import { getJson, getText, subscribeBatchResource } from './api-helpers';

export const subscribeRadixJobs = () =>
  subscribeBatchResource('jobs?labelSelector=build');

export async function getLog(jobName, namespace) {
  const podName = await getJson(
    `namespaces/${namespace}/pods?labelSelector=job-name%3D${jobName}`
  ).items[0].metadata.name;

  return await getText(
    `namespaces/${namespace}/pods/${podName}/log`,
    'radix_dev_playground_k8s'
  );
}
