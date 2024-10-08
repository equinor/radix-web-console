import { Icon } from '@equinor/eds-core-react';
import {
  check_circle_outlined,
  error_outlined,
  info_circle,
  warning_outlined,
} from '@equinor/eds-icons';
import { clsx } from 'clsx';
import type { FunctionComponent } from 'react';
import {
  type Id,
  ToastContainer,
  type ToastContent,
  type ToastOptions,
  toast,
} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './style.css';
import { getFetchErrorMessage } from '../../store/utils';

export const StyledToastContainer: FunctionComponent = () => (
  <div style={{ position: 'absolute' }}>
    <ToastContainer />
  </div>
);

export function styledToaster<T>(
  content: ToastContent<T>,
  options?: ToastOptions
): Id {
  return toast(content, {
    ...options,
    className: clsx('styled_toaster', options?.className),
    closeOnClick: false,
    draggable: false,
  });
}

export function infoToast<T>(
  content: ToastContent<T>,
  options?: Omit<ToastOptions, 'icon' | 'type'>
): Id {
  return styledToaster<T>(content, {
    ...options,
    type: 'info',
    icon: <Icon data={info_circle} />,
  });
}

export function errorToast<T>(
  content: ToastContent<T>,
  options?: Omit<ToastOptions, 'icon' | 'type'>
): Id {
  return styledToaster<T>(content, {
    ...options,
    type: 'error',
    icon: <Icon data={error_outlined} />,
  });
}

export function warningToast<T>(
  content: ToastContent<T>,
  options?: Omit<ToastOptions, 'icon' | 'type'>
): Id {
  return styledToaster<T>(content, {
    ...options,
    type: 'warning',
    icon: <Icon data={warning_outlined} />,
  });
}

export function successToast<T>(
  content: ToastContent<T>,
  options?: Omit<ToastOptions, 'icon' | 'type'>
): Id {
  return styledToaster<T>(content, {
    ...options,
    type: 'success',
    icon: <Icon data={check_circle_outlined} />,
  });
}

export function handlePromiseWithToast<TArgs extends Array<unknown>, TReturn>(
  fn: (...args: TArgs) => TReturn,
  successContent = 'Saved',
  errorContent = 'Error while saving'
) {
  return async (...args: TArgs): Promise<Awaited<TReturn> | undefined> => {
    try {
      const ret = await fn(...args);
      successToast(successContent);
      return ret;
    } catch (e) {
      errorToast(`${errorContent}. ${getFetchErrorMessage(e)}`);
      return undefined;
    }
  };
}
