import { putJson } from './api-helpers';

export function fetchPrivateImageHubsUrl(appName) {
  const encAppName = encodeURIComponent(appName);
  return {
    url: `/applications/${encAppName}/privateimagehubs`,
    resource: 'radix_api',
  };
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
