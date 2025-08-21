import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { getReasonPhrase } from 'http-status-codes';

import type { FetchQueryError } from '../types';

type ManagedErrors = FetchQueryError | SerializedError | Error | unknown;

function getStatusPhrase(code: number | undefined) {
  try {
    return code ? getReasonPhrase(code) : 'unknown';
  } catch (e) {
    console.warn('unknown status code', { e, code });
    return 'unknown';
  }
}

export function getFetchErrorData(error: ManagedErrors): {
  code?: number;
  message: string;
  error: string;
  action?: undefined | 'refresh_msal_auth';
} {
  if (typeof error === 'string') {
    return {
      code: undefined,
      message: error,
      error: 'unknown error',
    };
  }

  if (IsAbortError(error)) {
    return {
      error: error.name,
      message: 'Request aborted',
      code: undefined,
    };
  }

  if (typeof error !== 'object' || error === null) {
    console.warn('unkown error: ', error);
    return {
      code: undefined,
      message: 'unknown error',
      error: 'unknown error',
    };
  }

  if (IsMSALError(error)) {
    if (error.message.includes('refresh_token_expired')) {
      return {
        code: undefined,
        message: 'Session expired. Please login again.',
        error: error.name,
        action: 'refresh_msal_auth',
      };
    }

    return {
      code: undefined,
      message: error.message || 'Authentication required. Please login again.',
      error: error.name,
    };
  }

  if (IsRadixHttpError(error)) {
    return {
      code: error.status,
      error: error.data.error ?? 'unknown server error',
      message: error.data.message,
    };
  }

  if (IsRTKQueryError(error)) {
    const code = isFetchBaseQueryError(error)
      ? error.status
      : IsParsingError(error)
        ? error.originalStatus
        : undefined;
    return {
      code: code,
      error: isFetchBaseQueryError(error) ? 'server error' : error.error,
      message: `failed to fetch data: ${getStatusPhrase(code)}`,
    };
  }

  console.warn('unkown error received: ', error);
  // This might be SerialziedError, or something unknown
  return {
    code: 'code' in error ? Number(error.code) : undefined,
    message: 'message' in error ? String(error.message) : 'unknown error',
    error: 'name' in error ? String(error.name) : 'unknown error',
  };
}

export function getFetchErrorCode(error: ManagedErrors): number | undefined {
  return getFetchErrorData(error).code;
}

export function getFetchErrorMessage(error: ManagedErrors): string | undefined {
  return getFetchErrorData(error).message;
}

type RadixHttpError = {
  status: number;
  data: {
    message: string;
    error?: string;
    type: 'server' | 'missing' | 'user' | 'forbidden';
  };
};
function IsRadixHttpError(e: object): e is RadixHttpError {
  if (e == null) return false;

  if (!('data' in e && 'status' in e)) return false;

  if (typeof e.data !== 'object' || e.data == null) return false;

  if ('error' in e.data && 'message' in e.data && 'type' in e.data) return true;

  return false;
}

type MSAALError = {
  name: 'InteractionRequiredAuthError' | 'AuthError';
  message: string;
};
function IsMSALError(e: unknown): e is MSAALError {
  if (typeof e !== 'object' || e == null) return false;
  if (!('name' in e) || typeof e.name !== 'string') return false;
  if (!('message' in e) || typeof e.message !== 'string') return false;

  if (e.name == 'InteractionRequiredAuthError' || e.name == 'AuthError') {
    return true;
  }

  return false;
}

function IsRTKQueryError(e: unknown): e is FetchBaseQueryError {
  return (
    isFetchBaseQueryError(e) ||
    IsFetchError(e) ||
    IsParsingError(e) ||
    IsTimeoutError(e) ||
    IsCustomError(e)
  );
}

type BaseQueryError = FetchBaseQueryError & {
  status: number;
  data: unknown;
};
function isFetchBaseQueryError(e: unknown): e is BaseQueryError {
  if (!e || typeof e !== 'object') return false;

  return 'status' in e && typeof e.status === 'number';
}

type FetchError = FetchBaseQueryError & {
  status: 'FETCH_ERROR';
  originalStatus: number;
  data: string;
  error: string;
};
function IsFetchError(e: unknown): e is FetchError {
  if (!e || typeof e !== 'object') return false;
  if (!('status' in e)) return false;

  if (!('originalStatus' in e) || typeof e.originalStatus !== 'number')
    return false;

  if (!('data' in e) || typeof e.data !== 'string') return false;

  if (!('error' in e) || typeof e.error !== 'string') return false;

  return e.status === 'FETCH_ERROR';
}

type ParsingError = FetchBaseQueryError & {
  status: 'PARSING_ERROR';
  originalStatus: number;
  data: string;
  error: string;
};
function IsParsingError(e: unknown): e is ParsingError {
  if (!e || typeof e !== 'object') return false;
  if (!('status' in e)) return false;

  if (!('originalStatus' in e) || typeof e.originalStatus !== 'number')
    return false;

  if (!('data' in e) || typeof e.data !== 'string') return false;

  if (!('error' in e) || typeof e.error !== 'string') return false;

  return e.status === 'PARSING_ERROR';
}

type TimeoutError = FetchBaseQueryError & {
  status: 'TIMEOUT_ERROR';
  originalStatus: number;
  data: string;
  error: string;
};
function IsTimeoutError(e: unknown): e is TimeoutError {
  if (!e || typeof e !== 'object') return false;
  if (!('status' in e)) return false;

  if (!('originalStatus' in e) || typeof e.originalStatus !== 'number')
    return false;

  if (!('data' in e) || typeof e.data !== 'string') return false;

  if (!('error' in e) || typeof e.error !== 'string') return false;

  return e.status === 'TIMEOUT_ERROR';
}

type CustomError = FetchBaseQueryError & {
  status: 'TIMEOUT_ERROR';
  originalStatus: number;
  data: string;
  error: string;
};
function IsCustomError(e: unknown): e is CustomError {
  if (!e || typeof e !== 'object') return false;

  if (!('status' in e)) return false;

  if (!('error' in e) || typeof e.error !== 'string') return false;

  return e.status === 'CUSTOM_ERROR';
}

type AbortError = {
  name: string;
  message: string;
};
function IsAbortError(e: Error | unknown): e is AbortError {
  return (
    e != null && typeof e == 'object' && 'name' in e && e.name === 'AbortError'
  );
}
