import { errorToast } from '../components/global-top-nav/styled-toaster'
import { REFRESH_MSAL_AUTH_ERROR } from '../store/msal/interactive-auth'
import { getFetchErrorData } from '../store/utils/parse-errors'

export function promiseHandler<T>(
  promise: Promise<T>,
  onSuccess: ((data: T) => void) | undefined,
  errMsg = 'Error'
): void {
  promise.then(onSuccess).catch((err) => {
    const { action, message } = getFetchErrorData(err)

    // A dead session redirects to the session-expired page, do not toast.
    if (action === REFRESH_MSAL_AUTH_ERROR) {
      return
    }

    errorToast(`${errMsg}: ${message}`)
  })
}
