import React from 'react';

import { themedColor } from '../../utils/string';

import './style.css';

export const EnvironmentBadge = ({ envName }) => (
  <span
    className="environment-badge"
    style={{ backgroundColor: themedColor(envName) }}
  >
    {envName}
  </span>
);

export default EnvironmentBadge;
