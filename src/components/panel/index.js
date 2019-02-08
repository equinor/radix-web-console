import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.css';

export const Panel = ({ children, detached, type }) => (
  <section
    className={classnames('panel', `panel--${type}`, {
      'panel--detached': detached,
    })}
  >
    {children}
  </section>
);

Panel.propTypes = {
  children: PropTypes.node,
  detached: PropTypes.bool,
  type: PropTypes.oneOf(['default', 'primary', 'danger', 'warning']),
};

Panel.defaultProps = {
  detached: false,
  type: 'default',
};

export default Panel;
