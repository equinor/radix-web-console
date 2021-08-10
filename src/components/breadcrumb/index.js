import { List } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.css';

const BreadcrumbLink = (link) =>
  link.to ? (
    <NavLink className="breadcrumb__link" to={link.to}>
      {link.label}
    </NavLink>
  ) : (
    <span className="breadcrumb__link">{link.label}</span>
  );

export const Breadcrumb = ({ links }) => (
  <nav className="breadcrumb" role="navigation" aria-label="Page hierarchy">
    <List>
      {links.map((link, idx) => (
        <List.Item className="breadcrumb__item" key={link.to || idx}>
          {BreadcrumbLink(link)}
        </List.Item>
      ))}
    </List>
  </nav>
);

Breadcrumb.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      to: PropTypes.string,
    })
  ).isRequired,
};

export default Breadcrumb;
