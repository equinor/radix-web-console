import { usePatchJson } from '../../effects';

const useSaveMachineUser = (appName) => {
  const path = `/applications/${appName}`;

  return usePatchJson(path, (newMachineUser) => {
    return {
      applicationRegistrationPatch: {
        machineUser: newMachineUser,
      },
    };
  });
};

export default useSaveMachineUser;
