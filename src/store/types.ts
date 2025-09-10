import type { BaseQueryFn, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react'

export type FetchQueryHookResult<T = unknown> = TypedUseQueryHookResult<
  T,
  unknown,
  BaseQueryFn<[unknown], unknown, FetchBaseQueryError>
>

export type FetchQueryResult<T = unknown> = Omit<FetchQueryHookResult<T>, 'refetch'>

export type FetchQueryError = FetchQueryResult['error']
