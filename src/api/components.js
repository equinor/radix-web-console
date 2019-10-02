import { postJson } from './api-helpers';

const apiPaths = {
  apps: '/applications',
};

export async function restartComponent({ appName, envName, componentName }) {
  return await postJson(
    `${
      apiPaths.apps
    }/${appName}/environments/${envName}/components/${componentName}/restart`,
    null,
    'radix_api'
  );
}
