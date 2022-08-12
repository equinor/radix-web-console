import { bind } from '@react-rxjs/core';
import { interval, ObservableInput } from 'rxjs';
import { exhaustMap, filter, startWith } from 'rxjs/operators';

export function bindPolling<T, A extends Array<unknown> = Array<void>>(
  observableFactory: (...args: A) => ObservableInput<T>,
  defaultValue: T
) {
  return bind(
    (period: number, pollImmediately: boolean = true, ...args: A) =>
      interval(period).pipe(
        startWith(-1),
        filter((i) => pollImmediately || i >= 0),
        exhaustMap(() => observableFactory(...args))
      ),
    defaultValue
  );
}
