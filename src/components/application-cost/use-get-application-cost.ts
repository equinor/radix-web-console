import { useFetchCostJson } from '../../effects';
import { AsyncLoadingResult } from '../../effects/use-async-loading';
import { ApplicationCostSetModel } from '../../models/cost-api/models/application-cost-set';
import { ApplicationCostSetModelNormalizer } from '../../models/cost-api/models/application-cost-set/normalizer';

export function useGetApplicationCost(
  appName: string,
  dateFrom: string,
  dateTo: string
): AsyncLoadingResult<Readonly<ApplicationCostSetModel>> {
  const encAppName = encodeURIComponent(appName);

  return useFetchCostJson(
    `/totalcost/${encAppName}?fromTime=${dateFrom}&toTime=${dateTo}`,
    ApplicationCostSetModelNormalizer
  );
}
