import { errorToast } from '../components/global-top-nav/styled-toaster';

export function promiseHandler<T>(
  promise: Promise<T>,
  onSuccess: ((data: T) => void) | undefined,
  errMsg = 'Error'
): void {
  promise
    .then(onSuccess)
    .catch((err) => errorToast(`${errMsg}: ${err.message}`));
}
