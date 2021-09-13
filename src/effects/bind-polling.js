import { exhaustMap, startWith, filter } from 'rxjs/operators';
import { interval } from 'rxjs';
import { bind } from '@react-rxjs/core';

export const bindPolling = (observableFactory, defaultValue) => {
  return bind(
    (period, pollImmediately = true, ...args) =>
      interval(period).pipe(
        startWith(-1),
        filter((i) => pollImmediately || i >= 0),
        exhaustMap(() => observableFactory(...args))
      ),
    defaultValue
  );
};
