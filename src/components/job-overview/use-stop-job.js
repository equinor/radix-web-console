import { usePostJson } from '../../effects';

const useStopJob = (appName, jobName) => {
  const path = `/applications/${appName}/jobs/${jobName}/stop`;

  return usePostJson(path);
};

export default useStopJob;
