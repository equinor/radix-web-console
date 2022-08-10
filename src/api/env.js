import { createRadixApiUrl } from './api-config';
import { deleteRequest } from './api-helpers';

export async function deleteEnvironment(env) {
  return await deleteRequest(
    createRadixApiUrl(
      `/applications/${env.appName}/environments/${env.envName}`
    )
  );
}
