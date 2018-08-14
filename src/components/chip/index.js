/**
 * @see https://material.io/design/components/chips.html
 */

import React from 'react';

import MiddleEllipsis from '../middle-ellipsis';

import './style.css';

export const Chip = ({ children }) => (
  <span className="chip">
    <MiddleEllipsis>{children}</MiddleEllipsis>
  </span>
);

export default Chip;
