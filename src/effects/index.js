import useAsyncRequest from './use-async-request';
import useAsyncLoading from './use-async-loading';
import useAsyncPolling from './use-async-polling';
import { fetchJsonNew, fetchPlainNew } from '../api/api-helpers';

export const usePollingPlain = (path, pollInterval) =>
  useAsyncPolling(fetchPlainNew, path, pollInterval);
export const usePollingJson = (path, pollInterval) =>
  useAsyncPolling(fetchJsonNew, path, pollInterval);

export const useFetchJson = (path) =>
  useAsyncLoading(fetchJsonNew, path, 'GET');

export const usePatchJson = (path, processRequestData, processResponseData) =>
  useAsyncRequest(path, 'PATCH', processRequestData, processResponseData);
export const usePostJson = (path, processRequestData, processResponseData) =>
  useAsyncRequest(path, 'POST', processRequestData, processResponseData);
export const usePutJson = (path, processRequestData, processResponseData) =>
  useAsyncRequest(path, 'PUT', processRequestData, processResponseData);
