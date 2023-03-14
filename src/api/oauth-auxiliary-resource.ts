import { createRadixApiUrl } from './api-config';
import { postJson } from './api-helpers';

export async function restartOAuthAuxiliaryResource({
  appName,
  envName,
  componentName,
}: {
  appName: string;
  envName: string;
  componentName: string;
}): Promise<string> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);

  return await postJson<string, never>(
    createRadixApiUrl(
      `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/aux/oauth/restart`
    )
  );
}
