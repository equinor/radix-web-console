import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

import { copyToClipboard } from '../../utils/string';

import './style.css';

export const Code = ({ copy, wrap, children }) => {
  const className = classNames('code', { 'code--wrap': wrap });
  const handleClick = () => copyToClipboard(children);
  return (
    <div className={className}>
      {copy && (
        <div className="code__toolbar">
          <button className="code__btn-copy" onClick={handleClick} title="Copy">
            <FontAwesomeIcon icon={faCopy} size="2x" />
            Copy
          </button>
        </div>
      )}
      <pre>{children}</pre>
    </div>
  );
};

Code.propTypes = {
  children: PropTypes.node,
  copy: PropTypes.bool,
  wrap: PropTypes.bool,
};

Code.defaultProps = {
  copy: false,
  wrap: false,
};

export default Code;
