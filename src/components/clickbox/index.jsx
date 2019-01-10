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

const Clickbox = ({ children }) => {
  const clickbox = React.createRef();

  const handleClick = ev => {
    if (!interactiveElements.includes(ev.target.tagName)) {
      const links = clickbox.current.getElementsByTagName('a');

      if (links.length) {
        links[0].click();
      }
    }
  };

  return (
    <div className="clickbox" onClick={handleClick} ref={clickbox}>
      {children}
    </div>
  );
};

export default Clickbox;
