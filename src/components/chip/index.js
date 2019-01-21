/**
 * @see https://material.io/design/components/chips.html
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import MiddleEllipsis from '../middle-ellipsis';

import './style.css';

export const Chip = ({ ellipsis, type, children }) => {
  const className = classNames('chip', `chip--${type}`);

  return (
    <span className={className}>
      {ellipsis && <MiddleEllipsis>{children}</MiddleEllipsis>}
      {!ellipsis && children}
    </span>
  );
};

Chip.propTypes = {
  children: PropTypes.node,
  ellipsis: PropTypes.bool,
  type: PropTypes.oneOf(['default', 'info', 'warning', 'danger']),
};

Chip.defaultProps = {
  ellipsis: false,
  type: 'default',
};

export default Chip;
