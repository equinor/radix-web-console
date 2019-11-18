import useFetchJson from '../../effects/use-fetch-json';

const useGetImageHubs = appName => {
  const encAppName = encodeURIComponent(appName);
  const path = `/applications/${encAppName}/privateimagehubs`;

  return useFetchJson(path, 'radix_api');
};

export default useGetImageHubs;
