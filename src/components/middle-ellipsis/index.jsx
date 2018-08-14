import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const sliceText = function(text, cutAt) {
  return {
    start: text.slice(0, -cutAt),
    end: text.slice(-cutAt),
  };
};

const MiddleEllipsis = function({ children, tailLength }) {
  let parentEl = null;
  let fullText = children;

  if (typeof fullText !== 'string') {
    parentEl = children;
    fullText = parentEl.props.children;

    if (typeof fullText !== 'string') {
      throw new Error(
        'MiddleEllipsis: Only a string or a single element with a string as child supported'
      );
    }
  }

  const slicedText = sliceText(fullText, tailLength);
  const ellipsis = (
    <div className="middle-ellipsis" title={fullText}>
      <span className="middle-ellipsis__start">{slicedText.start}</span>
      <span className="middle-ellipsis__end">{slicedText.end}</span>
    </div>
  );

  return parentEl ? React.cloneElement(parentEl, null, ellipsis) : ellipsis;
};

MiddleEllipsis.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  tailLength: PropTypes.number,
};

MiddleEllipsis.defaultProps = {
  tailLength: 5,
};

export default MiddleEllipsis;
