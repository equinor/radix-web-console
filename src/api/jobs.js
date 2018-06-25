import { subscribeKubernetesResource } from './api-helpers';

export const subscribeRadixJobs = () => subscribeKubernetesResource('pods');
