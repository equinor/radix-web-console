import { getJson, putJson } from './api-helpers';

export async function fetchPrivateImageHubs(appName) {
  const encAppName = encodeURIComponent(appName);
  return await getJson(
    `/applications/${encAppName}/privateimagehubs`,
    'radix_api'
  );
}

export async function saveImageHubSecret(appName, imageHubName, value) {
  const encAppName = encodeURIComponent(appName);
  const encImagehubName = encodeURIComponent(imageHubName);

  const body = { secretValue: value.toString() };

  return await putJson(
    `/applications/${encAppName}/privateimagehubs/${encImagehubName}`,
    body,
    'radix_api'
  );
}
