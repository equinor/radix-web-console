import { deleteRequest } from './api-helpers';

export async function deleteEnvironment(env) {
  return await deleteRequest(
    `/applications/${env.appName}/environments/${env.envName}`
  );
}
