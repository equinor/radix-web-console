import { useAsyncLoading } from './use-async-loading';

import { createRadixApiUrl } from '../api/api-config';
import { getJson, getText } from '../api/api-helpers';

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
