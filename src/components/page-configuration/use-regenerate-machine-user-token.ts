import { usePostJson } from '../../effects';
import { AsyncRequestResult } from '../../effects/use-async-request';
import { MachineUserModel } from '../../models/radix-api/applications/machine-user';
import { MachineUserModelNormalizer } from '../../models/radix-api/applications/machine-user/normalizer';

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
