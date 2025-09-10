import { Icon } from '@equinor/eds-core-react'
import { check_circle_outlined, error_outlined, info_circle, warning_outlined } from '@equinor/eds-icons'
import type { FunctionComponent } from 'react'
import { type Id, ToastContainer, toast } from 'react-toastify'
import type { ToastIcon, TypeOptions } from 'react-toastify/dist/types'

import 'react-toastify/dist/ReactToastify.css'
import './style.css'
import { getFetchErrorMessage } from '../../store/utils/parse-errors'

export const StyledToastContainer: FunctionComponent = () => (
  <div style={{ position: 'absolute' }}>
    <ToastContainer />
  </div>
)

export function styledToaster(
  content: string,
  options: {
    type: TypeOptions
    icon: ToastIcon
  }
): Id {
  return toast(content, {
    ...options,
    className: 'styled_toaster',
    closeOnClick: false,
    draggable: false,
  })
}

export function infoToast(content: string): Id {
  return styledToaster(content, {
    type: 'info',
    icon: <Icon data={info_circle} />,
  })
}

export function errorToast(content: string): Id {
  return styledToaster(content, {
    type: 'error',
    icon: <Icon data={error_outlined} />,
  })
}

export function warningToast(content: string): Id {
  return styledToaster(content, {
    type: 'warning',
    icon: <Icon data={warning_outlined} />,
  })
}

export function successToast(content: string): Id {
  return styledToaster(content, {
    type: 'success',
    icon: <Icon data={check_circle_outlined} />,
  })
}

export function handlePromiseWithToast<TArgs extends Array<unknown>, TReturn>(
  fn: (...args: TArgs) => TReturn,
  successContent = 'Saved',
  errorContent = 'Error while saving'
) {
  return async (...args: TArgs): Promise<Awaited<TReturn> | undefined> => {
    try {
      const ret = await fn(...args)
      successToast(successContent)
      return ret
    } catch (e) {
      errorToast(`${errorContent}. ${getFetchErrorMessage(e)}`)
      return undefined
    }
  }
}
