import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { getReasonPhrase } from 'http-status-codes';

import type { FetchQueryError } from '../types';

type ManagedErrors = FetchQueryError | SerializedError | Error | unknown;

export function getFetchErrorData(error: ManagedErrors): {
  code?: number;
  message: string;
  error: string;
} {
  if (typeof error === "string") {
    return {
      code: undefined,
      message: error,
      error: "unknown error",
    }
  }

  if (typeof error !== "object" || error === null) {
    console.warn("unkown error: ", error)
    return {
      code: undefined,
      message: "unknown error",
      error: "unknown error",
    }
  }

  if (IsRTKQueryError(error)) {
    const code = isFetchBaseQueryError(error) ? error.status : IsParsingError(error) ? error.originalStatus : undefined;
    let errorMessage = error?.error??error?.data?.error;
    return {
      code: code,
      error: errorMessage,
      message: "failed to fetch data: " + (code ? getReasonPhrase(code) : "unknown") + (errorMessage ? ". " + errorMessage : "")
    }
  }


  console.warn("unkown error received: ", error)
  // This might be SerialziedError, or something unknown
  return {
    code: 'code' in error ? Number(error.code) : undefined,
    message: 'message' in error ? String(error.message) : "unknown error",
    error: 'name' in error ? String(error.name) : "unknown error",
  };
}

export function getFetchErrorCode(
  error: ManagedErrors
): number|undefined {
  return getFetchErrorData(error).code;
}

export function getFetchErrorMessage(
  error: ManagedErrors
): string|undefined {
  return getFetchErrorData(error).message;
}


function IsRTKQueryError(e: any): e is FetchBaseQueryError {
  return isFetchBaseQueryError(e) || IsFetchError(e) || IsParsingError(e) || IsTimeoutError(e) || IsCustomError(e)
}

type BaseQueryError = FetchBaseQueryError & {
  status: number;
  data: unknown;
}
function isFetchBaseQueryError(e: FetchBaseQueryError): e is BaseQueryError {
  return 'status' in e && typeof e.status === 'number'
}


type FetchError = FetchBaseQueryError & {
  status: 'FETCH_ERROR';
  originalStatus: number;
  data: string;
  error: string;
}
function IsFetchError(e: FetchBaseQueryError): e is FetchError {
  if (!('status' in e))
    return false

  if (!('originalStatus' in e) || typeof e.originalStatus !== 'number')
    return false

  if (typeof e.data !== 'string')
    return false

  if (typeof e.error !== 'string')
    return false

  // @ts-expect-error I want to check it anyway :)
  return e.status === "FETCH_ERROR"
}

type ParsingError = FetchBaseQueryError & {
  status: 'PARSING_ERROR';
  originalStatus: number;
  data: string;
  error: string;
}
function IsParsingError(e: FetchBaseQueryError): e is ParsingError {
  if (!('status' in e))
    return false

  if (!('originalStatus' in e) || typeof e.originalStatus !== 'number')
    return false

  if (typeof e.data !== 'string')
    return false

  if (typeof e.error !== 'string')
    return false

  return e.status === "PARSING_ERROR"
}


type TimeoutError = FetchBaseQueryError & {
  status: 'TIMEOUT_ERROR';
  originalStatus: number;
  data: string;
  error: string;
}
function IsTimeoutError(e: FetchBaseQueryError): e is TimeoutError {
  if (!('status' in e))
    return false

  if (!('originalStatus' in e) || typeof e.originalStatus !== 'number')
    return false

  if (typeof e.data !== 'string')
    return false

  if (typeof e.error !== 'string')
    return false

  // @ts-expect-error I want to check it anyway :)
  return e.status === "TIMEOUT_ERROR"
}


type CustomError = FetchBaseQueryError & {
  status: 'TIMEOUT_ERROR';
  originalStatus: number;
  data: string;
  error: string;
}
function IsCustomError(e: FetchBaseQueryError): e is CustomError {
  if (!('status' in e))
    return false

  if (!('error' in e) || typeof e.error !== 'string')
    return false

  return e.status === "CUSTOM_ERROR"
}
