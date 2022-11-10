import { usePatchJson } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';

export function useSaveConfigurationItem(
  appName: string
): AsyncRequestResult<void, string> {
  const encAppName = encodeURIComponent(appName);
  return usePatchJson(`/applications/${encAppName}`, (newCI: string) => ({
    applicationRegistrationPatch: { configurationItem: newCI },
  }));
}
