import { BaseQueryFn, QueryDefinition } from '@reduxjs/toolkit/query';
import { UseLazyQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';

import { errorToast } from '../global-top-nav/styled-toaster';
import { getFetchErrorMessage } from '../../store/utils';
import { copyToTextFile } from '../../utils/string';

export function downloadLazyLogCb<
  T extends ReturnType<
    UseLazyQuery<QueryDefinition<unknown, BaseQueryFn, string, string>>
  >[0],
>(filename: string, func: T, ...args: Parameters<T>): () => Promise<void> {
  return async () => {
    const { data, error, isError, isSuccess } = await func(
      args?.[0],
      args?.[1]
    );

    if (isSuccess && data) {
      copyToTextFile(filename, data);
    } else if (isError) {
      const message = getFetchErrorMessage(error);
      errorToast(`Failed to download: ${message}`);
    }
  };
}
