import useFetchJson from '../../effects/use-fetch-json';

const useGetApplication = appName => {
  const encAppName = encodeURIComponent(appName);
  const path = `/applications/${encAppName}`;

  return useFetchJson(path);
};

export default useGetApplication;
