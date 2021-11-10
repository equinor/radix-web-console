import { HomeIcon } from '../home-icon';
import routes from '../../routes';

import './style.css';

export const HomeLogo = () => (
  <a href={routes.home} className="home-logo">
    <HomeIcon /> Omnia Radix
  </a>
);
