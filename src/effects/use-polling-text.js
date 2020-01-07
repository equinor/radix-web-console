import useAsyncPolling from './use-async-polling';
import { fetchPlainNew } from '../api/api-helpers';

const usePollingPlain = (path, pollInterval) => {
  return useAsyncPolling(fetchPlainNew, path, pollInterval);
};

export default usePollingPlain;
