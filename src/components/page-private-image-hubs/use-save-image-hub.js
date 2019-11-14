import usePutJson from '../../effects/use-put-json';

const useSaveImageHub = (appName, imageHubName, newValue) => {
  const url = `/applications/${appName}/privateimagehubs/${imageHubName}`;
  const resource = 'radix_api';
  const body = { secretValue: newValue ? newValue.toString() : null };

  return usePutJson(url, resource, body, newValue);
};

export default useSaveImageHub;
