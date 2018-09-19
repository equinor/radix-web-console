import { subscribeBatchResource } from './api-helpers';

export const subscribeRadixJobs = () =>
  subscribeBatchResource('jobs?labelSelector=build');
