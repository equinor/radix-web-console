import { useAsyncLoading } from './use-async-loading';
import { useAsyncPolling } from './use-async-polling';
import { useAsyncRequest } from './use-async-request';

import {
  createCostApiUrl,
  createRadixApiUrl,
  createScanApiUrl,
} from '../api/api-config';
import {
  getJson,
  getText,
  patchJson,
  postJson,
  putJson,
} from '../api/api-helpers';

export function usePollingPlain(path: string, pollInterval?: number) {
  return useAsyncPolling<string, string>(
    getText,
    createRadixApiUrl(path),
    pollInterval
  );
}

export function usePollingJson<T, R = unknown>(
  path: string,
  pollInterval?: number,
  responseConverter?: (responseData: R) => T
) {
  return useAsyncPolling<T, R>(
    getJson,
    createRadixApiUrl(path),
    pollInterval,
    responseConverter
  );
}

export function useFetchJson<T, R = unknown>(
  path: string,
  responseConverter?: (responseData: R) => T
) {
  return useAsyncLoading<T, undefined, R>(
    getJson,
    createRadixApiUrl(path),
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
    getJson,
    createCostApiUrl(path),
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
    getJson,
    createScanApiUrl(path),
    undefined,
    undefined,
    responseConverter
  );
}

export function useFetchPlain(path: string) {
  return useAsyncLoading<string, void, string>(
    getText,
    createRadixApiUrl(path)
  );
}

export function useGetPlain(path: string) {
  return useAsyncRequest<string, void, string>(
    getText,
    createRadixApiUrl(path)
  );
}

export function usePatchJson<T, D = unknown, R = unknown>(
  path: string,
  requestConverter?: (requestData: D) => unknown,
  responseConverter?: (responseData: R) => T
) {
  return useAsyncRequest<T, D, R>(
    patchJson,
    createRadixApiUrl(path),
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
    createRadixApiUrl(path),
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
    createRadixApiUrl(path),
    requestConverter,
    responseConverter
  );
}
