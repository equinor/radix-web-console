import { usePutJson } from '../../effects';

export function useSaveImageHub(appName, imageHubName) {
  const encAppName = encodeURIComponent(appName);
  const encImageHubName = encodeURIComponent(imageHubName);

  return usePutJson(
    `/applications/${encAppName}/privateimagehubs/${encImageHubName}`,
    (secret) => ({ secretValue: secret ? secret.toString() : null })
  );
}
