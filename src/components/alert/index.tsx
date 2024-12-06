import { clsx } from 'clsx';
import type { FunctionComponent, PropsWithChildren, ReactNode } from 'react';

import './style.css';

export type AlertType = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps {
  actions?: ReactNode;
  className?: string;
  type?: AlertType;
}

export const Alert: FunctionComponent<PropsWithChildren<AlertProps>> = ({
  children,
  actions,
  className,
  type = 'info',
}) => (
  <div
    className={clsx(
      'alert',
      `alert--${type}`,
      { 'alert--has-actions': !!actions },
      className
    )}
  >
    {actions ? (
      <>
        <div className="alert__actions-content">{children}</div>
        <div className="alert__actions-area">{actions}</div>
      </>
    ) : (
      children
    )}
  </div>
);
