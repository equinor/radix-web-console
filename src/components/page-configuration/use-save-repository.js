import { usePatchJson } from '../../effects';

const useSaveRepository = (appName, acknowledgeWarnings) => {
  const path = `/applications/${appName}`;

  return usePatchJson(
    path,
    (newUrl) => {
      return {
        repository: newUrl ? newUrl.toString() : null,
        acknowledgeWarnings: acknowledgeWarnings,
      };
    },
    (responseData) => {
      return responseData;
    }
  );
};

export default useSaveRepository;
