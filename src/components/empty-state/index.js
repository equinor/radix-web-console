import { Typography } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

const EmptyState = ({ children, title, icon, ctaText, ctaTo }) => (
  <div className="empty-state">
    {icon && <div className="empty-state__illustration">{icon}</div>}
    <div className="empty-state__content">
      <Typography variant="h2">{title}</Typography>
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
