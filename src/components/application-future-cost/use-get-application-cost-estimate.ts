import { useFetchCostJson } from '../../effects';
import { AsyncLoadingResult } from '../../effects/use-async-loading';
import { ApplicationCostModel } from '../../models/application-cost';
import { ApplicationCostModelNormalizer } from '../../models/application-cost/normalizer';

export function useGetApplicationCostEstimate(
  appName: string
): AsyncLoadingResult<Readonly<ApplicationCostModel>> {
  const encAppName = encodeURIComponent(appName);

  return useFetchCostJson<ApplicationCostModel>(
    `/futurecost/${encAppName}`,
    ApplicationCostModelNormalizer
  );
}
