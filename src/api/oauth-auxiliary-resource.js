import { postJsonWithNoBody } from './api-helpers';

const apiPaths = {
  apps: '/applications',
};

export async function restartOAuthAuxiliaryResource({
  appName,
  envName,
  componentName,
}) {
  return await postJsonWithNoBody(
    `${apiPaths.apps}/${appName}/environments/${envName}/components/${componentName}/aux/oauth/restart`
  );
}
