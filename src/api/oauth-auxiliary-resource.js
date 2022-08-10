import { createRadixApiUrl } from './api-config';
import { postJsonWithoutBody } from './api-helpers';

const apiPaths = {
  apps: '/applications',
};

export async function restartOAuthAuxiliaryResource({
  appName,
  envName,
  componentName,
}) {
  return await postJsonWithoutBody(
    createRadixApiUrl(
      `${apiPaths.apps}/${appName}/environments/${envName}/components/${componentName}/aux/oauth/restart`
    )
  );
}
