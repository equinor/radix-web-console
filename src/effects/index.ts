import { useAsyncRequest } from './use-async-request';
import { useAsyncLoading } from './use-async-loading';
import { useAsyncPolling } from './use-async-polling';
import { fetchJsonNew, fetchPlainNew } from '../api/api-helpers';
import { fetchJsonNew as fetchCostJsonNew } from '../cost-api/api-helpers';

export const usePollingPlain = <T>(path: string, pollInterval?: number) =>
  useAsyncPolling<T, string>(fetchPlainNew, path, pollInterval);
export const usePollingJson = <T>(path: string, pollInterval?: number) =>
  useAsyncPolling<T, string>(fetchJsonNew, path, pollInterval);

export const useFetchJson = <T>(path: string) =>
  useAsyncLoading<T>(fetchJsonNew, path, 'GET');
export const useFetchCostJson = <T>(path: string) =>
  useAsyncLoading<T>(fetchCostJsonNew, path, 'GET');

export const usePatchJson = <T, D = unknown, R = unknown>(
  path: string,
  processRequestData?: (data: D) => any,
  processResponseData?: (result: R) => T
) =>
  useAsyncRequest<T, D, R>(
    path,
    'PATCH',
    processRequestData,
    processResponseData
  );

export const usePostJson = <T, D = unknown, R = unknown>(
  path: string,
  processRequestData?: (data: D) => any,
  processResponseData?: (result: R) => T
) =>
  useAsyncRequest<T, D, R>(
    path,
    'POST',
    processRequestData,
    processResponseData
  );

export const usePutJson = <T, D = unknown, R = unknown>(
  path: string,
  processRequestData?: (data: D) => any,
  processResponseData?: (result: R) => T
) =>
  useAsyncRequest<T, D, R>(
    path,
    'PUT',
    processRequestData,
    processResponseData
  );
