import { useFetchJson } from '../../effects';
import { AsyncLoadingResult } from '../../effects/use-async-loading';
import { ApplicationModel } from '../../models/application';
import { ApplicationModelNormaliser } from '../../models/application/normaliser';

export function useGetApplication(
  appName: string
): AsyncLoadingResult<Readonly<ApplicationModel>> {
  const [state, resetState] = useFetchJson<ApplicationModel>(
    `/applications/${encodeURIComponent(appName)}`
  );

  return [
    {
      ...state,
      ...{ data: state.data && ApplicationModelNormaliser(state.data) },
    },
    resetState,
  ];
}
