import { usePatchJson } from '../../effects';

const useSaveWBS = (appName) => {
  const path = `/applications/${appName}`;

  return usePatchJson(path, (newWBS) => {
    return {
      applicationRegistrationPatch: {
        wbs: newWBS ? newWBS.toString() : null,
      },
    };
  });
};

export default useSaveWBS;
