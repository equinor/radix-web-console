import { usePatchJson } from '../../effects';

const useSaveOwner = (appName) => {
  const path = `/applications/${appName}`;

  return usePatchJson(
    path,
    (newOwner) => {
      return {
        applicationRegistrationPatch: {
          owner: newOwner ? newOwner.toString() : null,
        },
      };
    },
    (responseData) => responseData
  );
};

export default useSaveOwner;
