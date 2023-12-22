import { useAsyncLoading } from './use-async-loading';
import { useAsyncPolling } from './use-async-polling';
import { useAsyncRequest } from './use-async-request';

import { createRadixApiUrl } from '../api/api-config';
import { getJson, getText, patchJson, postJson } from '../api/api-helpers';

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

function useFetchJsonBase<T, R = unknown>(
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

export function useFetchJson<T, R = unknown>(
  path: string,
  responseConverter?: (responseData: R) => T
) {
  return useFetchJsonBase(createRadixApiUrl(path), responseConverter);
}

export function useFetchPlain(path: string) {
  return useAsyncLoading<string, void, string>(
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
