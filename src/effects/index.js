import useAsyncRequest from './use-async-request';
import useAsyncCallback from './use-async-callback';
import useAsyncPolling from './use-async-polling';
import { fetchJsonNew, fetchPlainNew } from '../api/api-helpers';

export const usePollingPlain = (path, pollInterval) =>
  useAsyncPolling(fetchPlainNew, path, pollInterval);
export const usePollingJson = (path, pollInterval) =>
  useAsyncPolling(fetchJsonNew, path, pollInterval);

export const useFetchJson = path => useAsyncRequest(fetchJsonNew, path, 'GET');
export const usePatchJson = (path, data) =>
  useAsyncCallback(path, 'PATCH', data);
export const usePostJson = (path, data) => useAsyncCallback(path, 'POST', data);
export const usePutJson = (path, data) => useAsyncCallback(path, 'PUT', data);
