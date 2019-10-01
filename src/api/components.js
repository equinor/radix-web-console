import { postJson } from './api-helpers';

const apiPaths = {
  apps: '/applications',
};

export async function restartComponent({ appName, envName, componentName }) {
  console.log('make call to API to restart component');

  return await postJson(
    `${
      apiPaths.apps
    }/${appName}/environments/${envName}/components/${componentName}`,
    'radix_api'
  );
}
