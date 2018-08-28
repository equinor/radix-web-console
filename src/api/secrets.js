import { getJson, postJson, subscribeKubernetesResource } from './api-helpers';

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
  namespace,
  componentName,
  secretData
) {
  const encodedData = {};

  Object.keys(secretData).forEach(
    key => (encodedData[key] = btoa(secretData[key]))
  );

  const secret = {
    apiVersion: 'v1',
    kind: 'Secret',
    metadata: {
      name: componentName,
      namespace: namespace,
    },
    data: encodedData,
  };

  return await postJson(
    `namespaces/${namespace}/secrets`,
    secret,
    'radix_dev_playground_k8s'
  );
}
