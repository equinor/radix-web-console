import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';
import routes from '../../routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh } from '@fortawesome/free-solid-svg-icons';

export const GlobalTitle = ({ title }) => {
  return (
    <nav className="global-title" role="navigation" aria-label="Main title">
      <NavLink
        to={routes.apps}
        className="global-title__icon"
        title="Go to all applications"
      >
        <FontAwesomeIcon icon={faTh} size="lg" />
      </NavLink>
      <div className="global-title__title">{title}</div>
    </nav>
  );
};

GlobalTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
