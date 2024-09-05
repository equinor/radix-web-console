import { clsx } from 'clsx';
import * as PropTypes from 'prop-types';
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

Alert.propTypes = {
  children: PropTypes.node,
  actions: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf<AlertType>(['info', 'success', 'warning', 'danger']),
};
