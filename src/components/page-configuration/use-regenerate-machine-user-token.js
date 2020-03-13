import { usePostJson } from '../../effects';

const useRegenerateMachineUserToken = appName => {
  const path = `/applications/${appName}/regenerate-machine-user-token`;

  return usePostJson(path);
};

export default useRegenerateMachineUserToken;
