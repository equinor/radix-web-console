import { useFetchJson } from '../../effects';
import { AsyncLoadingStatus } from '../../effects/use-async-loading';
import { ApplicationModel } from '../../models/application';
import { ApplicationModelNormaliser } from '../../models/application/normaliser';

export function useGetApplication(
  appName: string
): [
  state: AsyncLoadingStatus<Readonly<ApplicationModel>>,
  resetState: () => void
] {
  const [state, resetCb] = useFetchJson<ApplicationModel>(
    `/applications/${encodeURIComponent(appName)}`
  );

  return [
    {
      ...state,
      ...{ data: state.data && ApplicationModelNormaliser(state.data) },
    },
    resetCb,
  ];
}
