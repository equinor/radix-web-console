import { useFetchJson } from '../../effects';
import { AsyncLoadingResult } from '../../effects/use-async-loading';
import { ApplicationModel } from '../../models/application';
import { ApplicationModelNormalizer } from '../../models/application/normalizer';

export function useGetApplication(
  appName: string
): AsyncLoadingResult<Readonly<ApplicationModel>> {
  return useFetchJson<Readonly<ApplicationModel>>(
    `/applications/${encodeURIComponent(appName)}`,
    ApplicationModelNormalizer
  );
}
