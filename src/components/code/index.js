import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

import { copyToClipboard } from '../../utils/string';

import './style.css';

export const Code = ({ copy, wrap, children }) => {
  const handleClick = () => copyToClipboard(children);
  const className = classNames('code', {
    'code--wrap': wrap,
    'code--with-toolbar': copy,
  });

  // Monitor scroll state; if scrolled to bottom, keep scroll at bottom to follow updates
  // TODO: Move to custom hook

  const [scrollOffsetFromBottom, setScrollOffsetFromBottom] = useState(0);

  const handleScroll = ev => {
    const node = ev.target;
    setScrollOffsetFromBottom(
      node.scrollHeight - node.scrollTop - node.clientHeight
    );
  };

  const scrollableRef = useCallback(
    node => {
      if (node !== null && scrollOffsetFromBottom === 0) {
        node.scrollTop = node.scrollHeight;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [children]
  );

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
      <pre ref={scrollableRef} onScroll={handleScroll}>
        <samp>{children}</samp>
      </pre>
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
