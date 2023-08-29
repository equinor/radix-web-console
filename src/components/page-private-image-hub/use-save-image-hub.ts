import { usePutJson } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';

export function useSaveImageHub(
  appName: string,
  imageHubName: string
): AsyncRequestResult<string, string> {
  const encAppName = encodeURIComponent(appName);
  const encImageHubName = encodeURIComponent(imageHubName);

  return usePutJson(
    `/applications/${encAppName}/privateimagehubs/${encImageHubName}`,
    (secret) => ({ secretValue: secret ? secret.toString() : null })
  );
}
