import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import './style.css';

const interactiveElements = [
  'A',
  'AUDIO',
  'BUTTON',
  'DETAILS',
  'IFRAME',
  'INPUT',
  'LABEL',
  'SELECT',
  'TEXTAREA',
  'VIDEO',
];

const Clickbox = ({ to, history, children }) => {
  const clickbox = React.createRef();

  const handleClick = (ev) => {
    if (!interactiveElements.includes(ev.target.tagName)) {
      if (to) {
        history.push(to);
      } else {
        // If the `to prop has not been provided, "click" the first child link
        const links = clickbox.current.getElementsByTagName('a');

        if (links.length) {
          links[0].click();
        }
      }
    }
  };

  return (
    <div className="clickbox" onClick={handleClick} ref={clickbox}>
      {children}
    </div>
  );
};

Clickbox.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  to: PropTypes.string,
};

export default withRouter(Clickbox);
