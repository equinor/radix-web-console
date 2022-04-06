import { useFetchCostJson } from '../../effects';
import { AsyncLoadingResult } from '../../effects/use-async-loading';
import { ApplicationCostSetModel } from '../../models/application-cost-set';
import { ApplicationCostSetModelNormalizer } from '../../models/application-cost-set/normalizer';

export const useGetApplicationCost = (
  appName: string,
  dateFrom: string,
  dateTo: string
): AsyncLoadingResult<Readonly<ApplicationCostSetModel>> => {
  const [state, resetState] = useFetchCostJson<ApplicationCostSetModel>(
    `/totalcost/${encodeURIComponent(
      appName
    )}?fromTime=${dateFrom}&toTime=${dateTo}`
  );
  state.data = state.data && ApplicationCostSetModelNormalizer(state.data);
  return [state, resetState];
};
