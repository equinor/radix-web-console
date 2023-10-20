import { RadixRequestInit } from '../api/api-helpers';
import { RequestState } from '../state/state-utils/request-states';

export type AsyncState<T> = {
  status: RequestState;
  data: T;
  error?: string;
  code?: number;
};

export type AsyncRequest<T, R> = (
  path: string,
  options: RadixRequestInit,
  data?: R
) => Promise<T>;
