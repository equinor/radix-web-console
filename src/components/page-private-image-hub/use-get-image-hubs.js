import { useFetchJson } from '../../effects';

const useGetImageHubs = appName => {
  const encAppName = encodeURIComponent(appName);
  const path = `/applications/${encAppName}/privateimagehubs`;

  return useFetchJson(path);
};

export default useGetImageHubs;
