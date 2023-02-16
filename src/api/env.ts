import { createRadixApiUrl } from './api-config';
import { deleteRequest, postJsonWithoutBody } from './api-helpers';

export async function deleteEnvironment({
  appName,
  envName,
}: {
  appName: string;
  envName: string;
}): Promise<string> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);

  return await deleteRequest(
    createRadixApiUrl(`/applications/${encAppName}/environments/${encEnvName}`)
  );
}

export async function startEnvironment({
  appName,
  envName,
}: {
  appName: string;
  envName: string;
}): Promise<string> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);

  return await postJsonWithoutBody(
    createRadixApiUrl(
      `/applications/${encAppName}/environments/${encEnvName}/start`
    )
  );
}

export async function stopEnvironment({
  appName,
  envName,
}: {
  appName: string;
  envName: string;
}): Promise<string> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);

  return await postJsonWithoutBody(
    createRadixApiUrl(
      `/applications/${encAppName}/environments/${encEnvName}/stop`
    )
  );
}

export async function restartEnvironment({
  appName,
  envName,
}: {
  appName: string;
  envName: string;
}): Promise<string> {
  const encAppName = encodeURIComponent(appName);
  const encEnvName = encodeURIComponent(envName);

  return await postJsonWithoutBody(
    createRadixApiUrl(
      `/applications/${encAppName}/environments/${encEnvName}/restart`
    )
  );
}
