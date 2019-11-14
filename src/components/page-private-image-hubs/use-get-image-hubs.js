import useFetchJson from '../../effects/use-fetch-json';

const useGetImageHubs = appName => {
  const encAppName = encodeURIComponent(appName);
  const url = `/applications/${encAppName}/privateimagehubs`;
  const resource = 'radix_api';

  return useFetchJson(url, resource);
};

export default useGetImageHubs;
