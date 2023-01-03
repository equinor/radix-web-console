import { createRadixApiUrl } from './api-config';
import { deleteRequest } from './api-helpers';

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
