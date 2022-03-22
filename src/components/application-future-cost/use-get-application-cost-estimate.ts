import { useFetchCostJson } from '../../effects';
import { AsyncLoadingResult } from '../../effects/use-async-loading';
import { ApplicationCostModel } from '../../models/application-cost';
import { ApplicationCostModelNormalizer } from '../../models/application-cost/normalizer';

export const useGetApplicationCostEstimate = (
  appName: string
): AsyncLoadingResult<Readonly<ApplicationCostModel>> => {
  const [state, resetState] = useFetchCostJson<ApplicationCostModel>(
    `/futurecost/${encodeURIComponent(appName)}`
  );

  return [
    {
      ...state,
      ...{ data: state.data && ApplicationCostModelNormalizer(state.data) },
    },
    resetState,
  ];
};
