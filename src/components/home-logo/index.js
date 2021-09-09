import React from 'react';

import HomeIcon from '../home-icon';
import routes from '../../routes';

import './style.css';

const HomeLogo = () => (
  <a href={routes.home} className="home-logo">
    <HomeIcon /> Omnia Radix
  </a>
);

export default HomeLogo;
