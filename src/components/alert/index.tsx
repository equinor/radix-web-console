import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { ReactNode } from 'react';

import './style.css';

export type AlertType = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps {
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
  type?: AlertType;
}

export const Alert = ({
  children,
  actions,
  className,
  type = 'info',
}: AlertProps): JSX.Element => (
  <div
    className={classNames(
      'alert',
      `alert--${type}`,
      { 'alert--has-actions': actions },
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
  children: PropTypes.node.isRequired,
  actions: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf<AlertType>(['info', 'success', 'warning', 'danger']),
};

export default Alert;
