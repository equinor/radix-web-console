import { postJsonWithNoBody } from './api-helpers';

const apiPaths = {
  apps: '/applications',
};

export async function startComponent({ appName, envName, componentName }) {
  return await postJsonWithNoBody(
    `${apiPaths.apps}/${appName}/environments/${envName}/components/${componentName}/start`,
    'radix_api'
  );
}

export async function stopComponent({ appName, envName, componentName }) {
  return await postJsonWithNoBody(
    `${apiPaths.apps}/${appName}/environments/${envName}/components/${componentName}/stop`,
    'radix_api'
  );
}

export async function restartComponent({ appName, envName, componentName }) {
  return await postJsonWithNoBody(
    `${apiPaths.apps}/${appName}/environments/${envName}/components/${componentName}/restart`,
    'radix_api'
  );
}
