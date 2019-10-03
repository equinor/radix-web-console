import { postRequest } from './api-helpers';

const apiPaths = {
  apps: '/applications',
};

export async function restartComponent({ appName, envName, componentName }) {
  return await postRequest(
    `${
      apiPaths.apps
    }/${appName}/environments/${envName}/components/${componentName}/restart`,
    'radix_api'
  );
}
