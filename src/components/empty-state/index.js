import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import './style.css';

const EmptyState = ({ children, title, icon, ctaText, ctaTo }) => (
  <div className="empty-state">
    {icon && <div className="empty-state__illustration">{icon}</div>}
    <div className="empty-state__content">
      <h2>{title}</h2>
      {children}
      {ctaTo && <Link to={ctaTo}>{ctaText}</Link>}
    </div>
  </div>
);

EmptyState.propTypes = {
  children: PropTypes.node,
  ctaText: PropTypes.string,
  ctaTo: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
};

export default EmptyState;
