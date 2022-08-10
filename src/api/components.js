import { createRadixApiUrl } from './api-config';
import { postJsonWithoutBody } from './api-helpers';

const apiPaths = {
  apps: '/applications',
};

export async function startComponent({ appName, envName, componentName }) {
  return await postJsonWithoutBody(
    createRadixApiUrl(
      `${apiPaths.apps}/${appName}/environments/${envName}/components/${componentName}/start`
    )
  );
}

export async function stopComponent({ appName, envName, componentName }) {
  return await postJsonWithoutBody(
    createRadixApiUrl(
      `${apiPaths.apps}/${appName}/environments/${envName}/components/${componentName}/stop`
    )
  );
}

export async function restartComponent({ appName, envName, componentName }) {
  return await postJsonWithoutBody(
    createRadixApiUrl(
      `${apiPaths.apps}/${appName}/environments/${envName}/components/${componentName}/restart`
    )
  );
}
