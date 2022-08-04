import { useAsyncLoading } from './use-async-loading';
import { useAsyncPolling } from './use-async-polling';
import { useAsyncRequest } from './use-async-request';

import {
  getJson,
  getText,
  patchJson,
  postJson,
  putJson,
} from '../api/api-helpers';
import { getJson as getCostJson } from '../cost-api/api-helpers';
import { getJson as getScanJson } from '../scan-api/api-helpers';

export function usePollingPlain(path: string, pollInterval?: number) {
  return useAsyncPolling<string, string>(getText, path, pollInterval);
}

export function usePollingJson<T, R = unknown>(
  path: string,
  pollInterval?: number,
  responseConverter?: (responseData: R) => T
) {
  return useAsyncPolling<T, R>(getJson, path, pollInterval, responseConverter);
}

export function useFetchJson<T, R = unknown>(
  path: string,
  responseConverter?: (responseData: R) => T
) {
  return useAsyncLoading<T, undefined, R>(
    getJson,
    path,
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
    getCostJson,
    path,
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
    getScanJson,
    path,
    undefined,
    undefined,
    responseConverter
  );
}

export function useGetPlain(path: string) {
  return useAsyncRequest<string, void, string>(getText, path);
}

export function usePatchJson<T, D = unknown, R = unknown>(
  path: string,
  requestConverter?: (requestData: D) => unknown,
  responseConverter?: (responseData: R) => T
) {
  return useAsyncRequest<T, D, R>(
    patchJson,
    path,
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
    postJson,
    path,
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
    putJson,
    path,
    requestConverter,
    responseConverter
  );
}
