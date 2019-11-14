import usePutJson from '../../effects/usePutJson';

const useSaveEffect = (appName, imageHubName, newValue) => {
  const url = `/applications/${appName}/privateimagehubs/${imageHubName}`;
  const resource = 'radix_api';
  const body = { secretValue: newValue ? newValue.toString() : null };

  return usePutJson(url, resource, body, newValue, [url, resource, newValue]);
};

export default useSaveEffect;
