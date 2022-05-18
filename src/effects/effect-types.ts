import { RequestState } from '../state/state-utils/request-states';

export type AsyncState<T> = {
  status: RequestState;
  data: T;
  error?: string;
};

export type AsyncRequest<T, R> = (
  path: string,
  method: string,
  data?: R
) => Promise<T>;
