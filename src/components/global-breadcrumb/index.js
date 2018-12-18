import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

const GlobalBreadcrumbLink = link => {
  if (link.to) {
    return (
      <NavLink className="global-breadcrumb__link" to={link.to}>
        {link.label}
      </NavLink>
    );
  }

  return <span>{link.label}</span>;
};

export const GlobalBreadcrumb = ({ links }) => {
  const linksRender = links.map(link => (
    <li key={link.to || link.label}>{GlobalBreadcrumbLink(link)}</li>
  ));

  return (
    <nav
      className="global-breadcrumb"
      role="navigation"
      aria-label="Page hierarchy"
    >
      <ul>{linksRender}</ul>
    </nav>
  );
};

GlobalBreadcrumb.propTypes = {
  links: PropTypes.array.isRequired,
};
