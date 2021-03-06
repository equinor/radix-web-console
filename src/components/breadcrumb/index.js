import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import './style.css';

const BreadcrumbLink = (link) => {
  if (link.to) {
    return (
      <NavLink className="breadcrumb__link" to={link.to}>
        {link.label}
      </NavLink>
    );
  }

  return <span>{link.label}</span>;
};

export const Breadcrumb = ({ links }) => {
  const linksRender = links.map((link, idx) => (
    <li key={link.to || idx}>{BreadcrumbLink(link)}</li>
  ));

  return (
    <nav className="breadcrumb" role="navigation" aria-label="Page hierarchy">
      <ul>{linksRender}</ul>
    </nav>
  );
};

Breadcrumb.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      to: PropTypes.string,
    })
  ).isRequired,
};

export default Breadcrumb;
