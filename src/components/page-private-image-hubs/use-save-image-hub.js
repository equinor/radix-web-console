import usePutJson from '../../effects/use-put-json';

const useSaveImageHub = (appName, imageHubName, newValue) => {
  const path = `/applications/${appName}/privateimagehubs/${imageHubName}`;
  const data = { secretValue: newValue ? newValue.toString() : null };

  return usePutJson(path, 'radix_api', data, !newValue);
};

export default useSaveImageHub;
