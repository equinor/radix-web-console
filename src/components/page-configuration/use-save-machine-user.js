import { usePatchJson } from '../../effects';

const useSaveMachineUser = appName => {
  const path = `/applications/${appName}`;

  return usePatchJson(path, newMachineUser => {
    return { machineUser: newMachineUser };
  });
};

export default useSaveMachineUser;
