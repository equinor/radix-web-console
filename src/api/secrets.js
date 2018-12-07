import { getJson, putJson, subscribeKubernetesResource } from './api-helpers';

export function subscribeSecretsForApp(appName, envName, componentName) {
  return subscribeKubernetesResource(
    `namespaces/${appName}-${envName}/secrets/${componentName}`,
    false
  );
}

export async function getComponentSecret(namespace, componentName) {
  return await getJson(`namespaces/${namespace}/${componentName}`);
}

export async function saveComponentSecret(
  appName,
  envName,
  componentName,
  secretName,
  value
) {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);
  const encSecretName = encodeURIComponent(secretName);

  const body = { secretValue: value.toString() };

  return await putJson(
    `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/secrets/${encSecretName}`,
    body,
    'radix_api'
  );
}
