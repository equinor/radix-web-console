import { createRadixApiUrl } from './api-config';
import { postJson } from './api-helpers';

const apiPaths = {
  apps: '/applications',
};

export async function startComponent({
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
      `${apiPaths.apps}/${encAppName}/environments/${encEnvName}/components/${encComponentName}/start`
    )
  );
}

export async function stopComponent({
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
      `${apiPaths.apps}/${encAppName}/environments/${encEnvName}/components/${encComponentName}/stop`
    )
  );
}

export async function restartComponent({
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
      `${apiPaths.apps}/${encAppName}/environments/${encEnvName}/components/${encComponentName}/restart`
    )
  );
}
