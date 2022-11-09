import { usePostJson } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';
import { MachineUserModel } from '../../models/machine-user';
import { MachineUserModelNormalizer } from '../../models/machine-user/normalizer';

export function useRegenerateMachineUserToken(
  appName: string
): AsyncRequestResult<Readonly<MachineUserModel>, void> {
  const encAppName = encodeURIComponent(appName);

  return usePostJson(
    `/applications/${encAppName}/regenerate-machine-user-token`,
    undefined,
    MachineUserModelNormalizer
  );
}

export default useRegenerateMachineUserToken;
