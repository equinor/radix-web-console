import { bind } from '@react-rxjs/core';
import { interval, ObservableInput } from 'rxjs';
import { exhaustMap, filter, startWith } from 'rxjs/operators';

export const bindPolling = <T>(
  observableFactory: (...args: any[]) => ObservableInput<T>,
  defaultValue: T
) =>
  bind(
    (period: number, pollImmediately: boolean = true, ...args: any[]) =>
      interval(period).pipe(
        startWith(-1),
        filter((i) => pollImmediately || i >= 0),
        exhaustMap(() => observableFactory(...args))
      ),
    defaultValue
  );
