import { usePollingJson } from '../../effects';

const useGetImageHubs = (appName) => {
  const encAppName = encodeURIComponent(appName);
  const path = `/applications/${encAppName}/privateimagehubs`;

  return usePollingJson(path);
};

export default useGetImageHubs;
