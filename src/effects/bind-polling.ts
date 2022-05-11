import { bind } from '@react-rxjs/core';
import { interval, ObservableInput } from 'rxjs';
import { exhaustMap, filter, startWith } from 'rxjs/operators';

export function bindPolling<T>(
  observableFactory: (...args: unknown[]) => ObservableInput<T>,
  defaultValue: T
) {
  return bind(
    (period: number, pollImmediately: boolean = true, ...args: unknown[]) =>
      interval(period).pipe(
        startWith(-1),
        filter((i) => pollImmediately || i >= 0),
        exhaustMap(() => observableFactory(...args))
      ),
    defaultValue
  );
}
