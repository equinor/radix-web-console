import { createRadixApiUrl } from './api-config';
import { putJson } from './api-helpers';

import { SecretType } from '../models/secret-type';

export async function saveComponentSecret(
  appName: string,
  envName: string,
  componentName: string,
  secretName: string,
  value: string
): Promise<string> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);
  const encSecretName = encodeURIComponent(secretName);

  const body: { secretValue: string; type?: SecretType } = {
    secretValue: value.toString(),
  };

  return await putJson(
    createRadixApiUrl(
      `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/secrets/${encSecretName}`
    ),
    JSON.stringify(body)
  );
}
