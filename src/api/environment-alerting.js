import { postJsonWithNoBody, putJson } from './api-helpers';
import { makeUrl } from './resource-environment-alerting';

export async function enableEnvironmentAlerting(appName, envName) {
  return await postJsonWithNoBody(`${makeUrl(appName, envName)}/enable`);
}

export async function disableEnvironmentAlerting(appName, envName) {
  return await postJsonWithNoBody(`${makeUrl(appName, envName)}/disable`);
}

export async function updateEnvironmentAlerting(appName, envName, request) {
  return await putJson(`${makeUrl(appName, envName)}`, request);
}
