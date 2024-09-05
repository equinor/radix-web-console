import type { BaseQueryFn, QueryDefinition } from '@reduxjs/toolkit/query';
import type { LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';

import { errorToast } from '../global-top-nav/styled-toaster';
import { getFetchErrorMessage } from '../../store/utils';
import { copyToTextFile } from '../../utils/string';

export type LazyQueryTriggerPlain<Args extends Record<string, unknown>> =
  LazyQueryTrigger<QueryDefinition<Args, BaseQueryFn, string, string>>;

export function downloadLazyLogCb<
  T extends LazyQueryTriggerPlain<Record<string, unknown>>,
>(filename: string, func: T, ...args: Parameters<T>): () => Promise<void> {
  return async () => {
    const { data, error, isError, isSuccess } = await (
      func as unknown as (...args: Parameters<T>) => ReturnType<T>
    )(...((args || []) as Parameters<T>));

    if (isSuccess) {
      copyToTextFile(filename, data);
    } else if (isError) {
      const message = getFetchErrorMessage(error);
      errorToast(`Failed to download: ${message}`);
    }
  };
}

export async function downloadLazyLogPromise(
  filename: string,
  func: () => Promise<string>
) {
  try {
    const data = await func();
    copyToTextFile(filename, data);
  } catch (e) {
    const message = getFetchErrorMessage(e);
    errorToast(`Failed to download: ${message}`);
  }
}
