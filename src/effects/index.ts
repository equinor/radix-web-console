import { useAsyncLoading } from './use-async-loading';
import { useAsyncPolling } from './use-async-polling';
import { useAsyncRequest } from './use-async-request';

import { fetchJsonNew, fetchPlainNew } from '../api/api-helpers';
import { fetchJsonNew as fetchCostJsonNew } from '../cost-api/api-helpers';
import { fetchJsonNew as fetchScanJsonNew } from '../scan-api/api-helpers';

export function usePollingPlain<T>(path: string, pollInterval?: number) {
  return useAsyncPolling<T, string>(fetchPlainNew, path, pollInterval);
}
export function usePollingJson<T>(path: string, pollInterval?: number) {
  return useAsyncPolling<T, string>(fetchJsonNew, path, pollInterval);
}

export function useFetchJson<T, R = unknown>(
  path: string,
  responseConverter?: (responseData: R) => T
) {
  return useAsyncLoading<T, undefined, R>(
    fetchJsonNew,
    path,
    'GET',
    undefined,
    undefined,
    responseConverter
  );
}
export function useFetchCostJson<T, R = unknown>(
  path: string,
  responseConverter?: (responseData: R) => T
) {
  return useAsyncLoading<T, undefined, R>(
    fetchCostJsonNew,
    path,
    'GET',
    undefined,
    undefined,
    responseConverter
  );
}
export function useFetchScanJson<T, R = unknown>(
  path: string,
  responseConverter?: (responseData: R) => T
) {
  return useAsyncLoading<T, undefined, R>(
    fetchScanJsonNew,
    path,
    'GET',
    undefined,
    undefined,
    responseConverter
  );
}

export function usePatchJson<T, D = unknown, R = unknown>(
  path: string,
  requestConverter?: (requestData: D) => unknown,
  responseConverter?: (responseData: R) => T
) {
  return useAsyncRequest<T, D, R>(
    path,
    'PATCH',
    requestConverter,
    responseConverter
  );
}

export function usePostJson<T, D = unknown, R = unknown>(
  path: string,
  requestConverter?: (requestData: D) => unknown,
  responseConverter?: (responseData: R) => T
) {
  return useAsyncRequest<T, D, R>(
    path,
    'POST',
    requestConverter,
    responseConverter
  );
}

export function usePutJson<T, D = unknown, R = unknown>(
  path: string,
  requestConverter?: (requestData: D) => unknown,
  responseConverter?: (responseData: R) => T
) {
  return useAsyncRequest<T, D, R>(
    path,
    'PUT',
    requestConverter,
    responseConverter
  );
}
