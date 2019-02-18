import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

export const Alert = ({ type = 'info', actions, children }) => {
  const content = actions ? (
    <React.Fragment>
      <div className="alert__actions-content">{children}</div>
      <div className="alert__actions-area">{actions}</div>
    </React.Fragment>
  ) : (
    children
  );

  const cssClasses = classNames(`alert alert--${type}`, {
    'alert--has-actions': actions,
  });

  return <div className={cssClasses}>{content}</div>;
};

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'danger', 'warning']),
  actions: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export default Alert;
