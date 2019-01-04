import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

import './style.css';
import routes from '../../routes';
import MiddleEllipsis from '../middle-ellipsis';

export const GlobalTitle = ({ title }) => {
  return (
    <nav className="global-title" role="navigation" aria-label="Application">
      <NavLink
        className="global-title__apps"
        title="All applications"
        to={routes.apps}
      >
        <span className="global-title__icon">
          <FontAwesomeIcon icon={faLayerGroup} />
        </span>
        <span>Applications</span>
      </NavLink>
      <span>/</span>
      <MiddleEllipsis>{title}</MiddleEllipsis>
    </nav>
  );
};

GlobalTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default GlobalTitle;
