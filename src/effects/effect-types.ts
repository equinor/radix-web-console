import { RequestState } from '../state/state-utils/request-states';

export type AsyncState<T> = {
  status: RequestState;
  data: T;
  error?: string;
  code?: number;
};
