import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './style.css';

export const Alert = ({ type = 'info', actions, children, className }) => {
  const content = actions ? (
    <>
      <div className="alert__actions-content">{children}</div>
      <div className="alert__actions-area">{actions}</div>
    </>
  ) : (
    children
  );

  const cssClasses = classNames(
    `alert alert--${type}`,
    { 'alert--has-actions': actions },
    className
  );

  return <div className={cssClasses}>{content}</div>;
};

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'danger', 'warning']),
  actions: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Alert;
