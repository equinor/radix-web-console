import { usePatchJson } from '../../effects';

const useSaveRepository = (appName, acknowledgeWarnings) => {
  const path = `/applications/${appName}`;

  return usePatchJson(
    path,
    (newUrl) => {
      return {
        applicationRegistration: {
          repository: newUrl ? newUrl.toString() : null,
        },
        acknowledgeWarnings: acknowledgeWarnings,
      };
    },
    (responseData) => responseData
  );
};

export default useSaveRepository;
