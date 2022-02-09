import { postJsonWithNoBody } from './api-helpers';

const apiPaths = {
  apps: '/applications',
};

export async function restartAuxiliaryResource({
  appName,
  envName,
  componentName,
  auxType,
}) {
  return await postJsonWithNoBody(
    `${apiPaths.apps}/${appName}/environments/${envName}/components/${componentName}/aux/${auxType}/restart`
  );
}
