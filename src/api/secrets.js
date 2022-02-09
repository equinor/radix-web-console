import { getJson, putJson } from './api-helpers';

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
    body
  );
}
