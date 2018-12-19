import { NavLink } from 'react-router-dom';
import React from 'react';
import banner from './banner.svg';

import routes from '../../routes';

import './style.css';

export const HomeLogo = () => (
  <NavLink to={routes.home}>
    <img
      alt="Omnia Radix web console"
      className="home-logo__img"
      src={banner}
    />
  </NavLink>
);

export default HomeLogo;
