/**
 * @see https://material.io/design/components/chips.html
 */

import React from 'react';
import PropTypes from 'prop-types';

import MiddleEllipsis from '../middle-ellipsis';

import './style.css';

export const Chip = ({ ellipsis, children }) => (
  <span className="chip">
    {ellipsis && <MiddleEllipsis>{children}</MiddleEllipsis>}
    {!ellipsis && children}
  </span>
);

Chip.propTypes = {
  children: PropTypes.node,
  ellipsis: PropTypes.bool,
};

Chip.defaultProps = {
  ellipsis: true,
};

export default Chip;
