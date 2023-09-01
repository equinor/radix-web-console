import { useFetchJson } from '../../effects';
import { AsyncLoadingResult } from '../../effects/use-async-loading';
import { ApplicationModel } from '../../models/radix-api/applications/application';
import { ApplicationModelNormalizer } from '../../models/radix-api/applications/application/normalizer';

export function useGetApplication(
  appName: string
): AsyncLoadingResult<Readonly<ApplicationModel>> {
  const encAppName = encodeURIComponent(appName);

  return useFetchJson(
    `/applications/${encAppName}`,
    ApplicationModelNormalizer
  );
}
