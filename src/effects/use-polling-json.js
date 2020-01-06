import useAsyncPolling from './use-async-polling';
import { fetchJsonNew } from '../api/api-helpers';

const usePollingJson = (path, pollInterval) => {
  return useAsyncPolling(fetchJsonNew, path, pollInterval);
};

export default usePollingJson;
