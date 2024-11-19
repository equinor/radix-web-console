import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { getReasonPhrase } from 'http-status-codes';

import type { FetchQueryError } from '../types';

export function getFetchErrorData(error: FetchQueryError): {
  code?: string | number;
  message: string;
  error: string;
} {
  const errObj: ReturnType<typeof getFetchErrorData> = {
    code: undefined,
    message: '',
    error: '',
  };

  if ((error as SerializedError).message || (error as SerializedError).code) {
    errObj.code = (error as SerializedError).code;
    errObj.message = (error as SerializedError).message ?? "";
  } else if ((error as FetchBaseQueryError).status) {
    const err = error as FetchBaseQueryError;
    if (err.data?.['code'] || err.data?.['message'] || err.data?.['error']) {
      // data is an object containing status
      errObj.code = err.status;
      if (err.data['code']) {
        errObj.code = err.data['code'];
      }
      if (typeof err.data['message'] === 'string') {
        errObj.message = err.data['message'];
      }
      if (typeof err.data['error'] === 'string') {
        errObj.error = err.data['error'];
      }
    } else if (typeof err.status === 'number') {
      errObj.code = err.status;
      if (typeof err.data === 'string') {
        errObj.message = err.data;
      }
    } else if (err.status === 'PARSING_ERROR') {
      errObj.code = err.originalStatus;
      try {
        const code = getReasonPhrase(errObj.code);
        errObj.message = code;
      } catch (_) {
        // noop
      }
    } else {
      errObj.code = err.status;
      errObj.message = err.error;
    }
  }

  return errObj;
}

export function getFetchErrorCode(
  error: FetchQueryError
): ReturnType<typeof getFetchErrorData>['code'] {
  return getFetchErrorData(error).code;
}

export function getFetchErrorMessage(
  error: FetchQueryError
): ReturnType<typeof getFetchErrorData>['message'] {
  return getFetchErrorData(error).message;
}
