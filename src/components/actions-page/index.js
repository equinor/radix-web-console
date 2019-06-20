import PropTypes from 'prop-types';
import React from 'react';

import './style.css';

export const ActionsPage = ({ children }) => {
  return <nav className="actions-page">{children}</nav>;
};

ActionsPage.propTypes = {
  children: PropTypes.node,
};

export default ActionsPage;
