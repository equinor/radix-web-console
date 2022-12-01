import { createRadixApiUrl } from './api-config';
import { postJsonWithoutBody } from './api-helpers';

export async function restartOAuthAuxiliaryResource({
  appName,
  envName,
  componentName,
}) {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);
  const encComponentName = encodeURIComponent(componentName);

  return await postJsonWithoutBody(
    createRadixApiUrl(
      `/applications/${encAppName}/environments/${encEnvName}/components/${encComponentName}/aux/oauth/restart`
    )
  );
}
