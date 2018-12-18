import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh } from '@fortawesome/free-solid-svg-icons';

import './style.css';
import routes from '../../routes';
import MiddleEllipsis from '../middle-ellipsis';

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
      <MiddleEllipsis>{title}</MiddleEllipsis>
    </nav>
  );
};

GlobalTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
