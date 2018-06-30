import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

export const Alert = ({ type = 'info', children }) => {
  return <div className={`alert alert--${type}`}>{children}</div>;
};

Alert.propTypes = {
  type: PropTypes.oneOf(['info', 'danger', 'warning']),
  children: PropTypes.node,
};

export default Alert;
