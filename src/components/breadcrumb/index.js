import { List } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.css';

const BreadcrumbLink = (link) => {
  return link.to ? (
    <NavLink className="breadcrumb__link" to={link.to}>
      {link.label}
    </NavLink>
  ) : (
    <span className="breadcrumb__text">{link.label}</span>
  );
};

export const Breadcrumb = ({ links }) => {
  const linksRender = links.map((link, idx) => (
    <List.Item className="breadcrumb__item" key={link.to || idx}>
      {BreadcrumbLink(link)}
    </List.Item>
  ));

  return (
    <nav className="breadcrumb" role="navigation" aria-label="Page hierarchy">
      <List>{linksRender}</List>
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
