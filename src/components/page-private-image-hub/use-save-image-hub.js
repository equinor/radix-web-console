import { usePutJson } from '../../effects';

const useSaveImageHub = (appName, imageHubName) => {
  const path = `/applications/${appName}/privateimagehubs/${imageHubName}`;

  return usePutJson(path, (newValue) => {
    return { secretValue: newValue ? newValue.toString() : null };
  });
};

export default useSaveImageHub;
