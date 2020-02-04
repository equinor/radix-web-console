import useAsyncPolling from './use-async-polling';
import { fetchJsonNew } from '../api/api-helpers';

const usePollingJson = (path, pollInterval) =>
  useAsyncPolling(fetchJsonNew, path, pollInterval);

export default usePollingJson;
